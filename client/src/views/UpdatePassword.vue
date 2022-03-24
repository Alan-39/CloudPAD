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
          :loading="loading"
        >
          <template slot="progress">
            <v-progress-linear
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          
          <h2 class="mt-4">Change my password</h2>
          <v-form @submit.prevent="update">
            <v-card-text>
              <v-text-field
                type="password"
                label="Old Password"
                v-model="oldPassword"
              ></v-text-field>
              <v-text-field
                type="password"
                label="New Password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                type="password"
                label="Re-enter Password"
                v-model="repassword"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                depressed
                color="secondary"
                type="submit"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-form>
          <v-divider class="mx-4 my-2"></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService.js'
  import AlertMsg from '@/components/AlertMsg.vue'

  export default {
    components: {
      AlertMsg,
    },

    data: () => ({
      oldPassword: '',
      password: '',
      repassword: '',
      loading: false,
      showAlert: false,
      messageType: '',
      alertMessage: '',
    }),
    methods: {
      update() {
        AuthenticationService.update({
          oldPassword: this.oldPassword,
          password: this.password,
          repassword: this.repassword,
        })
        .then(res => {
          if (res.data.success == true) {
            this.messageType = "success"
            this.showAlert = true 
            this.alertMessage = res.data.message
          }
          if (res.data.success == false) {
            this.messageType = "error"
            this.showAlert = true 
            this.alertMessage = res.data.message
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
