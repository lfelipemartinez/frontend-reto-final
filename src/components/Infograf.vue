<template>
 <div class="infografia">
   <div class="infografia__image">
     <img src="../assets/images/banner-informativo.jpg" />
   </div>
   <div class="infografia__inform pa-5">
     <div><img src="../assets/images/logo-text.png" alt="logo y texto"></div>
     <h2 class="infografia__titulo">Nuestro Valor</h2>
     <p class="infografia__texto">Soluciones empresariales, para el crecimiento personal y colectivo de tu empresa, <strong>juntos somos mas.</strong></p>
   </div>
 </div>
</template>
<script>
export default {};
</script>
<style scoped>
  .infografia{
    display: flex;
    flex-flow: row wrap;
    flex: 1 1 auto;
  }
  .infografia__image{
    flex-grow: 1;
    display: flex;
  }
  .infografia__image img{
    width: 100%;
  }

  .infografia__inform{
    flex-grow: 1;
    text-align: justify;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    background: #009688 ;
  
  }
  .infografia__titulo{
    font-size: 2.5rem;
  }
  .infografia__texto{
    font-size: 2rem;
    font-weight: bold;
    max-width: 500px;
  }
</style>