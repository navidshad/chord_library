<template>
  <div>
    <div>
      <div class="thumbnail bg-gray-300">
        <img v-if="fileDoc" :src="thumbnailLink" />
      </div>
    </div>
  </div>
</template>

<script>
import { fileProvider } from '@modular-rest/client'

export default {
  props: {
    fileDoc: { type: Object, default: () => {} },
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink(this.fileDoc || {})
    },
  },
}
</script>

<style lang="scss">
.thumbnail {
  width: 120px;
  height: 120px;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>