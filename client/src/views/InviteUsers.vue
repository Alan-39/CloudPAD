<template>
    <v-container fluid>
        <v-row class="mt-1 text-center">
            <v-col align="center">
                <h2>Invite Codes</h2>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col align="center">
                <v-simple-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Invite Code
                            </th>
                            <th class="text-left">
                                Used by
                            </th>
                            <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(code, idx) in codeList"
                            :key="idx"
                        >
                            <td>{{ code._id }}</td>
                            <td>{{ code.usedBy }}</td>
                            <td>
                                <v-btn
                                    color="error"
                                    @click="deleteCode(code._id, idx)"
                                >
                                    Delete
                                </v-btn>
                            </td>
                        </tr>

                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-row class="mt-1 text-center">
            <v-col align="center">
                <v-btn
                    color="success"
                    @click="generateCode()"
                >
                    Generate Code
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ReferralService from '@/services/ReferralService'

    export default {
        data: () => ({
            codeList: null,
        }),

        created() {
            ReferralService.getCodes()
                .then(res => {
                    this.codeList = res.data
                })
                .catch(err => console.log(err));
        },

        methods: {
            generateCode() {
                ReferralService.generateCode()
                    .then(res => {
                        this.codeList.push(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            },

            deleteCode(code, arrayIndex) {
                this.codeList.splice(arrayIndex, 1);
                ReferralService.deleteCode({ _id: code })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    }
</script>