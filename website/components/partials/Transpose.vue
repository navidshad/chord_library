<template>
  <card class="p-2 flex items-center space-x-1 scroll">
    <!-- loop -->
    <div
      class="chord-box box-hover relative"
      v-for="(table, i) in tables"
      :key="i"
      :class="{ selected: i == currentTableIndex }"
      @click="currentTableIndex = i"
    >
      <span class="text-lg">{{ table.keySignature[chords.keySignature] }}</span>
    </div>
  </card>
</template>

<script>
import _ from 'lodash'
function padEnd(str, length, char) {
  for (let index = 0; index < length; index++) {
    str += char
  }
  return str
}

function padStart(str, length, char) {
  for (let index = 0; index < length; index++) {
    str = char + str
  }
  return str
}

function getPaddedTitles(original, newTitle, lengthDifference, padMethod) {
  let padLength = Math.abs(lengthDifference)
  if (lengthDifference > 0) {
    newTitle = padMethod(newTitle, padLength, ' ')
  } else if (lengthDifference < 0) {
    original = padMethod(original, padLength, ' ')
  }

  return { original, new: newTitle }
}
export default {
  props: {
    sections: { type: Array, required: true },
    // {keySignature, list}
    chords: { type: Object, required: true },
  },
  model: {
    prop: 'sections',
    event: 'transposed',
  },
  data() {
    return {
      currentTableIndex: null,
      tempSections: [],
    }
  },
  watch: {
    sections: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.tempSections = value
      },
    },
    chords: {
      immediate: true,
      deep: true,
      handler({ keySignature, list }) {
        // this.chords = { keySignature, list }
        this.findMainTable(this.chords)
      },
    },
    currentTableIndex(index, old) {
      if (old == null) return
      this.changeChordOffset(index)
      this.key01 = new Date().getUTCMilliseconds()
    },
  },
  computed: {
    tables() {
      return this.$store.state.chordTables.tables
    },
  },
  created() {
    this.$store.dispatch('chordTables/getTables').then(() => {
      this.findMainTable(this.chords)
    })
  },
  methods: {
    replaceChordByOriginalTitle(originalTitle, newTitle) {
      let originallength = originalTitle.length
      let newLength = newTitle.length
      let lengthDifference = originalTitle.length - newTitle.length

      for (let index = 0; index < this.tempSections.length; index++) {
        // let section = this.tempSections[index]

        this.tempSections[index].lines.forEach((line) => {
          let paddedTitles = getPaddedTitles(
            originalTitle,
            newTitle,
            lengthDifference,
            padEnd
          )

          line.chords = line.chords.replaceAll(
            paddedTitles.original,
            paddedTitles.new
          )

          if (line.chords.endsWith(originalTitle.trim())) {
            let paddedTitlesForLastChord = getPaddedTitles(
              originalTitle,
              newTitle,
              lengthDifference,
              padStart
            )

            line.chords = line.chords.replaceAll(
              paddedTitlesForLastChord.original,
              paddedTitlesForLastChord.new
            )
          }
        })
      }
    },
    /**
     * The table index of first chord
     */
    getKeySignatureOffset() {
      let firstChord = this.chords.list[0]
      return this.getChordOffset(firstChord)
    },
    findMainTable({ keySignature, list }) {
      if (!keySignature || !list) return

      this.currentTableIndex = this.getKeySignatureOffset()
    },
    /**
     * Return the table index of given chord
     */
    getChordOffset(chord) {
      let offset = null

      this.tables.forEach((table, i) => {
        if (chord.table == table._id) offset = i
      })

      return offset
    },
    changeChordOffset(newOffset) {
      let keySignatureOffset = this.getKeySignatureOffset()
      // this.chords = _.cloneDeep(this.chords)
      this.tempSections = _.cloneDeep(this.sections)

      this.chords.list.forEach((chord, chordIndex) => {
        /**
         * Find new offset for chord
         */
        let offset = this.getChordOffset(chord)

        /**
         * Chand chord to new offset
         */
        let table = this.tables[newOffset]
        let rowIndex = chord.rowIndex
        let column = chord.column

        let newChord = {
          ...chord,
          title: table.rows[rowIndex][column].title,
          table: table._id,
          chord: table.rows[rowIndex][column]._id,
          keySignature: table.keySignature._id,
        }

        /**
         * Change sections chords
         */
        let originalTitle = this.chords.list[chordIndex].title
        let newTitle = newChord.title

        this.replaceChordByOriginalTitle(originalTitle, newTitle)
      })

      /**
       * Stream the song HtmlContent to upper level
       */
      this.$emit('transposed', this.tempSections)
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll {
  overflow-x: auto;
}

.box {
  @apply flex items-center justify-center bg-blue-300 text-gray-100 rounded;
  width: 80px;
  height: 80px;
}

.box-hover {
  &:hover {
    @apply bg-blue-400;
    cursor: pointer;
  }
}

.selected {
  background-color: theme('colors.blue.500') !important;
}

.chord-box {
  @extend .box;
  @apply bg-orange-300;
}
</style>