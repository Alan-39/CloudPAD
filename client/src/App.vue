<template>
  <v-theme-provider root>
    <v-app>
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
        <h1>CloudPAD</h1>
        <v-spacer></v-spacer>
        <v-switch
          v-model="$vuetify.theme.dark"
          color="secondary"
          class="mt-6"
        ></v-switch>
        <v-icon
          color="light"
        >
          mdi-brightness-6
        </v-icon>
        <UserMenuList/>
      </v-app-bar>

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
      drawer: false,
      items: [
        { title: 'Click Me 1' },
        { title: 'Click Me 2' },
        { title: 'Click Me 3' },
        { title: 'Click Me 4' },
      ],
    }),
  };
</script>


