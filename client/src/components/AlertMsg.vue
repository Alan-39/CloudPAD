<template>
    <v-alert
        v-bind:type="messageType"
        v-bind:max-width="maxWidth"
    >
    {{ message }}
    </v-alert>
</template>

<script>
    export default {
        props: ['message', 'maxWidth', 'messageType']
    }
</script>