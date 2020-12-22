<template>
  <v-app id="inspire" class="">
    <Header> </Header>

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
              <infograf></infograf>
              <div>
                <!--Seccion de servicios-->
                <v-container>
                  <h2 align="center">Nuestros Servicios</h2>
                  <servicios></servicios>
                </v-container>
                <!-- fin seccion de servicios-->
              </div>
              <casos></casos>
              <footer-v></footer-v>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
  h2{
    font-size: 2.5rem;
  }
</style>
<script>
import Header from "../components/header.vue";
import Casos from "./Casos.vue";
import FooterV from "./FooterV.vue";
import Infograf from "./Infograf.vue";
import Servicios from "./Servicios.vue";
export default {
  components: { Servicios, Infograf, Casos, FooterV, Header },
  name: "Inicio",
  data() {
    return {
      elevations: [6, 12, 18],
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
