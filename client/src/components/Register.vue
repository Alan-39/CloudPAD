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
            to="/"
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      username: '',
      password: '',
      inviteCode: '',
      loading: false
    }),
  }
</script>
