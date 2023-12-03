<template>
  <div class="flex flex-col">
    <div v-for="(field, i) in fieldsToShow" :key="i" class="mt-8">
      <!-- STRING -->
      <v-text-field
        v-if="field.type === 'string'"
        block
        :label="field.title || field.key"
        :type="field.type"
        :placeholder="field.placeholder"
        v-model="form[field.key]"
        :append-icon="field.icon ? field.icon : undefined"
      >
        <template v-if="field.icon" #append>
          <v-icon>{{ field.icon }}</v-icon>
        </template>
      </v-text-field>

      <seo-labels
        v-if="field.type === 'seo'"
        :value="form[field.key]"
        @input="form[field.key] = $event"
      />

      <!-- IMAGE -->
      <image-field
        v-if="field.type === 'image' && edit"
        :fileDoc="form[field.key]"
        :tag="collection"
        @input="form[field.key] = $event"
        @changed="edit ? update() : () => {}"
      />

      <!-- CUSTOM FIELD -->
      <component
        v-if="field.inputComponent"
        :is="field.inputComponent"
        :label="field.title || field.key"
        :placeholder="field.placeholder"
        :value="form[field.key] || ''"
        @input="form[field.key] = $event"
      />
    </div>

    <div class="mt-8">
      <v-btn class="mt-16" v-if="!edit" @click="create">
        {{ $t("create") }}
      </v-btn>
      <v-btn class="mt-16" v-else @click="update">
        {{ $t("update") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { dataProvider } from "@modular-rest/client";
import notifier from "../../utilities/notifier";

export default {
  props: {
    database: { type: String, required: true },
    collection: { type: String, required: true },
    /**
     * An array of
     * {type, title, key, placeholder, icon, disable}
     */
    fields: { type: Array, default: () => [] },
    /**
     * Define wheather or not this form
     * is an edit form.
     */
    edit: Boolean,
    /**
     * The document to edit it
     * when edit is true.
     */
    document: Object,
    docId: String,
  },

  data() {
    return {
      form: {},
      id: null,
      pending: false,
    };
  },

  computed: {
    fieldsToShow() {
      return this.fields.filter(
        (item) => item.disable == undefined || item.disable == false
      );
    },
  },

  watch: {
    document: {
      immediate: true,
      handler(value) {
        if (!value) return;
        if (this.edit) {
          this.id = value._id;
          delete value._id;
          this.form = value;
        }
      },
    },
    docId: {
      immediate: true,
      handler(value) {
        if (!value) return;
        if (this.edit) {
          dataProvider
            .findOne({
              database: this.database,
              collection: this.collection,
              query: { _id: value },
            })
            .then((doc) => {
              this.id = doc._id;
              delete doc._id;
              this.form = doc;
            });
        }
      },
    },
  },

  methods: {
    create() {
      this.pending = true;
      dataProvider
        .insertOne({
          database: this.database,
          collection: this.collection,
          doc: this.form,
        })
        .then(() => {
          this.$emit("created");
          this.$emit("close");
        })
        .catch((result) => {
          notifier.toast({
            label: `Create ${this.collection} error`,
            description: JSON.stringify(result.error),
            type: "error",
          });
        })
        .finally(() => (this.pending = false));
    },

    update() {
      this.pending = true;

      dataProvider
        .updateOne({
          database: this.database,
          collection: this.collection,
          query: { _id: this.id },
          update: this.form,
        })
        .then(() => {
          this.$emit("updated");
          this.$emit("close");
        })
        .catch((result) => {
          notifier.toast({
            label: `Update ${this.collection} error`,
            description: JSON.stringify(result.error),
            type: "error",
          });
        })
        .finally(() => (this.pending = false));
    },
  },
};
</script>

<style></style>
