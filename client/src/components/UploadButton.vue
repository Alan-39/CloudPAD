<template>
    <Transition name="slide-up">
        <v-btn
            elevation="4"
            large
            v-if="uploadState === 'rest'"
            @click="uploadState = 'uploading'"
        >
            <v-icon
            color="light"
            >
                mdi-upload
            </v-icon>
                Upload
        </v-btn>
        <v-btn
            elevation="4"
            large
            v-else-if="uploadState === 'uploading'"
            @click="uploadState = 'done'"
        >
            <v-progress-circular
            indeterminate
            color="green"
            ></v-progress-circular>
        </v-btn>
        <v-btn 
            elevation="4"
            large
            v-else-if="uploadState === 'done'"
            @click="uploadState = 'error'"
        >
            <v-icon
            color="light"
            >
                mdi-check
            </v-icon>
        </v-btn>
        <v-btn
            elevation="4"
            large
            v-else-if="uploadState === 'error'"
            @click="uploadState = 'rest'"
        >
            <v-icon
            color="light"
            >
                mdi-alert
            </v-icon>
        </v-btn>
    </Transition>
</template>

<script>
    export default {
        data: () => ({
            uploadState: "rest"
        })
    }
</script>