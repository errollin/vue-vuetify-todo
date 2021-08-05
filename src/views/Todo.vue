<template>
  <div class="home">
    <field-add-task></field-add-task>
    <list-tasks v-if="tasks.length"></list-tasks>
    <no-tasks v-else></no-tasks>
  </div>
</template>

<script>
export default {
  components: {
    'field-add-task': require('../components/Todo/FieldAddTask.vue').default,
    'list-tasks': require('../components/Todo/ListTasks.vue').default,
    'no-tasks': require('../components/Todo/NoTasks.vue').default,
  },
  name: 'Home',
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
