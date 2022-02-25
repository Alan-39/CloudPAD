<template>
    <v-container fluid>
        <v-row class="ma-1">
            <v-col>
                <UploadButton></UploadButton>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="ma-1">Folders</div>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="ma-1">Files</div>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UploadButton from '@/components/UploadButton.vue'

    export default {
        components: {
            UploadButton,
        },
        data: () => ({
            uploadState: "rest"
        }),

        methods: {

        }
    }
</script>