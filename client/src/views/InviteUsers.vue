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
                        <tr>
                            <td>sdgsdfsdfvd</td>
                            <td>null</td>
                            <td>
                                <v-btn
                                    color="error"
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
                >
                    Generate Code
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
</script>