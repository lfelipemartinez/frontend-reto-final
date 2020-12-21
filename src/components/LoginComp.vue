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
          <template>
            <v-btn text :to="{ name: 'Login' }">
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>

            <v-divider vertical></v-divider>
          </template>
          <template>
            <v-btn text :to="{ name: 'AuthV' }">
              <v-icon>
                mdi-application-cog
              </v-icon>
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
              <v-layout>
                  <v-flex>
                <v-row
                align="center"
                align-content="center">
                  <v-col>
                    <v-card class="pa-12">
                      <v-card-title>Login</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-text-field
                            v-model="login.email"
                            label="E-mail"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="login.password"
                            label="Contraseña"
                            type="password"
                            required
                          ></v-text-field>
                          <v-btn
                            :disabled="
                              !(this.login.password && this.login.email)
                            "
                            color="success"
                            class="mr-4"
                            @click="loginUser"
                            block
                          >
                            Log in
                          </v-btn>
                        </v-form>
                      </v-card-text>
                      <v-card-actions></v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                </v-flex>
              </v-layout>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import swal from "sweetalert";
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
    name: 'LoginComp',
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
        loginUser() {
        axios
        .post('http://localhost:3000/api/usuario/login', this.login)
        .then(response => {
            return response.data;
        })
        .then(data => {
            this.$store.dispatch('saveToken', data.tokenReturn)
            this.$router.push({path: '/authv'})
            swal("Exitoso", "login exitoso", "success");
            console.log(data)
            
        })
        .catch( error => {
            swal("Error", "datos incorrectos", "error");
            console.log(error);
            return error;
        })
    },
  },
};
</script>
