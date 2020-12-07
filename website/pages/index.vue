<template>
  <div>
    <grid-chords :queryOptions="{limit: 20, sort: '-_id'}" />
  </div>
</template>

<script>
export default {

  computed: {
    isLogin() {
      return this.$store.getters['auth/isLogin']
    },
  },
}
</script>