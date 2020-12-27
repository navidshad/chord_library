<template>
  <div class="section">
    <!-- header -->
    <div class="flex flex-row-reverse items-center justify-between p-2">
      <div class="text-center" :dir="content.direction">
        <h3 v-show="mode == 'view'">{{ content.title }}</h3>
        <input
          type="text"
          class="bg-gray-200"
          v-model="content.title"
          v-show="mode == 'edit'"
        />
      </div>
      <div class="flex">
        <!-- ACTION BUTTONS -->
        <vs-button-group>
          <!-- MODE -->
          <vs-button
            transparent
            icon
            @click="toggleMode"
            :active="mode == 'edit'"
          >
            <i class="bx bx-message-square-edit"></i>
          </vs-button>
          <!-- REMOVE -->
          <vs-button transparent icon @click="duplicateVarification">
            <i class="bx bx-duplicate"></i>
          </vs-button>
          <!-- DUPLICATE -->
          <vs-button transparent icon danger @click="removeVarification">
            <i class="bx bx-trash-alt"></i>
          </vs-button>
          <!-- OFSSET UP -->
          <vs-button transparent icon @click="$emit('up')">
            <i class="bx bxs-upvote"></i>
          </vs-button>
          <!-- OFSSET DOWN -->
          <vs-button transparent icon @click="$emit('down')">
            <i class="bx bxs-downvote"></i>
          </vs-button>
        </vs-button-group>
        <vs-button-group v-show="mode == 'edit'">
          <vs-button
            transparent
            icon
            :active="content.direction == 'ltr'"
            @click="content.direction = 'ltr'"
          >
            <i class="bx bx-align-left"></i>
          </vs-button>
          <vs-button
            transparent
            icon
            :active="content.direction == 'rtl'"
            @click="content.direction = 'rtl'"
          >
            <i class="bx bx-align-right"></i>
          </vs-button>
        </vs-button-group>
      </div>
    </div>
    <!-- EDITOR -->
    <!-- View Mode -->
    <div :class="['px-2', { 'bg-green-200': mode == 'view' }]">
      <tabview-section-lines
        v-show="mode == 'view'"
        class="p-4"
        :lines="content.lines"
        :direction="content.direction"
      />
      <!-- Edit Mode -->
      <textarea
        class="p-4 bg-gray-200 w-full"
        v-show="mode == 'edit'"
        v-model="editContent"
        :dir="content.direction"
        :style="{ height: autoHeight }"
        @input="convertContentToLines"
      />
    </div>
  </div>
</template>

<script>
import notifier from '../../utilities/notifier'
import eventBus from '../../utilities/event-bus'

function isEven(value) {
  if (value % 2 == 0) return true
  else return false
}

export default {
  props: {
    value: Object,
    index: Number,
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(content) {
        this.content = content

        if (!content.lines.length) this.mode = 'edit'
        this.convertLinesToEditContent()
      },
    },
  },
  created() {
    this.componentKey = new Date().getUTCMilliseconds() + this.index
    eventBus.listen('chord-editor-section-remove' + this.componentKey, () => {
      this.$emit('remove')
    })
    eventBus.listen(
      'chord-editor-section-duplicate' + this.componentKey,
      () => {
        this.$emit('duplicate')
      }
    )
  },
  destroyed() {
    eventBus.remove('chord-editor-section-remove' + this.componentKey)
    eventBus.remove('chord-editor-section-duplicate' + this.componentKey)
  },
  data() {
    return {
      componentKey: '',
      mode: 'view',
      content: {
        title: '',
        direction: 'rtl',
        /**
         * [{chords, text}]
         */
        lines: [],
      },
      editContent: '',
    }
  },
  computed: {
    autoHeight() {
      let totalLines = this.editContent.split('\n').length
      let height = totalLines == 1 ? 60 : 24.66 * totalLines + 16
      return height + 'px'
    },
  },
  methods: {
    streamOut() {
      this.$emit('input', this.content)
    },
    toggleMode() {
      if (this.mode == 'edit') {
        this.mode = 'view'
      } else this.mode = 'edit'
    },
    convertLinesToEditContent() {
      this.editContent = ''
      this.content.lines.forEach((line, i) => {
        this.editContent += line.chords + '\n' + line.text
        if (i < this.content.lines.length - 1) this.editContent += '\n'
      })
    },
    convertContentToLines() {
      let linesContent = this.editContent.split('\n')

      if (linesContent.length && isEven(linesContent.length)) {
        let contere = 0
        let newLines = []

        for (let index = 0; index < linesContent.length - 1; index += 2) {
          const element = linesContent[index]

          if (linesContent.length - 1 < index + 1) break

          let chords = linesContent[index]
          let text = linesContent[index + 1]
          newLines.push({ chords, text })
        }

        if (newLines.length) this.content.lines = newLines
        this.streamOut()
      }
    },
    removeVarification() {
      notifier.showAlertDialog({
        title: 'Remove Validation',
        description: 'Do you want to remove this item?',
        actions: ['yes', 'no'],
        onAction: (label, action, close) => {
          if (label == 'yes') {
            eventBus.fire('chord-editor-section-remove' + this.componentKey)
          }
          close()
        },
      })
    },
    duplicateVarification() {
      notifier.showAlertDialog({
        title: 'Duplicate Validation',
        description: 'Do you want to Duplicate this item?',
        actions: ['yes', 'no'],
        onAction: (label, action, close) => {
          if (label == 'yes') {
            eventBus.fire('chord-editor-section-duplicate' + this.componentKey)
          }
          close()
        },
      })
    },
  },
}
</script>

<style scoped>
.section {
  font-family: dana;
}
</style>