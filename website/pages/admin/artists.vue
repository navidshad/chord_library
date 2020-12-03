<template>
  <collection-viewer database="chord" collection="artist" :fields="fields" />
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { 
          key: 'name',
          type: 'string',
        }, 
        { 
          key: 'chords',
          type: 'string',
          hideInform: true,
        }
      ],
    }
  },
}
</script>

<style>
</style>