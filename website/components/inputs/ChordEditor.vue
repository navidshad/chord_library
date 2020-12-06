<template>
  <!-- <div
    id="editor"
    class="bg-gray-200"
    contenteditable="true"
    v-text="value"
    @input="content = $event.target.innerText"
  ></div> -->
  <!-- <textarea
    class="w-full rounded-lg bg-gray-200"
    id="editor"
    :value="value"
    @input="content = $event"
  /> -->
  <VueEditor
    :value="value"
    @input="content = $event"
  />
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
    // value: {
    //   immediate: true,
    //   handler(value) {
    //     if (value) this.content = value
    //   },
    // },
    content() {
      this.$emit('input', this.content)
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