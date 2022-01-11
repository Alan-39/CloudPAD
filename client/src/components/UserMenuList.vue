<template>
    <v-menu
        bottom
        left
        transition="scroll-y-reverse-transition"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
        >
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me 1' },
        { title: 'Click Me 2' },
        { title: 'Click Me 3' },
        { title: 'Click Me 4' },
      ],
    }),
  };
</script>