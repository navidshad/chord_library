<template>
  <div class="tab-content" v-if="sections">
    <div v-for="(section, i) in sections" :key="i"
      class="mb-4">
      <h3 class="my-2" :dir="section.direction">{{section.title}}</h3>
      <tabview-section-lines
        :lines="section.lines"
        :direction="section.direction"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: Array,
  },
}
</script>

<style lang="scss" scoed>
.tab-content {
  p{
    margin-bottom: 1.5rem;
  }
}
</style>