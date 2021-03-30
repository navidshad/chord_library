<template>
  <div>
    <grid-songs :queryOptions="{limit: 20, sort: '-_id'}" />
  </div>
</template>

<script>
export default {

  computed: {
    isLogin() {
      return this.$store.getters['auth/isLogin']
    },
  },
  mounted() {
    // setTimeout(this.go(), 5000)
  },
  methods: {
    // go() {
    //   this.$router.push('/tab/6044ad3b7cc3f15f4ec0aa56')
    // }
  }
}
</script>