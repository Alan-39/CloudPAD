import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#3f8cb5',
      },
      dark: {
        primary: '#212121',
        secondary: '#757575',
      }
    },
  },
});
