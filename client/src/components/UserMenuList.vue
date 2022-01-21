<template>
    <v-menu
        bottom
        left
        transition="scroll-y-reverse-transition"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        </template>
        <v-list>
            <v-list-item
            >
              <router-link 
                to="/login"
                style="text-decoration: none"
              >
                <v-list-item-title
                @click="logout"
                >
                  Log out
                </v-list-item-title>
              </router-link>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data: () => ({

    }),

    methods: {
      async logout() {
        await AuthenticationService.logout();
      }
    }
  };
</script>