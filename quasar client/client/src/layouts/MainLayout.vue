<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color:green;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> ASISTENTE DE JUZGADO </q-toolbar-title>        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Administrador
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Inicio",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
    pathLink: "inicio",
  },
  {
    title: "Leer textos en imagen",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
    pathLink: "upload-image",
  },
   {
     title: "Memoriales & Decretos",
     caption: "chat.quasar.dev",
     icon: "chat",
     link: "https://chat.quasar.dev",
     pathLink: "memoriales_decretos",
   },
  // {
  //   title: "Caratulas",
  //   caption: "quasar.dev",
  //   icon: "school",
  //   link: "https://quasar.dev",
  //   pathLink: "caratulas",
  // },
  // {
  //   title: "Libros diarios",
  //   caption: "github.com/quasarframework",
  //   icon: "code",
  //   link: "https://github.com/quasarframework",
  //   pathLink: "libros_diarios",
  // },
  

  // {
  //   title: "Logout",
  //   caption: "@quasarframework",
  //   icon: "rss_feed",
  //   link: "https://twitter.quasar.dev",
  //   pathLink: "login",
  // },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};
</script>
