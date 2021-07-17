<template>
  <div ref="container"></div>
</template>

<script>
import Alphatab from "@coderline/alphatab";
import alphaUtils from "../../utilities/alphatab";

let tab;
export default {
  props: {
    link: String,
  },
  data() {
    return {
      isLoadingFile: false,
    };
  },
  methods: {
    createTab() {
      tab = new Alphatab.AlphaTabApi(this.$refs["container"], {});
      let settings = new Alphatab.Settings()
      
    },
    loadData() {
      this.isLoadingFile = true;
      return alphaUtils.loadFile(this.link).finally((_) => {
        this.isLoadingFile = false;
      });
    },

  },
};
</script>

<style>
</style>