<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col align="center">
        <v-img 
            :src="`${errorImagePath}404_shrug.png`"
            width="300px"
            >
        </v-img>
        <h1>404</h1>
        <h1>Uuuuf, this page doesn't exist</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn 
          @click="$router.back()"
          color="primary"
        >
          Bring me back! @-@
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      errorImagePath: process.env.BASE_URL
    })
  }
</script>