<template>
  <collection-viewer
    database="song"
    collection="artist"
    :fields="fields"
    :title="$t('artist.artists')"
  />
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('artist.artists'),
          type: 'string',
        },
        {
          key: 'songs',
          label: this.$t('artist.songs'),
          type: 'string',
          disable: true,
        },
      ],
    }
  },
}
</script>