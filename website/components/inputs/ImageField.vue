<template>
  <div>
    <div class="flex">
      <div class="thumbnail bg-gray-300">
        <img :src="thumbnailLink">
      </div>
      <div>
        <vs-button @click="activeModal = true">Sellect Image</vs-button>
      </div>
    </div>
    <vs-dialog v-model="activeModal" :loading="uploadPending">
      <template #header>
        <h4 class="not-margin">Image uploader</h4>
      </template>
      <croppa
        v-model="image"
        :width="width"
        :height="height"
        :initial-image="thumbnailLink"
        :prevent-white-space="true"
      />
      <vs-button @click="uploadImage">Upload</vs-button>
    </vs-dialog>
  </div>
</template>

<script>
import { fileProvider } from '@modular-rest/client'

export default {
  props: {
    width: { type: Number, default: 256 },
    height: { type: Number, default: 256 },
    fileDoc: { type: Object, default: () => {} },
  },
  model: {
    prop: 'fileDoc',
  },
  data() {
    return {
      activeModal: false,
      image: null,
      uploadPending: false,
      removePending: false,
    }
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink((this.fileDoc || {}).fileName)
    },
  },
  methods: {
    extractImage() {
      return new Promise((done) => {
        this.image.generateBlob(
          (blob) => {
            done(blob)
          },
          // Extention
          'image/jpeg',
          // 80% compressed jpeg file
          0.8
        )
      })
    },
    async uploadImage() {
      let file = await this.extractImage()
      this.uploadPending = true
      fileProvider
        .uploadFile(file, (loaded) => {
          console.log('uploading: ' + loaded)
        })
        .then((fileDoc) => {
          this.$emit('input', fileDoc)
        })
        .finally(() => (this.uploadPending = false))
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