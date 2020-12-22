<template>
     <v-app-bar app color="white" flat class="primary">
      <v-container class="py-0 fill-height">
      <router-link :to="{name:'Home'}" >
        <v-img src="../assets/images/logo.jpg" ></v-img>
        </router-link>
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
</template>

<script>
export default {
    name:"Header"
}
</script>