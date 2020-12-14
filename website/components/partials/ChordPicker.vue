<template>
  <card class="p-2 flex items-center space-x-1 scroll">
    <!-- loop -->
    <div class="chord-box" v-for="(chord, i) in selecteds" :key="i">
      <span class="text-lg">{{ chord.title }}</span>
    </div>
    <!-- Add -->
    <div class="box box-hover cursor-pointer" @click="showTables">
      <span>Add</span>
    </div>
  </card>
</template>

<script>
import notifier from '../../utilities/notifier'
import ChordPickerDialog from './ChordPickerDialog'

export default {
  data() {
    return {
      selecteds: [],
    }
  },
  methods: {
    onSelectChord(chords) {
      this.selecteds = chords
    },
    showTables() {
      notifier.showDialog({
        component: ChordPickerDialog,
        props: {
          value: this.selecteds,
        },
        events: {
          input: this.onSelectChord,
        },
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
  }
}
.chord-box {
  @extend .box;
  @apply bg-orange-300;
}
</style>