<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <div class="row">
        <WisiwigQuasar />
      </div>
    </div>
  </q-page>
</template>
<script>
import WisiwigQuasar from "../../components/wisiwigQuasar";
export default {
  components: { WisiwigQuasar },
  data() {
    return {
      files: null,
    };
  },
  methods: {
    getHello() {
      this.$axios
        .get("documents/hello-get")
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.getHello();
  },
};
</script>
