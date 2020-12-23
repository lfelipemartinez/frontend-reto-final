<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <v-row>
          <strong class="subheading">Contactenos! </strong>
          <v-card-text class="white--text pt-3">
            <strong>Correos: </strong> Pic_service@gmail.com,Customer.pic@outlook.com
            <br>
            <strong>Telfonos: </strong> 521500500, 3103189740
            <br>
            <strong class="subheading">
            Ciudades donde nos puedes encontrar: <br>
            </strong>
            Bogotá, Barranquilla, Medellin, Cali
          </v-card-text>
        </v-row>
        <v-spacer></v-spacer>

        <v-btn
          class="mx-4"
          href="https://github.com/lfelipemartinez/frontend-reto-final/tree/issues/luis/src"
          icon
        >
          <v-icon size="24px">
            mdi-github
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4"
          href="https://github.com/yeseniasanchez/semana-5-171"
          icon
        >
          <v-icon size="24px">
            mdi-github
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>171</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
