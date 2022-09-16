<template>
  <Select
    database="chord"
    collection="type"
    optionLabelKey="title"
    :multiple="multiple"
    :block="block"
    :label="label"
    :placehoder="$t('chord.select-type')"
    :value="value"
    @input="tempValue = $event"
  >
    <template v-slot:option-tmpl="{ props }">
      <div style="line-height: 10px">
        <span class="text-xs">{{ props.option.title }}</span>
        <span style="font-size: 9px">{{ props.option.description }}</span>
      </div>
    </template>
  </Select>
</template>

<script>
export default {
  props: {
    multiple: { type: Boolean, default: false },
    block: { type: Boolean, default: true },
    value: { default: () => "" },
    label: String,
  },
  data() {
    return {
      tempValue: "",
    };
  },
  watch: {
    tempValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>