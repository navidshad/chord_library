<template>
  <collection-viewer
    database="chord"
    collection="artist"
    :fields="fields"
    :title="$t('artist.title')"
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
          type: 'string',
        },
        {
          key: 'chords',
          type: 'string',
          disable: true,
        },
      ],
    }
  },
}
</script>