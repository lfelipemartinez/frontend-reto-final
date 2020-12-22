<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat class="primary">
      <v-container class="py-0 fill-height">
        <v-btn text :to="{ name: 'Home' }">
          Inicio
        </v-btn>

        <v-divider class="mx-4" vertical></v-divider>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <template v-if="!this.$store.state.user">
            <v-btn text :to="{ name: 'Login' }">
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>

            <v-divider vertical></v-divider>
          </template>
          <template v-else>
            <v-btn text :to="{ name: 'AuthV' }">
              <v-icon>
                mdi-application-cog
              </v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </template>
          <template v-if="this.$store.state.user">
            <v-btn icon class="mr-5" @click="salir()">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </template>
        </v-toolbar-items>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-carousel cycle>
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
              <servicios></servicios>
              <infograf></infograf>
              <casos></casos>
              <footer-v></footer-v>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Casos from "./Casos.vue";
import FooterV from "./FooterV.vue";
import Infograf from "./Infograf.vue";
import Servicios from "./Servicios.vue";
export default {
  components: { Servicios, Infograf, Casos, FooterV },
  name: "Inicio",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src:
            "https://limoncomunicacion.com/wp-content/uploads/2018/12/Dise%C3%B1o-web-servicios-limoncomunicacion.com_.png",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    salir() {
      this.$store.dispatch("out");
    },
  },
};
</script>
