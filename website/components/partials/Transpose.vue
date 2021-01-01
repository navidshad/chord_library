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

// function getPaddedTitles(original, newTitle, lengthDifference, padMethod) {
//   let padLength = Math.abs(lengthDifference)
//   if (lengthDifference > 0) {
//     newTitle = padMethod(newTitle, padLength, ' ')
//   } else if (lengthDifference < 0) {
//     original = padMethod(original, padLength, ' ')
//   }

//   return { original, new: newTitle }
// }

function injectString(newString, text, from, to, offset = 0) {
  let oldlength = to - from + 1
  let end
  let textLength = text.length

  if (oldlength > newString.length) {
    end = from + oldlength
  } else {
    end = from + newString.length
  }

  let before = text.slice(0, from)
  let after = text.slice(end, text.length)

  let newtext = before + newString + after
  // debugger
  return newtext
}

/**
 * @param string word the string you want find its positions.
 * @param string text the text you want to find word positions in it.
 */
function findWordPosition(word, text, lastLength = 0) {
  let positions = []

  let from = text.search(word)

  if (from == -1) {
    return positions
  }

  let to = from + word.length
  positions.push({
    from: from + lastLength,
    to: to + lastLength - 1,
  })

  let rest = text.slice(to, text.length)
  let restPositions = []
  debugger
  if (rest.length) {
    lastLength = to + lastLength
    debugger
    restPositions = findWordPosition(word, rest, lastLength)
  }
  return [...positions, ...restPositions]
}

function shiftWordPositions(list, from = 0, offset, lineLength) {
  for (let index = from; index < list.length; index++) {
    let position = list[index]

    if (position.to + offset < lineLength) {
      position.from -= offset
      position.to -= offset
    } else {
      position.from -= offset
    }
  }

  return list
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
      console.log(originallength)
      let newLength = newTitle.length - 1
      let lengthDifference = newTitle.length - originalTitle.length

      for (let index = 0; index < this.tempSections.length; index++) {
        // let section = this.tempSections[index]

        this.tempSections[index].lines.forEach((line, lineIndex) => {
          let originalChordLine = this.sections[index].lines[lineIndex].chords
          let positions = findWordPosition(originalTitle, originalChordLine)

          // let paddedTitles = getPaddedTitles(
          //   originalTitle,
          //   newTitle,یی
          //   lengthDifference,
          //   padEnd
          // )

          for (let index = 0; index < positions.length; index++) {
            const position = positions[index]

            line.chords = injectString(
              newTitle,
              line.chords,
              position.from,
              position.to
            )

            console.log(line.chords)

            let lineLength = line.chords.length
            debugger
            positions = shiftWordPositions(
              positions,
              index + 1,
              lengthDifference,
              lineLength
            )
          }

          // line.chords = line.chords.replaceAll(
          //   paddedTitles.original,
          //   paddedTitles.new
          // )

          // if (line.chords.endsWith(originalTitle.trim())) {
          //   let paddedTitlesForLastChord = getPaddedTitles(
          //     originalTitle,
          //     newTitle,
          //     lengthDifference,
          //     padStart
          //   )

          //   line.chords = line.chords.replaceAll(
          //     paddedTitlesForLastChord.original,
          //     paddedTitlesForLastChord.new
          //   )
          // }
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