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
function generateSpace(total) {
  let text = ''
  for (let index = 0; index < total; index++) {
    text += ' '
  }
  return text
}

/**
 * @param string word the string you want find its positions.
 * @param string text the text you want to find word positions in it.
 */
function findWordPosition(word, text, lastLength = 0) {
  let positions = []
  let textLength = text.length

  let from = text.indexOf(word)

  if (from == -1) {
    return positions
  }

  let to = from + word.length - 1
  positions.push({
    from: from + (lastLength > 0 ? lastLength : 0),
    to: to + (lastLength > 0 ? lastLength : 0),
    word: word,
  })

  let rest = text.slice(to + 1, text.length)
  let restPositions = []

  // debugger
  if (rest.length) {
    lastLength = to + lastLength + 1
    restPositions = findWordPosition(word, rest, lastLength)
  }

  return [...positions, ...restPositions]
}

// function sperateSpaces(lineChords="") {
//   let list = [];
//   for (let index = 0; index < lineChords.length; index++) {
//     const char = lineChords[index];

//     if()
//   }

// }

// function shiftWordPositions(list, from = 0, offset, lineLength) {
//   for (let index = from; index < list.length; index++) {
//     let position = list[index]

//     if (position.to + offset < lineLength) {
//       position.from -= offset
//       position.to -= offset
//     } else {
//       position.from -= offset
//     }
//   }

//   return list
// }

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
      tempChords: {
        keySignature: '',
        list: [],
      },
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
      this.putTempChordsIntoTempSections()
      this.key01 = new Date().getUTCMilliseconds()
      /**
       * Stream the song HtmlContent to upper level
       */
      this.$emit('transposed', this.tempSections)
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
          let lineLength = originalChordLine.length
          let positions = findWordPosition(originalTitle, originalChordLine)

          if (lineIndex == 2 && newTitle == 'Am') debugger

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
            // debugger
            positions = shiftWordPositions(
              positions,
              index + 1,
              lengthDifference,
              lineLength
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
      // let keySignatureOffset = this.getKeySignatureOffset()
      this.tempChords = _.cloneDeep(this.chords)

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

        this.tempChords.list[chordIndex] = newChord
      })
    },

    seperateChords(chordsLine) {
      /**
       * Extract chord positions as a list
       */
      let positions = []
      this.chords.list.forEach((chord) => {
        positions = positions.concat(findWordPosition(chord.title, chordsLine))
      })

      positions.sort((a, b) => a.from - b.from)

      return positions
    },

    injectSpaceBetweenChords(positions = []) {
      /**
       * Generate spaces between chords
       * and inject both chords and spaces into a new list
       */
      let newPositionListWithSpaces = []
      positions.reduce((before, current, index) => {
        newPositionListWithSpaces.push(before)

        let currentLengthDifference =
          current.word.length - current.newWord.length
        let beforeLengthDifference = before.word.length - before.newWord.length

        // if (index == positions.length - 1) {
        // currentLengthDifference =
        // } else {
        // transposeLengthDifference = before.word.length - before.newWord.length
        // }

        let totalSpace = current.from - (before.to + 1)

        if (index == positions.length - 2) {
          totalSpace += currentLengthDifference < 0 ? currentLengthDifference * 2 : currentLengthDifference 
        } else {
          totalSpace += beforeLengthDifference < 0 ? beforeLengthDifference * 2 : beforeLengthDifference
        }

        let spacePosition = {
          from: before.to + 1,
          to: current.from - 1,
          word: generateSpace(totalSpace > 0 ? totalSpace : 1),
        }

        newPositionListWithSpaces.push(spacePosition)

        if (index == positions.length - 1)
          newPositionListWithSpaces.push(current)

        debugger
        return current
      })

      return newPositionListWithSpaces
    },

    putTempChordsIntoTempSections() {
      this.tempSections = _.cloneDeep(this.sections)

      this.sections.forEach((section, sectionIndex) => {
        for (let lineIndex = 0; lineIndex < section.lines.length; lineIndex++) {
          const line = section.lines[lineIndex]

          // seperate chords and spaces
          let speratedChordsFromLine = this.seperateChords(line.chords)

          /**
           * Put transposed chord as a new property
           * for each member of the list
           */
          for (
            let chordIndex = 0;
            chordIndex < this.chords.list.length;
            chordIndex++
          ) {
            const chord = this.chords.list[chordIndex]

            speratedChordsFromLine.forEach((position) => {
              if (position.word == chord.title)
                position.newWord = this.tempChords.list[chordIndex].title
            })
          }

          let normalizedList = this.injectSpaceBetweenChords(
            speratedChordsFromLine
          )

          /**
           * Join normalized array into one single line
           */
          let transposeChordLine = ''
          normalizedList.forEach((position) => {
            if (position.newWord) transposeChordLine += position.newWord
            else transposeChordLine += position.word
          })

          this.tempSections[sectionIndex].lines[
            lineIndex
          ].chords = transposeChordLine

          // debugger
        }
      })
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