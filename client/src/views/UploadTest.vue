<template>
    <v-container fluid>
        <v-row class="text-center">
            <v-col align="center">
                <form class="col-12" enctype="multipart/form-data">
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileSelected($event)"
                    />
                    <v-text-field
                        type="text"
                        label="Title"
                        v-model="title"
                    ></v-text-field>
                    <v-btn
                        block
                        depressed
                        color="primary"
                        @click="upload"
                    >
                        Upload Item
                    </v-btn>
                </form>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col align="center">
                <div
                    v-if="showAlert == true"
                >
                    <v-alert
                    type="success"
                    dismissible
                    >
                        {{ alertMessage }}
                    </v-alert>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UploadService from '@/services/UploadService'

    export default {
        data: () => ({
            file: null,
            title: '',
            showAlert: false,
            alertMessage: '',
        }),

        methods: {
            onFileSelected(event) {
                this.file = event.target.files[0];
            },
            upload () {
                const fd = new FormData();
                fd.append("file", this.file);
                fd.append("title", this.title);

                UploadService.upload(fd)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.showAlert = true;
                        this.alertMessage = res.data.message;
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    }
</script>
