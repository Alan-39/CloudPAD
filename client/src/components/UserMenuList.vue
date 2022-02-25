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
          <v-list-item-group
            color="secondary"
          >
            <v-list-item>
              <v-list-item-content
                @click="logout"
              >
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data: () => ({

    }),

    methods: {
      logout() {
        AuthenticationService.logout();
        this.$router.push('/login')
      }
    }
  };
</script>