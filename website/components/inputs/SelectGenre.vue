<template>
  <vs-select
    :loading="pending"
    :multiple="multiple"
    :key="list.length"
    :label="label"
    :placehoder="$t('genre.select-artist')"
    v-model="tempValue"
  >
    <vs-option
      v-for="(item, i) in list"
      :key="i"
      :label="item.name"
      :value="item._id"
    >
      {{ item.name }}
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
      this.$emit('input', value)
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