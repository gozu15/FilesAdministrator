<template>
  <div class="q-pa-sm">
    <div class="row justify-center">
      <div class="content-cards" >
        <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content">
              <q-btn round color="primary" icon="fas fa-eye" size="10px">
                <q-tooltip>
          Click para ver mas datos del documento
        </q-tooltip>
        </q-btn>   
              <q-btn round color="red" icon="fas fa-edit" size="10px" @click="getCoverImage(images_cover)">
                <q-tooltip>
          Click para obtener los datos relevantes del documento
        </q-tooltip>  
              </q-btn>                
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="tagIsSelected" class="row justify-center">
      <div class="content-tags">
        <q-chip clickable @click="onClick" color="teal" text-color="white" icon="bookmark">
      Bookmark
    </q-chip>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "TagsInformation",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae.",
      tagIsSelected:false,
      tags_to_use:[],
    };
  },
  methods: {
    ...mapMutations("tags_info", []),
    ...mapActions("tags_info", ["GetListTagsAndLoad"]),
    GetTagsAndLoadInTheList() {
      this.GetListTagsAndLoad();
    },
    getCoverImage(cover_selected){
      console.log(cover_selected);
      let newobject = null;
      for (const key in cover_selected) {
       console.log(key);
        console.log(cover_selected[key])
        if(key == 'relevant_court')
        newobject={
          title:key,
          value:cover_selected[key]
        }
      }
      
    }
  },
  computed: {
    ...mapState("tags_info", ["list_tags", "tag_selected"])
  },
  created() {},
  mounted() {
    this.GetListTagsAndLoad();
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
