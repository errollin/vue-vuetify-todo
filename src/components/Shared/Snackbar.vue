<template>
  <v-snackbar v-model="show" timeout="-1">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="hide"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.state.snackbar.show;
    },
    text() {
      return this.$store.state.snackbar.text;
    },
  },
  methods: {
    hide() {
      this.$store.dispatch('hideSnackbar');
    },
  },
};
</script>

<style scoped>
</style>