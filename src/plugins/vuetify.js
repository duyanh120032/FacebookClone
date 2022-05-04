// Styles
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "../styles/_variables.scss"

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify(
  {
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors:{
            primary:"#7BD5F5",
            secondary:"#385898",
          }
        }
      }
    },
    components,
    directives,
    icons: {
      iconfont:  "mdi",
    },
  }

  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);
