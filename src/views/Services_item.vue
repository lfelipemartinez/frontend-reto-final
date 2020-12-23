<!--servicios item-->
<template>
  <div>
    <Header></Header>
    <div class="item__box">
      <div align="center"><v-img src="../assets/images/banner-0.jpg" width="800"></v-img> </div>
      <div align="center" class="ma-10">
        <h2>{{articulo.nombre}}</h2>
        <p>{{articulo.descripcion}}</p>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<style scoped>
.item__box{
  display: flex;
  margin-top: 100px;
  flex-flow: column;
}
h2{
  font-size: 2.5rem;
}
p{
  max-width: 800px;
  text-align: left;
  font-size: 1.2rem;
}
</style>
<script>
import Header from "../components/header.vue";
import Footer from "../components/FooterV.vue";
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