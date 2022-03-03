<template>
  <v-container fluid fill-height>
    <v-row class="text-center">
      <v-col align="center">
        <div
          v-if="showAlert == true"
        >
          <AlertMsg 
            v-bind:messageType="messageType"
            v-bind:message="alertMessage"
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
          <v-form @submit.prevent="login">
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
                type="submit"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
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
  import AlertMsg from '@/components/AlertMsg.vue'

  export default {
    components: {
      AlertMsg,
    },

    data: () => ({
      username: '',
      password: '',
      loading: false,
      showAlert: false,
      messageType: '',
      alertMessage: '',
    }),

    methods: {
      login () {
        this.loading = true
        AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.loading = false
          if (res.data.success == true && res.data.updatePwdRequire == true) {
            this.$router.push('/changepassword')
            console.log(res.data);
          }
          if (res.data.success == true) {
            this.$router.push('/')
          }
          if (res.data.success == false) {
            this.messageType = "error"
            this.showAlert = true
            this.alertMessage = res.data.message
          }
        })
        .catch(error => {
          console.error(error)
        })
      }
    },
  }
</script>
