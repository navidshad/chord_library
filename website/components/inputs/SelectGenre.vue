<template>
  <vs-select
    :loading="pending"
    :multiple="multiple"
    :key="list.length"
    :label="label"
    :block="block"
    :placehoder="$t('genre.select-genre')"
    v-model="tempValue"
  >
    <vs-option
      v-for="(item, i) in list"
      :key="i"
      :label="item.title"
      :value="item._id"
    >
      {{ item.title }}
    </vs-option>
  </vs-select>
</template>

<script>
import { dataProvider } from '@mres/web'
import notifier from '../../utilities/notifier'

export default {
  props: {
    multiple: { type: Boolean, default: true },
    value: { default: () => [] },
    label: String,
    block: Boolean,
  },
  data() {
    return {
      list: [],
      pending: false,
      tempValue: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.value = newValue
      },
    },
    tempValue(value) {
      if (this.multiple) {
        this.$emit(
          'input',
          value.filter((item) => item.length > 0)
        )
      } else this.$emit('input', value)
    },
  },
  created() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      this.pending = true
      dataProvider
        .find({
          database: 'chord',
          collection: 'genre',
          query: {},
        })
        .then((list) => (this.list = list))
        .catch(({ error }) => {
          notifier.toast({
            label: 'Load genres error',
            description: error,
            type: 'error',
          })
        })
        .finally(() => (this.pending = false))
    },
  },
}
</script>

<style>
</style>