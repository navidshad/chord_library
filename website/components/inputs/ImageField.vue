<template>
  <div>
    <v-row class="flex">
      <v-col class="thumbnail bg-gray-300">
        <v-img :src="thumbnailLink" />
      </v-col>
      <v-col>
        <v-btn color="primary" @click="activeModal = true">Select Image</v-btn>
        <v-btn color="error" @click="removeImage">Remove</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="activeModal" :loading="uploadPending" persistent>
      <v-card>
        <v-card-title>
          <h4 class="not-margin">Image uploader</h4>
        </v-card-title>
        <v-card-text>
          <croppa
            v-model="image"
            :width="width"
            :height="height"
            :initial-image="thumbnailLink"
            :prevent-white-space="true"
          />
        </v-card-text>
        <v-card-actions class="flex">
          <v-btn @click="uploadImage">Upload</v-btn>
          <v-btn @click="removeImage" color="red">Remove</v-btn>
          <v-btn @click="activeModal = false" color="red">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { fileProvider } from "@modular-rest/client";

export default {
  props: {
    width: { type: Number, default: 256 },
    height: { type: Number, default: 256 },
    fileDoc: { type: Object, default: () => {} },
    tag: String,
  },
  model: {
    prop: "fileDoc",
  },
  data() {
    return {
      activeModal: false,
      image: null,
      uploadPending: false,
      removePending: false,
    };
  },
  computed: {
    thumbnailLink() {
      return fileProvider.getFileLink(this.fileDoc || {});
    },
  },
  methods: {
    extractImage() {
      return new Promise((done) => {
        this.image.generateBlob(
          (blob) => {
            done(blob);
          },
          // Extention
          "image/jpeg",
          // 80% compressed jpeg file
          0.8
        );
      });
    },
    async uploadImage() {
      let file = await this.extractImage();
      this.uploadPending = true;

      if (this.fileDoc != null) {
        await this.removeImage();
      }

      fileProvider
        .uploadFile(
          file,
          (loaded) => {
            console.log("uploading: " + loaded);
          },
          this.tag
        )
        .then((fileDoc) => {
          this.$emit("input", fileDoc);
        })
        .finally(() => {
          this.uploadPending = false;
          this.$emit("changed");
        });
    },
    async removeImage() {
      this.uploadPending = true;
      fileProvider
        .removeFile(this.fileDoc._id)
        .then((fileDoc) => {
          this.$emit("input", null);
          this.$emit("changed");
        })
        .finally(() => (this.uploadPending = false));
    },
  },
};
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
