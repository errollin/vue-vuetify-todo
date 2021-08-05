<template>
  <div>
    <v-list-item
      @click="doneTask(task.id)"
      :class="{ 'blue lighten-5': task.done }"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
          >
            {{ task.title }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click.stop="dialogs.delete = true" icon>
            <v-icon color="primary lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <dialog-delete
      @close="dialogs.delete = false"
      v-if="dialogs.delete"
      :task="task"
    ></dialog-delete>
  </div>
</template>

<script>
export default {
  props: ['task'],
  components: {
    'dialog-delete': require('./Dialogs/DialogDelete.vue').default,
  },
  data() {
    return {
      dialogs: {
        delete: false,
      },
    };
  },
  methods: {
    doneTask(id) {
      this.$store.dispatch('doneTask', id);
    },
  },
};
</script>

<style scoped>
</style>