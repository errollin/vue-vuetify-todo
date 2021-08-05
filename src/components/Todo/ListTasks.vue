<template>
  <v-list class="pt-0" flat>
    <task v-for="task in tasks" :key="task.id" :task="task"></task>
  </v-list>
</template>

<script>
export default {
  components: {
    task: require('./Task.vue').default,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
};
</script>

<style scoped>
</style>