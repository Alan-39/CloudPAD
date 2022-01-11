<template>
  <v-container fluid fill-height>
    <v-row class="text-center">
      <v-col>
        <v-card
          class="mx-auto"
          max-width="450"
          outlined
          elevation="3"
          :loading="loading"
        >
          <template slot="progress">
            <v-progress-linear
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <form>
            <v-card-text>
              <v-text-field
                type="text"
                label="Username"
                v-model="username"
              ></v-text-field>
              <v-text-field
                type="password"
                label="Password"
                v-model="password"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                depressed
                color="secondary"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </form>
          <v-divider class="mx-4 my-2"></v-divider>
          <router-link 
            to="/register"
            style="text-decoration: none"
          >
            <v-card-actions>
              <v-btn
                block
                outlined
                color="secondary"
              >
                Register
              </v-btn>
            </v-card-actions>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data: () => ({
      username: '',
      password: '',
      loading: false,

    }),

    methods: {
      async login () {
        this.loading = true
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.loading = false
        console.log(response.data)
      },
    },
  }
</script>
