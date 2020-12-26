<template>
  <div class="whitespace-pre-wrap">
    <p v-for="(line, i) in lines" :key="i" :dir="direction">
      <span>{{ line.chords }}</span>
      <br /><span>{{ line.text }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    lines: Array,
    direction: String,
  },
}
</script>

<style>
</style>