<template>
    <v-list dense>
        <v-list-item-group
            v-model="selectedItem"
            color="secondary"
        >
            <v-list-item
                v-for="(item, idx) in items"
                :key="idx"
                @click="redirect(item.path)"
                >
                <v-list-item-content>
                    <v-list-item-title 
                        v-text="item.text"
                        
                    ></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        data: () => ({
            selectedItem: 0,
            items: [
                { text: 'Drive', path: "/" },
                { text: 'Photos', path: "/photos" },
                { text: 'Videos', path: "/videos" },
            ],
        }),

        methods: {
            redirect(path) {
                this.$router.push(path)
            }
        }
    }
</script>