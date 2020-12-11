<template>
  <collection-viewer
    database="song"
    collection="genre"
    :fields="fields"
    :title="$t('genre.genres')"
  />
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      fields: [
        {
          key: 'title',
          label: this.$t('genre.title'),
          type: 'string',
        },
      ],
    }
  },
}
</script>