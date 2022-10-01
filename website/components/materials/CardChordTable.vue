<template>
  <card class="p-4" :style="{ 'max-width': '550px' }">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h3>{{ table.keySignature.major + " " + table.keySignature.minor }}</h3>
      <span>{{ table.type.title }}</span>

      <div class="flex" v-if="allowEdite">
        <v-btn icon text color="primary" @click="$emit('edit')">
          <i class="bx bxs-edit"></i>
        </v-btn>
        <v-btn icon text color="primary" @click="$emit('remove')">
          <i class="bx bx-trash-alt"></i>
        </v-btn>
      </div>
    </div>

    <!-- Regular chords -->
    <v-simple-table class="mt-6">
      <template v-slot:top><span>Regular Chords</span></template>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Vocal Note</th>
            <th v-for="(column, i) in columns" :key="i">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
            <!-- Notes -->
            <td
              :class="{
                selected: isNoteActive(rowIndex, table.vocalRows[rowIndex]),
                'cursor-pointer': allowChoose,
                relative: allowChoose,
              }"
              @click="toggleNote(rowIndex, table.vocalRows[rowIndex])"
            >
              {{ table.vocalRows[rowIndex] || "-" }}
            </td>
            <!-- Chords -->
            <td
              v-for="(column, columnIndex) in columns"
              :key="columnIndex"
              :class="{
                selected: isChordActive('regular', rowIndex, column),
                'cursor-pointer': allowChoose,
                relative: allowChoose,
              }"
              @click="
                toggleChord('regular', rowIndex, column, row[column].title)
              "
            >
              <span class="">
                {{ row[column].title }}
              </span>
              <span
                class="select-badge"
                v-if="isChordActive(rowIndex, column)"
                >{{ getSelectIndex(rowIndex, column) + 1 }}</span
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- Chromatic Chords -->
    <v-simple-table class="mt-6">
      <template v-slot:top><span> Chromatic Chords </span></template>
      <template v-slot:default>
        <thead>
          <tr>
            <th>01</th>
            <th>02</th>
            <th>03</th>
            <th>04</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in table.chromaticRows" :key="rowIndex">
            <td
              v-for="(column, columnIndex) in chromaticColumns"
              :key="columnIndex"
              :class="{
                selected: isChordActive('chromatic', rowIndex, column),
                'cursor-pointer': allowChoose,
                relative: allowChoose,
              }"
              @click="
                toggleChord('chromatic', rowIndex, column, row[column].title)
              "
            >
              <span class="">
                {{ (row[column] || {}).title || "" }}
              </span>
              <span
                class="select-badge"
                v-if="isChordActive(rowIndex, column)"
                >{{ getSelectIndex(rowIndex, column) + 1 }}</span
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </card>
</template>

<script>
export default {
  props: {
    table: Object,
    allowChoose: { type: Boolean, default: false },
    allowEdite: { type: Boolean, default: false },
    chords: { type: Array },
    vocalNote: Object,
  },
  data() {
    return {
      columns: ["major", "naturalMinor", "harmonicMinor", "melodicMinor"],
      chromaticColumns: ["one", "two", "three", "four"],
      form: {
        selecteds: [],
        vocalNote: "",
      },
    };
  },
  watch: {
    chords: {
      immediate: true,
      handler(value) {
        if (value) this.form.selecteds = value;
      },
    },
    vocalNote: {
      immediate: true,
      handler(value) {
        if (value) this.form.vocalNote = value;
      },
    },
  },
  methods: {
    getSelectIndex(type, rowIndex, column) {
      let stackIndex = -1;

      this.form.selecteds.forEach((chord, i) => {
        if (
          chord.rowIndex == rowIndex &&
          chord.column == column &&
          chord.table == this.table._id &&
          chord.type == type
        )
          stackIndex = i;
      });

      return stackIndex;
    },
    isNoteActive(index, note) {
      if (
        this.form.vocalNote.table == this.table._id &&
        this.form.vocalNote.index == index &&
        this.form.vocalNote.note == note
      )
        return true;
      else return false;
    },
    isChordActive(type, rowIndex, column) {
      return this.getSelectIndex(type, rowIndex, column) > -1;
    },
    removeChordByTitile(title) {
      let stackIndex = -1;

      this.form.selecteds.forEach((chord, i) => {
        if (chord.title == title) stackIndex = i;
      });

      if (stackIndex > -1) this.form.selecteds.splice(stackIndex, 1);
    },
    toggleNote(index, note) {
      if (
        this.form.vocalNote.title == note &&
        this.form.vocalNote.table == this.table
      )
        this.form.vocalNote = { title: "", index: -1, table: "" };
      else
        this.form.vocalNote = {
          note,
          index,
          table: this.table._id,
        };

      this.emitSelectedDetail();
    },
    toggleChord(type, rowIndex, column, title) {
      if (!this.allowChoose) return;

      let chords = [];

      if (type == "regular") chords = this.table.rows;
      else if (type == "chromatic") chords = this.table.chromaticRows;
      else return;

      let newChord = {
        rowIndex,
        column,
        title,
        table: this.table._id,
        keySignature: this.table.keySignature._id,
        chord: chords[rowIndex][column]._id,
        type,
      };

      let stackIndex = this.getSelectIndex(type, rowIndex, column);

      if (stackIndex > -1) {
        this.form.selecteds.splice(stackIndex, 1);
      } else {
        // remove other same chord
        this.removeChordByTitile(title);
        // add this new chord
        this.form.selecteds.push(newChord);
      }

      this.emitSelectedDetail();
    },
    emitSelectedDetail() {
      this.$emit("input", {
        chords: this.form.selecteds,
        vocalNote: this.form.vocalNote,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: theme("colors.orange.300") !important;
}

.select-badge {
  @apply text-lg;
  position: absolute;
  right: 10px;
  color: white;
}
</style>