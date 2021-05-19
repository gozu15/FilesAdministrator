<template>
  <div class="q-pa-md"></div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations("memorials_decrets", [
      "ReloadListMemorials",
      "ReloadMemorialProperties",
      "ChangeNextPage",
      "ClearData"
    ]),
    ...mapActions("memorials_decrets", []),
    getMemorialList() {}
  },
  computed: {
    ...mapState("memorials_decrets", ["memorials_list"])
  }
};
</script>