<template>
<div>
    <div>
        <h3>{{$t('melody-uploader.title')}}</h3>
    </div>
    <div>
        <div v-for="(melody, i) in tempMelodies" :key="i"></div>
    </div>
</div>
</template>

<script>
export default {
  props: {
      melodies: Array,
  },
  watch: {
      melodies: {
          immediate: true,
          deep: true,
          handler(newVal) {
              this.tempMelodies = newVal;
          }
      }
  },
  data() {
      return {
          tempMelodies: [],
      }
  }
}
</script>

<style>
</style>