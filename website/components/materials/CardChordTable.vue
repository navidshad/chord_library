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

    <!-- Table -->
    <vs-table class="mt-6">
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
              selected: isActive(rowIndex, column),
              'cursor-pointer': allowChoose,
              relative: allowChoose,
            }"
            @click="toggleChord(rowIndex, column, row[column].title)"
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
    getSelectIndex(rowIndex, column) {
      let stackIndex = -1

      this.selecteds.forEach((chord, i) => {
        if (
          chord.rowIndex == rowIndex &&
          chord.column == column &&
          chord.table == this.table._id
        )
          stackIndex = i
      })

      return stackIndex
    },
    isActive(rowIndex, column) {
      return this.getSelectIndex(rowIndex, column) > -1
    },
    removeChordByTitile(title) {
      let stackIndex = -1

      this.selecteds.forEach((chord, i) => {
        if (chord.title == title) stackIndex = i
      })

      if (stackIndex > -1) this.selecteds.splice(stackIndex, 1)
    },
    toggleChord(rowIndex, column, title) {
      if (!this.allowChoose) return

      let newChord = {
        rowIndex,
        column,
        title,
        table: this.table._id,
        chord: this.table.rows[rowIndex][column]._id,
        keySignature: this.table.keySignature._id,
      }

      let stackIndex = this.getSelectIndex(rowIndex, column)

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