<template>
    <Transition name="slide-up">
        <v-btn
            elevation="4"
            v-if="uploadState === 'rest'"
            large
            @click="$refs.file.click()"
        >
            <form class="col-12" enctype="multipart/form-data">
                <input
                    style="display:none"
                    type="file"
                    accept="image/*"
                    ref="file"
                    @change="onFileSelected($event)"
                />
                    <v-icon
                        color="light"
                    >
                        mdi-upload
                    </v-icon>
                    Upload
            </form>
        </v-btn>
        <v-btn
            elevation="4"
            large
            v-else-if="uploadState === 'uploading'"
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
    import UploadService from '@/services/UploadService'

    export default {
        data: () => ({
            uploadState: "rest",
            file: null,
        }),

        methods: {
            onFileSelected(event) {
                this.uploadState = "uploading"
                this.file = event.target.files[0];
                const fd = new FormData();

                fd.append("file", this.file);

                UploadService.upload(fd)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.uploadState = "done"
                        setTimeout(() => {
                            this.uploadState = "rest"
                        }, 2000)
                    }
                }).catch(err => {
                    console.log(err);
                });

            }
        }
    }
</script>