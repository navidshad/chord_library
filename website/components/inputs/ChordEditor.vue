<template>
  <div>
    <ejs-richtexteditor
      ref="defaultRTE"
      :enableRtl="true"
      :fontFamily="fontFamily"
      :toolbarSettings="toolbarSettings"
      v-model="content"
    />
  </div>
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
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar],
  },
  data() {
    return {
      content: '',
      toolbarSettings: {
        type: 'MultiRow',
        items: [
          'Formats',
          'ClearFormat',
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
        default: 'Dana', // to define default font-family
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
            text: 'Dana',
            value: 'Dana',
            // class: 'e-tahoma',
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