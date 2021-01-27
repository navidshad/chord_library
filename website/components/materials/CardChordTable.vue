<template>
  <card class="p-4" :style="{ 'max-width': '550px' }">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h3>{{ table.keySignature.major + ' ' + table.keySignature.minor }}</h3>
      <span>{{ table.type.title }}</span>

      <div class="flex" v-if="allowEdite">
        <vs-button icon transparent @click="$emit('edit')">
          <i class="bx bxs-edit"></i>
        </vs-button>
        <vs-button icon transparent @click="$emit('remove')">
          <i class="bx bx-trash-alt"></i>
        </vs-button>
      </div>
    </div>

    <!-- Regular chords -->
    <vs-table class="mt-6">
      <template #header>
        <span>Regular Chords</span>
      </template>
      <!-- THead -->
      <template slot="thead">
        <vs-tr>
          <vs-th v-for="(column, i) in columns" :key="i">
            {{ column }}
          </vs-th>
        </vs-tr>
      </template>

      <!-- TBody -->
      <template slot="tbody">
        <vs-tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
          <vs-td
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="{
              selected: isActive('regular',rowIndex, column),
              'cursor-pointer': allowChoose,
              relative: allowChoose,
            }"
            @click="toggleChord('regular',rowIndex, column, row[column].title)"
          >
            <span class="">
              {{ row[column].title }}
            </span>
            <span class="select-badge" v-if="isActive(rowIndex, column)">{{
              getSelectIndex(rowIndex, column) + 1
            }}</span>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <!-- Chromatic Chords -->
    <vs-table class="mt-6">
      <template #header>
        <span>Chromatic Chords</span>
      </template>
      <!-- THead -->
      <template slot="thead">
        <vs-tr>
          <vs-th>01</vs-th>
          <vs-th>02</vs-th>
          <vs-th>03</vs-th>
          <vs-th>04</vs-th>
        </vs-tr>
      </template>

      <!-- TBody -->
      <template slot="tbody">
        <vs-tr v-for="(row, rowIndex) in table.chromaticRows" :key="rowIndex">
          <vs-td
            v-for="(column, columnIndex) in chromaticColumns"
            :key="columnIndex"
            :class="{
              selected: isActive('chromatic', rowIndex, column),
              'cursor-pointer': allowChoose,
              relative: allowChoose,
            }"
            @click="toggleChord('chromatic',rowIndex, column, row[column].title)"
          >
            <span class="">
              {{ (row[column] || {}).title || '' }}
            </span>
            <span class="select-badge" v-if="isActive(rowIndex, column)">{{
              getSelectIndex(rowIndex, column) + 1
            }}</span>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </card>
</template>

<script>
export default {
  props: {
    table: Object,
    allowChoose: { type: Boolean, default: false },
    allowEdite: { type: Boolean, default: false },
    value: { type: Array },
  },
  data() {
    return {
      columns: ['major', 'naturalMinor', 'harmonicMinor', 'melodicMinor'],
      chromaticColumns: ['one', 'two', 'three', 'four'],
      selecteds: [],
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) this.selecteds = value
      },
    },
  },
  methods: {
    getSelectIndex(type, rowIndex, column) {
      let stackIndex = -1

      this.selecteds.forEach((chord, i) => {
        if (
          chord.rowIndex == rowIndex &&
          chord.column == column &&
          chord.table == this.table._id &&
          chord.type == type
        )
          stackIndex = i
      })

      return stackIndex
    },
    isActive(type, rowIndex, column) {
      return this.getSelectIndex(type, rowIndex, column) > -1
    },
    removeChordByTitile(title) {
      let stackIndex = -1

      this.selecteds.forEach((chord, i) => {
        if (chord.title == title) stackIndex = i
      })

      if (stackIndex > -1) this.selecteds.splice(stackIndex, 1)
    },
    toggleChord(type, rowIndex, column, title) {
      if (!this.allowChoose) return

      let chords = []

      if (type == 'regular') chords = this.table.rows
      else if (type == 'chromatic') chords = this.table.chromaticRows
      else return

      let newChord = {
        rowIndex,
        column,
        title,
        table: this.table._id,
        keySignature: this.table.keySignature._id,
        chord: chords[rowIndex][column]._id,
        type,
      }

      let stackIndex = this.getSelectIndex(type, rowIndex, column)

      if (stackIndex > -1) {
        this.selecteds.splice(stackIndex, 1)
      } else {
        // remove other same chord
        this.removeChordByTitile(title)
        // add this new chord
        this.selecteds.push(newChord)
      }

      this.$emit('input', this.selecteds)
    },
  },
}
</script>

<style lang="scss" scoped>
.selected {
  background-color: theme('colors.orange.300') !important;
}

.select-badge {
  @apply text-lg;
  position: absolute;
  right: 10px;
  color: white;
}
</style>