<template>
  <collection-viewer
    database="chord"
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
          key: 'chords',
          label: this.$t('artist.chords'),
          type: 'string',
          disable: true,
        },
      ],
    }
  },
}
</script>