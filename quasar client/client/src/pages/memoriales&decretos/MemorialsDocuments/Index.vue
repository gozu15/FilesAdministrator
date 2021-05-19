<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Treats"
      :data="memorials_list"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="col-6">
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <div class="row justify-end">
              <q-btn @click="GoToRegisterAnImageTag()" round color="primary" icon="add" />
            </div>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      memorial_list: [],
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "center",
          field: row => row.name,
          sortable: true
        },
        {
          name: "type_document",
          align: "left",
          label: "Tipo de modelo",
          field: "type_document",
          sortable: true
        },
        {
          name: "documents_text",
           align: "left",
          label: "Texto",
          field: "documents_text",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", ['ChangeNextPage','ClearData']),
    ...mapActions("memorials_decrets", ["GetMemorialsFromApi"]),
    GetMemorials() {
      this.GetMemorialsFromApi();
    },
    GoToRegisterAnImageTag() {
      this.$router.push({
        name:'CreateMemorialsDocuments'
      })
    },
    ViewMore(row) {},
    EditRow(row) {},
    GetRowToDelete(row) {}
  },
  computed: {
    ...mapState("memorials_decrets", ['memorials_list','memorial_properties'])
  },
  created() {
    
  },
  mounted() {
    this.GetMemorials();
    console.log("EQWEQEQWE");
  }
};
</script>
<style scoped>
.my-card {
}
</style>
