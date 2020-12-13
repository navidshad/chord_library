<template>
  <Select
    database="chord"
    collection="degree"
    optionLabelKey="title"
    :multiple="false"
    :block="block"
    :label="label"
    :placehoder="$t('chord.select-degree')"
    :value="value"
    @input="tempValue = $event"
  >
    <template v-slot="{ list }">
      <vs-option
        v-for="(item, i) in list"
        :key="i"
        :label="item.minor + ' ' + item.major"
        :value="item._id"
      >
        {{ item.minor + ' ' + item.major }}
      </vs-option>
    </template>
  </Select>
</template>

<script>
export default {
  props: {
    block: Boolean,
    value: { default: () => [] },
    label: String,
  },
  data() {
    return { tempValue: '' }
  },
  watch: {
    tempValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>