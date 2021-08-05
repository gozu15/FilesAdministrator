import Vue from 'vue'
import Vuex from 'vuex'
import {CoverProperties} from './upload_cover_image'
import {MemorialsDecretsStore} from './memorials&decrets'
import {TagsFromImage} from './tags'
import {LibraryLawsAndRegulations} from './librarylawsandregulations'
import {NotifyAudience} from './notify_court'
import {DIARY_BOOK} from './diary_books'
import {VARIABLES_INIT} from './initvariables'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      upload_image:CoverProperties,
      memorials_decrets:MemorialsDecretsStore,
      tags_info:TagsFromImage,
      library:LibraryLawsAndRegulations,
      notify:NotifyAudience,
      diary_books:DIARY_BOOK,
      init_variables:VARIABLES_INIT
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
