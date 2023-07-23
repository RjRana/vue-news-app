<template>
  <v-app id="app">
    <v-app-bar app>
      <slot name="back"></slot>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <slot name="search"></slot>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0" style="height: 100%">
        <v-sheet color="grey lighten-4" class="pa-6 overflow-auto" style="height: 100%">
          <slot name="actions"></slot>
          <v-row v-if="loading">
            <slot name="loader"></slot>
          </v-row>
          <v-row v-else>
            <slot></slot>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>
