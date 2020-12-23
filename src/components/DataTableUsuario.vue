<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="usuarios"
        sort-by="id"
        class="elevation-1"
        :loading="carga"
        loading-text="Cargando..."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Categorias</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Agregar Usuario
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.rol"
                          label="Rol"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Esta seguro de realizar este cambio?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon medium @click="deleteItem(item)">
            <template v-if="item.estado">
              mdi-toggle-switch
            </template>
            <template v-else>
              mdi-toggle-switch-off-outline
            </template>
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="list">
            Cargar
          </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DataTableUsuario",
  data: () => ({
    carga: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "id" },
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "nombre",
      },
      { text: "Email", value: "email", sortable: false },
      { text: "Rol", value: "rol"},
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usuarios: [],
    editedId: -1,
    editedItem: {
      id: 0,
      nombre: "",
      rol: "",
      email: "",
      password:'',
      estado: 0,
    },
    defaultItem: {
      id: 0,
      nombre: "",
      rol: "",
      email: "",
      password:'',
      estado: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedId === -1 ? "Agregar Usuario" : "Editar Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
  },

  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/usuario/list", {
          headers: {
            Token: this.$store.state.token,
          },
        })
        .then((response) => {
          this.usuarios = response.data;
          this.carga = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedId = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedId = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        axios
          .put(
            "http://localhost:3000/api/usuario/deactivate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                Token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .put(
            "http://localhost:3000/api/usuario/activate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                Token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedId = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedId = -1;
      });
    },
    save() {
      if (this.editedId > -1) {
        axios
          .put(
            "http://localhost:3000/api/usuario/update",
            {
              id: this.editedItem.id,
              nombre: this.editedItem.nombre,
              rol: this.editedItem.rol,
              email: this.editedItem.email,
              password: this.editedItem.password,
            },
            {
              headers: {
                Token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .post(
            "http://localhost:3000/api/usuario/add",
            {
              nombre: this.editedItem.nombre,
              rol: this.editedItem.rol,
              email: this.editedItem.email,
              password: this.editedItem.password,
            },
            {
              headers: {
                Token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      }
      this.close();
    },
  },
};
</script>
