<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="content-cards" >
        <q-card class="my-card" v-for="(images_cover, index) in memorials_list" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content">
                 <q-btn round color="primary" icon="fas fa-eye" size="10px"/>   
                 <q-btn round color="red" icon="fas fa-edit" size="10px"/>                
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "MemorialModelList",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae."
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", []),
    ...mapActions("memorials_decrets", ["GetMemorialsFromApi","GetModelsMemorials"]),
   
  },
  computed: {
    ...mapState("memorials_decrets", ["memorials_list", "memorial_properties"])
  },
  created() {},
  mounted() {
    this.GetModelsMemorials();
  }
};
</script>
<style scoped>
.my-card {
  width: 95%;
  /* height: 200px; */
  margin-bottom: 15px;  
}
.content-cards{
    height: 400px;    
    overflow: auto;
}
.btn-content .q-btn{
    margin-right: 10px;
}
</style>
