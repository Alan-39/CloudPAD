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
          :loading="loading"
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
              <v-text-field
                type="password"
                label="Re-enter Password"
                v-model="repassword"
              ></v-text-field>
              <v-text-field
                type="text"
                label="Invite Code"
                v-model="invitecode"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                depressed
                color="secondary"
                @click="register"
              >
                Register
              </v-btn>
            </v-card-actions>
          </form>
          <v-divider class="mx-4 my-2"></v-divider>
          <router-link 
            to="/login"
            style="text-decoration: none"
          >
            <v-card-actions>
              <v-btn
                block
                outlined
                color="secondary"
              >
                Return to login
              </v-btn>
            </v-card-actions>
          </router-link>
          <div class="error" v-html="error" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  import ErrorMsg from '@/components/ErrorMsg.vue'

  export default {
    components: {
      ErrorMsg,
    },

    data: () => ({
      username: '',
      password: '',
      repassword: '',
      invitecode: '',
      error: null,
      loading: false,
      showError: false,
      errMessage: '',
    }),
    methods: {
      async register() {
        AuthenticationService.register({
          username: this.username,
          password: this.password  
        })
        .then(res => {
          this.showError = true 
          this.errMessage = res.data.message
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
