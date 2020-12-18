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
export default {
  props: {
    originalContent: { type: String, required: true },
    chords: { type: Object, required: true },
  },
  data() {
    return {
      HtmlContent: '',
      currentTableIndex: null,
      tempChords: {
        keySignature: '',
        list: [],
      },
    }
  },
  watch: {
    originalContent: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.convertOriginalContentTohtml()
      },
    },
    chords: {
      immediate: true,
      deep: true,
      handler({ keySignature, list }) {
        console.log('chords wacher')
        this.tempChords = { keySignature, list }
        this.findMainTable(this.chords)
      },
    },
    currentTableIndex(index, old) {
      if (old == null) return
      this.changeChordOffset(index)
    },
  },
  computed: {
    tables() {
      return this.$store.state.chordTables.tables
    },
  },
  created() {
    this.$store.dispatch('chordTables/getTables').then(() => {
      console.log('after got tables')
      this.findMainTable(this.chords)
    })
  },
  methods: {
    hashCode(str) {
      return str
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        )
    },
    convertOriginalContentTohtml() {
      let div = document.createElement('div')
      let originalContent = this.originalContent

      this.chords.list.forEach((chord) => {
        let hash = this.hashCode(chord.title)
        let wordForms = [
          `>${chord.title}<`,
          `${chord.title} &`,
          `; ${chord.title}`,
        ]

        wordForms.forEach((word) => {
          let replacement = word
            .toString()
            .replace(chord.title, `<span name="${hash}">${word.trim()}</span>`);
            
          originalContent = originalContent.replaceAll(word, replacement)
        })
      })

      div.innerHTML = originalContent
      this.HtmlContent = div
    },
    replaceChordByOriginalTitle(originalTitle, newTitle) {
      let hash = this.hashCode(originalTitle)
      let selecteds = this.HtmlContent.querySelectorAll(`[name='${hash}']`)
      selecteds.forEach((tag) => {
        tag.textContent = newTitle
      })
    },
    /**
     * The table index of first chord
     */
    getKeySignatureOffset() {
      let firstChord = this.tempChords.list[0]
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
    changeChordOffset(newIndex) {
      let keySignatureOffset = this.getKeySignatureOffset()
      this.tempChords.list.forEach((chord, chordIndex) => {
        /**
         * Find new offset for chord
         */
        let offset = this.getChordOffset(chord)
        let newOffset, difference

        if (offset == keySignatureOffset) {
          newOffset = newIndex
        } else if (offset > keySignatureOffset) {
          difference = offset - keySignatureOffset
          newOffset = newIndex + difference
        } else if (offset < keySignatureOffset) {
          difference = keySignatureOffset - offset
          newOffset = newIndex - difference
        }

        /**
         * make loop the offset
         */
        let totalTables = this.tables.length
        if (newOffset > totalTables - 1) {
          newOffset = 0
        } else if (newOffset < 0) {
          newOffset = this.tables.length - 1
        }

        /**
         * Chand chord to new offset
         */
        let table = this.tables[newOffset]
        let rowIndex = chord.rowIndex
        let column = chord.column

        chord = {
          ...chord,
          title: table.rows[rowIndex][column].title,
          table: table._id,
          chord: table.rows[rowIndex][column]._id,
          keySignature: table.keySignature._id,
        }

        /**
         * Change song HtmlContent
         */
        let originalTitle = this.chords.list[chordIndex].title
        let newTitle = chord.title
        this.replaceChordByOriginalTitle(originalTitle, newTitle)
      })

      /**
       * Stream the song HtmlContent to upper level
       */
      this.$emit('transposed', this.HtmlContent.innerHTML)
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