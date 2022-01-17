<template>
    <v-alert
        type="error"
        v-bind:max-width="maxWidth"
        dismissible
    >
    {{ message }}
    </v-alert>
</template>

<script>
    export default {
        props: ['message', 'maxWidth']
    }
</script>