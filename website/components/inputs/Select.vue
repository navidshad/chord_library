<template>
  <div>
    <label class="typo__label">{{ label }}</label>
    <multiselect
      :loading="pending"
      :options="list"
      :multiple="multiple"
      :placeholder="placehoder || $t('search.label')"
      :label="optionLabelKey"
      track-by="_id"
      :taggable="true"
      v-model="tempValue"
      deselectLabel=""
      selectLabel=""
      tagPlaceholder=""
      deselectGroupLabel=""
      :selectedLabel="$t('selected')"
    >
      <template slot="option" slot-scope="props">
        <slot name="option-tmpl" :props="props"></slot>
      </template>
    </multiselect>
  </div>
</template>

<script>
import { dataProvider } from "@modular-rest/client";
import notifier from "../../utilities/notifier";
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  props: {
    multiple: { type: Boolean, default: true },
    value: { default: () => [] },
    block: Boolean,
    label: String,
    placehoder: String,
    optionLabelKey: { type: String, default: "" },
    database: String,
    collection: String,
  },

  data() {
    return {
      list: [],
      pending: false,
      tempValue: "",
    };
  },

  watch: {
    list(value) {
      if (value.length) this.retrieveSelectedItemsFromValue();
    },
    value(value, oldValue) {
      if (JSON.stringify(value) == JSON.stringify(oldValue)) return;

      if (value) this.retrieveSelectedItemsFromValue();
    },
    tempValue(value) {
      if (this.multiple) {
        this.$emit(
          "input",
          value.map((item) => item._id)
        );
      } else {
        this.$emit("input", value._id);
      }
    },
  },

  created() {
    this.loadItems();
  },

  methods: {
    retrieveSelectedItemsFromValue() {
      if (this.multiple) {
        let tempList = [];
        for (let index = 0; index < this.value.length; index++) {
          const currentId = this.value[index];

          let obj = this.list.find((item) => item._id == currentId);

          if (obj) tempList.push(obj);
        }

        this.tempValue = tempList;
      } else {
        let obj = this.list.find((item) => item._id == this.value);

        if (obj) this.tempValue = obj;
      }
    },

    loadItems() {
      this.pending = true;
      dataProvider
        .find({
          database: this.database,
          collection: this.collection,
          query: {},
        })
        .then((list) => (this.list = list))
        .catch(({ error }) => {
          notifier.toast({
            label: `Load ${this.collection} error`,
            description: error,
            type: "error",
          });
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
div.mt-6 {
  text-align: right;
}

.multiselect {
  text-align: right !important;
}

.multiselect .multiselect__select {
  left: 1px !important;
  right: unset !important;
}

.multiselect__tags {
  padding: 8px 8px 0 40px !important;
}

.multiselect__input {
  text-align: right;
  font-size: 12px;
}

.multiselect__content-wrapper {
  z-index: 999 !important;
}
</style>