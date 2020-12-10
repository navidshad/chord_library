<template>
  <ejs-richtexteditor
    ref="defaultRTE"
    :height="height"
    :fontFamily="fontFamily" 
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
          'FontName',
          'FontSize',
          'FontColor',
          'BackgroundColor',
          'LowerCase',
          'UpperCase',
          '|',
          'Undo',
          'Redo',
          '|',
          'preview',
        ],
      },
      fontFamily: {
        default: 'Tahoma', // to define default font-family
        items: [
          // {
          //   text: 'Segoe UI',
          //   value: 'Segoe UI',
          //   class: 'e-segoe-ui',
          //   command: 'Font',
          //   subCommand: 'FontName',
          // },
          // {
          //   text: 'Noto Sans',
          //   value: 'Noto Sans',
          //   command: 'Font',
          //   subCommand: 'FontName',
          // },
          // {
          //   text: 'Impact',
          //   value: 'Impact,Charcoal,sans-serif',
          //   class: 'e-impact',
          //   command: 'Font',
          //   subCommand: 'FontName',
          // },
          {
            text: 'Tahoma',
            value: 'Tahoma,Geneva,sans-serif',
            class: 'e-tahoma',
            command: 'Font',
            subCommand: 'FontName',
          },
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

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css';
</style>