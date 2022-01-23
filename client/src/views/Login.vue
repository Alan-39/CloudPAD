<template>
  <v-container fluid fill-height>
    <v-row class="text-center">
      <v-col align="center">
        <div
          v-if="showError == true"
        >
          <ErrorMsg 
            v-bind:message="errMessage"
            maxWidth="450"
          />
        </div>
        <v-card
          class="mx-auto"
          max-width="450"
          outlined
          elevation="3"
          v-bind:loading="loading"
        >

          <template slot="progress">
            <v-progress-linear
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          
          <h2 class="mt-4">CloudPAD</h2>
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
  import ErrorMsg from '@/components/ErrorMsg.vue'

  export default {
    components: {
      ErrorMsg,
    },

    data: () => ({
      username: '',
      password: '',
      loading: false,
      showError: false,
      errMessage: '',
    }),

    methods: {
      login () {
        this.loading = true
        AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.loading = false
          if (response.status === 200) {
            this.$router.push('/')
          }
        })
        .catch(err => {
          this.loading = false
          this.showError = true
          this.errMessage = 'Something went wrong'
          console.error(err)
        })
      }
    },
  }
</script>
