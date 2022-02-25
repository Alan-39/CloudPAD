<template>
  <v-theme-provider root>
    <v-app>
      <div v-if="!$route.meta.hideNavigation">
        <v-navigation-drawer
          v-model="drawer"
          app
        >
          <SideMenuList/>
        </v-navigation-drawer>
        <v-app-bar
          app
          color="primary"
          dark
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <h1>
            <router-link 
              to="/"
              style="text-decoration: none; color: white;"
            >
              CloudPAD
            </router-link>
          </h1>
          <v-spacer></v-spacer>
          <v-icon
            color="light"
            @click="toggleTheme"

          >
            mdi-brightness-6
          </v-icon>
          <UserMenuList/>
        </v-app-bar>
      </div>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script>
  import UserMenuList from '@/components/UserMenuList.vue'
  import SideMenuList from '@/components/SideMenuList.vue'

  export default {
    name: 'App',
    components: {
      UserMenuList,
      SideMenuList
    },
    data: () => ({
      drawer: true,
    }),
    mounted() {
      const theme = localStorage.getItem("dark-theme");
      if (theme) {
          if (theme == "true") {
              this.$vuetify.theme.dark = true;
          } else {
              this.$vuetify.theme.dark = false;
          }
      }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem("dark-theme", this.$vuetify.theme.dark.toString());
      }
    }
  };
</script>


