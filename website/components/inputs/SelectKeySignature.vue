<template>
  <Select
    database="chord"
    collection="keySignature"
    optionLabelKey=""
    :multiple="multiple"
    :block="block"
    :label="label"
    :placehoder="$t('chord.select-keySignature')"
    :value="value"
    @input="tempValue = $event"
  >
    <template v-slot:option-tmpl="{ props }">
      <span>{{ props.option.major + " " + props.option.minor }}</span>
    </template>
  </Select>
</template>

<script>
export default {
  props: {
    multiple: { type: Boolean, default: false },
    block: Boolean,
    value: { default: () => [] },
    label: String,
  },
  data() {
    return {
      tempValue: ""
    };
  },
  watch: {
    tempValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>