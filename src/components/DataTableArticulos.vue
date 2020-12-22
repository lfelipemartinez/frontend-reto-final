<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="articulos"
        sort-by="nombre"
        class="elevation-1"
        :loading="carga"
        loading-text="Cargando..."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Articulos</v-toolbar-title>
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
                  Agregar Articulo
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
                          v-model="editedItem.id"
                          label="Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Artículo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.codigo"
                          label="Código"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-select
                          v-model="editedItem.categoria"
                          label="Categoría"
                          :items="categorias"
                          item-text="id"
                          item-value="id"
                          return-id
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          v-model="editedItem.descripcion"
                          label="Descripción"
                          auto-grow
                          no-resize
                          counter="250"
                        ></v-textarea>
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
  name: "DataTableArticulos",

  data: () => ({
    carga: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id" },
      {
        text: "Articulo",
        align: "start",
        sortable: true,
        value: "nombre",
      },
      { text: "Código", value: "codigo" },
      { text: "Categoría", value: "categoriaId" },
      { text: "Descripción", value: "descripcion", sortable: false },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    articulos: [],
    categorias: [],
    editedId: -1,
    editedItem: {
      id: 0,
      nombre: "",
      codigo: "",
      categoria: "",
      descripcion: "",
      estado: 0,
    },
    defaultItem: {
      id: 0,
      nombre: "",
      codigo: "",
      categoria: "",
      descripcion: "",
      estado: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedId === -1 ? "Agregar Artículo" : "Editar Artículo";
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
    this.categoriaList();
  },

  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/articulo/list")
        .then((response) => {
          this.loadingData = false;
          this.articulos = response.data;
          this.carga = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    categoriaList() {
      axios
        .get("http://localhost:3000/api/categoria/list", {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          this.categorias = response.data;
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
            "http://localhost:3000/api/articulo/deactivate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                token: this.$store.state.token,
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
            "http://localhost:3000/api/articulo/activate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                token: this.$store.state.token,
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
            "http://localhost:3000/api/articulo/update",
            {
              id: this.editedItem.id,
              codigo: this.editedItem.codigo,
              categoriaId: this.editedItem.categoria,
              nombre: this.editedItem.nombre,
              descripcion: this.editedItem.descripcion,
            },
            {
              headers: {
                token: this.$store.state.token,
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
            "http://localhost:3000/api/articulo/add",
            {
              id: this.editedItem.id,
              codigo: this.editedItem.codigo,
              categoriaId: this.editedItem.categoria,
              nombre: this.editedItem.nombre,
              descripcion: this.editedItem.descripcion,
              estado: 1,
            },
            {
              headers: {
                token: this.$store.state.token,
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
