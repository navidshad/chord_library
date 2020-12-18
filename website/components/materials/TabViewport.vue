<template>
  <div class="tab-content" v-html="content"></div>
</template>

<script>
export default {
  props: {
    content: {},
  },
}
</script>

<style scoed>
.tab-content {
  line-height: 1rem;
}
</style>