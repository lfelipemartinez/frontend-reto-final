<template>
  <v-app id="inspire">

    <v-app-bar app class="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Área de Gestión</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
      icon
      class="mr-5"
      @click="salir()"
      >
      <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-card
      class="mx-auto"
      width="300"
    >
      <v-list>
        <v-list-item
        :to="{name: 'Home'}"
        >
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          :value="false"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Admin</v-list-item-title>
          </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in admins"
              :key="i"
              link
              :to="{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
          v-if="this.$store.state.user.rol === 'Administrador'"
             :value="false"
             prepend-icon="mdi-book-cog"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Permisos</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in cruds"
              :key="i"
              link
              :to="{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
      </v-list>
    </v-card>
    </v-navigation-drawer>
    <v-main class="grey lighten-2">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthComp',

  data: () => ({
    drawer: null,
    admins: [
      ['Categorias', 'mdi-view-list', 'Categoria'],
      ['Articulos', 'mdi-basket', 'Articulo'],
    ],
    cruds: [
      ['Usuarios', 'mdi-account-multiple-outline', 'Usuario'],
    ],
  }),
  created(){
    this.$store.dispatch('autoLogin')
  },
  methods:{
    salir(){
      this.$store.dispatch('out');
    }
  }
};
</script>
