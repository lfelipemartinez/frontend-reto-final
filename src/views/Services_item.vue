<template>
  <div>
    <Header></Header>
    <div>
      <div><v-img></v-img> </div>
      <div>
        <h2>{{articulo.nombre}}</h2>
        <p>{{articulo.descripcion}}</p>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import Footer from "../components/Footer.vue";
import Axios from "axios";
export default {
  name: "Services_item",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      articulo: {
        codigo: null,
        nombre: null,
        descripcion: null,
        estado: null,
        categoriaId: null,
      },
    };
  },
  created() {
    var data = this.$route.params.id;
    console.log(data);
    Axios.get("http://localhost:3000/api/articulo/query", {
      params: { id: data },
    })
      .then((response) => {
        console.log(response.data);
        this.articulo = response.data;
      })
      .catch((error) => {
        return error;
      });
  },
};
</script>