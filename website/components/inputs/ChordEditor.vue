<template>
  <ejs-richtexteditor
    ref="defaultRTE"
    :height="height"
    :toolbarSettings="toolbarSettings"
    v-model="content"
  >
  </ejs-richtexteditor>
</template>

<script>
import {
  RichTextEditorPlugin,
  Toolbar,
  Link,
  Image,
  Count,
  HtmlEditor,
  QuickToolbar,
} from '@syncfusion/ej2-vue-richtexteditor'

import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-lists/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-splitbuttons/styles/material.css'
import '@syncfusion/ej2-vue-richtexteditor/styles/material.css'

export default {
  props: {
    value: String,
    height: { type: Number, default: 400 },
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar],
  },
  data() {
    return {
      content: '',
      toolbarSettings: {
        items: [
          'Formats',
          'Alignments',
          '|',
          'FontColor',
          'BackgroundColor',
          '|',
          'Undo',
          'Redo',
          '|',
          'preview',
        ],
      },
      colorSetting: {
        modeSwitcher: true,
      },
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) this.content = value
      },
    },
    content() {
      this.$emit('input', this.content)
    },
  },
}
</script>

<style scoped>
#editor {
  min-height: 20rem;
  padding: 10px;
  direction: rtl;
}
</style>