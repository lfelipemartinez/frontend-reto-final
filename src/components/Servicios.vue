<!--servicios -->
<template>
  <v-row justify="space-around">
    <v-col
      v-for="(element, index) of articles"
      v-bind:key="index"
      cols="12"
      md="4"
    >
      <v-card class="pa-12 white" height="700">
        <v-img
          v-bind:src="require('../assets/images/banner-'+ index +'.jpg')"
          height="400"
          width="400"
        />
        <v-card-title class="color-title">{{ element.nombre }}</v-card-title>
        <v-card-text align="center">
          <v-row class="mx-0 color-description">
            {{ element.descripcion }}</v-row
          >
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            text
            :to="{ name: 'Services_item', params: { id: element.codigo } }"
            class="primary"
          >
            Ver más</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped>
.color-title {
  justify-content: center;
  font-size: 1.5rem;
  text-align: center;
  color: #009688;
}

.color-description {
  color: #009688;
  text-align: justify;
  justify-content: center;
  font-size: 1.2rem;
}
</style>
<script>
import Axios from "axios";
export default {
  name: "Service",
  data() {
    return {
      articles: [],
      banners: [
        "banner-0.jpg",
        "banner-2.jpg",
        "banner-3.jpg",
      ],
      articulo:{
        categoriaId: null,
        nombre:null,
        codigo: null,
        descripcion: null,
        estado: null,
        id: null,
        img: null,
      },
    };
  },
  created() {
    Axios.get("http://localhost:3000/api/articulo/list")
      .then((response) => {
        var articles = response.data;
        var i = 1;
        articles.forEach((element,index) => {
          if (element.categoriaId === 3) {
            if (element.descripcion.length > 150) {
              element.descripcion = element.descripcion.substr(0, 180) + "...";
            }
             this.articles.push(element);
           
          }
          
        });
        

        console.log(this.articles);
      })
      .catch((error) => {
        return error;
      });
  },
  methods: {},
};
</script>