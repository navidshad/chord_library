<template>
  <div id="editor" class="bg-gray-200" contenteditable="true" @input="content = $event.target.innerText"></div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      content: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) this.content = value
      },
    },
    content() {
      this.$emit('input', this.content)
    },
  },
}
</script>

<style scoped>
#editor {
    min-height: 400px;
    padding: 10px;
    direction: rtl;
}
</style>