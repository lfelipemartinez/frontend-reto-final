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

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-carousel cycle>
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>

              <div>
                <v-alert
                  border="left"
                  colored-border
                  color="deep-purple accent-4"
                  elevation="2"
                >
                  Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer
                  turpis ut velit. Nulla facilisi.. Morbi mollis tellus ac
                  sapien. Fusce vel dui. Praesent ut ligula non mi varius
                  sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse
                  enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </v-alert>
              </div>
              <div>
                <v-container>
                  <v-row justify="space-around">
                    <v-col
                      v-for="elevation in elevations"
                      :key="elevation"
                      cols="12"
                      md="4"
                    >
                      <v-sheet class="pa-12" color="grey lighten-3">
                        <v-sheet
                          :elevation="elevation"
                          class="mx-auto"
                          height="100"
                          width="100"
                        ></v-sheet>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div>
                <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                  <v-card-title>
                    <v-icon large left>
                      mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS
                    because most gotcha edge cases are type invalid as well."
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                          class="elevation-6"
                          alt=""
                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Evan You</v-list-item-title>
                      </v-list-item-content>

                      <v-row align="center" justify="end">
                        <v-icon class="mr-1">
                          mdi-heart
                        </v-icon>
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">
                          mdi-share-variant
                        </v-icon>
                        <span class="subheading">45</span>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </div>
              <v-footer dark padless>
                <v-card class="flex" flat tile>
                  <v-card-title class="teal">
                    <strong class="subheading"
                      >Get connected with us on social networks!</strong
                    >

                    <v-spacer></v-spacer>

                    <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                      <v-icon size="24px">
                        {{ icon }}
                      </v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="py-2 white--text text-center">
                    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                  </v-card-text>
                </v-card>
              </v-footer>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Inicio",
  data() {
    return {
      elevations: [6, 12, 18],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src:
            "https://limoncomunicacion.com/wp-content/uploads/2018/12/Dise%C3%B1o-web-servicios-limoncomunicacion.com_.png",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    salir() {
      this.$store.dispatch("out");
    },
  },
};
</script>
