<template>
  <div class="flex flex-col">
    <div v-for="(field, i) in fieldsToShow" :key="i" class="mt-8">
      <vs-input
        block
        :label="field.title || field.key"
        :type="field.type"
        :placeholder="field.placeholder"
        :value="form[field.key]"
        @input="form[field.key] = $event"
      >
        <template #icon v-if="field.icon">
          <i :class="[field.icon]" />
        </template>
      </vs-input>
    </div>

    <div class="mt-8">
      <vs-button class="mt-16" v-if="!edit" @click="create">{{
        $t('create')
      }}</vs-button>
      <vs-button class="mt-16" v-else @click="update">{{
        $t('update')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import { dataProvider } from '@mres/web'
import toaster from '../../utilities/toaster'

export default {
  props: {
    database: { type: String, required: true },
    collection: { type: String, required: true },
    /**
     * An array of
     * {type, title, key, placeholder, icon}
     */
    fields: { type: Array, default: () => [] },
    /**
     * Define wheather or not this form
     * is an edit form.
     */
    edit: Boolean,
    /**
     * Document id to edit it
     * when edit is true.
     */
    id: String,
  },

  data() {
    return {
      form: {},
      pending: false,
    }
  },

  computed: {
    fieldsToShow() {
      return this.fields.filter(
        (item) => item.hideInform == undefined || item.hideInform == false
      )
    },
  },

  methods: {
    update() {
      this.pending = true
    },

    create() {
      this.pending = true
      dataProvider
        .insertOne({
          database: this.database,
          collection: this.collection,
          doc: this.form,
        })
        .then(() => this.$emit('created'))
        .catch((result) => {
          toaster.toast({
            label: `Create ${this.collection} error`,
            description: result.error,
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