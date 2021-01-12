<template>
  <div>
    <!-- Header -->
    <div class="flex items-center border">
      <vs-button flat @click="createNewSection">New Section</vs-button>
    </div>
    <!-- Sections -->
    <div class="border mt-2" :key="componentKey">
      <chord-editor-section
        v-for="(section, i) in sections"
        :key="i"
        :index="i"
        :editToggle="editToggle"
        v-model="sections[i]"
        @up="offset('up', i)"
        @down="offset('down', i)"
        @duplicate="duplicateSection(i)"
        @remove="removeSection(i)"
      />
    </div>
  </div>
</template>

<script>
const _ = require('lodash')
export default {
  props: {
    value: Array,
  },
  data() {
    return {
      sections: [],
      componentKey: '',
      editToggle: true,
    }
  },
  created() {
    window.addEventListener('keyup', this.onToggleEditMode)
  },
  destroyed() {
    window.removeEventListener('keyup', this.onToggleEditMode)
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) this.sections = value
        if (!this.sections.length) this.createNewSection()
      },
    },
    sections: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.sections)
      },
    },
  },
  methods: {
    duplicateSection(index) {
      let duplicated = _.cloneDeep(this.sections[index])
      this.sections.splice(index, 0, duplicated)
      this.generateNewKey()
    },
    removeSection(index) {
      this.sections.splice(index, 1)
    },
    createNewSection() {
      let index = this.sections.length
      this.sections.push({
        index,
        title: 'New Section',
        direction: 'rtl',
        lines: [],
      })
    },
    offset(mode, index) {
      let section = this.sections[index]
      this.sections.splice(index, 1)

      if (mode == 'up') {
        this.sections.splice(index - 1, 0, section)
      } else if (mode == 'down') {
        this.sections.splice(index + 1, 0, section)
      }
      this.generateNewKey()
    },
    generateNewKey() {
      this.componentKey = new Date().getUTCMilliseconds()
    },
    onToggleEditMode({ code, ctrlKey }) {
      debugger
      if (code == 'F4') {
        this.editToggle = !this.editToggle
      }
    },
  },
}
</script>

<style scoped>
#editor {
  min-height: 20rem;
  padding: 10px;
  direction: rtl;
}
</style>

<style>
</style>