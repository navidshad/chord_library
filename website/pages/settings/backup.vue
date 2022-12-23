  <template>
  <div class="page">
    <div class="container">
      <p>
        By tapping opposit button a new backup will be generate, then will be
        shown on the table.
      </p>
      <vs-button :loading="pendingBackup" @click="createBackup"
        >Create new Backup</vs-button
      >
    </div>

    <div class="container w-full">
      <BackupUploader @uploaded="getList" />
    </div>

    <vs-table :loading="loadingList">
      <template #thead>
        <vs-tr>
          <vs-th> Title </vs-th>
          <vs-th> Size </vs-th>
          <vs-th> options </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(file, i) in list">
          <vs-td>
            <a :href="getLink(file.title)">
              {{ file.title }}
            </a>
          </vs-td>
          <vs-td>
            {{ file.size }}
          </vs-td>
          <vs-td>
            <vs-button @click="removeBackup(file.title)">remove</vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

  <script>
export default {
  middleware: ["auth"],
  data() {
    return {
      loadingList: false,
      pendingBackup: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters["backup/list"];
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getLink(title) {
      let url = process.env.BASE_URL + "/backup-files/" + title;
      return url;
    },
    getList() {
      this.loadingList = true;
      this.$store.dispatch("backup/getList").finally((_) => {
        this.loadingList = true;
      });
    },
    createBackup() {
      this.pendingBackup = true;
      this.$store.dispatch("backup/createNewBackup").finally((_) => {
        this.pendingBackup = false;
        this.getList();
      });
    },
    removeBackup(title) {
      this.$store.dispatch("backup/removeBackfile", title).finally((_) => {
        this.getList();
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>