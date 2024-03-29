<script setup lang="ts">
import TodoMenu from "@/components/Todo/TodoMenu.vue";

import { computed, reactive, toRefs } from "vue";
import { format } from "date-fns";

import { useTaskStore, useDialogStore, useSnackBarStore } from "@/stores";
import type { Menu, Task } from "@/types";

const props = defineProps<{ task: Task }>();

const task = computed<Task>(() => {
  return props.task;
});

const formattedDate = computed<(value: string) => string>(
  () => (value: string) => {
    return format(new Date(value), "MMM do,yyyy");
  }
);

const state = reactive<{
  menus: Array<Menu>;
}>({
  menus: [
    {
      title: "EDIT",
      icon: "mdi-pencil",
      event: () => {
        handleEditTask();
      },
    },
    {
      title: "DUE DATE",
      icon: "mdi-calendar",
      event: () => {
        handleEditDeadline();
      },
    },
    {
      title: "DELETE",
      icon: "mdi-delete",
      event: () => {
        handleDeleteTask();
      },
    },
  ],
});

const { menus } = toRefs(state);

const taskStore = useTaskStore();
const dialogStore = useDialogStore();
const snackBarStore = useSnackBarStore();

const handleDoneTask = (id: number) => {
  taskStore.doneTask(id);
  dialogStore.hideDialog();
};

const handleDeleteTask = () => {
  dialogStore.showDialog({
    type: "ALERT",
    title: "WARNING",
    content: "Do you want to delete this task?",
    confirm: {
      text: "Yes",
      event: () => {
        handleConfirmDelete();
      },
    },
    cancel: "No",
    data: null,
  });
};

const handleConfirmDelete = () => {
  taskStore.deleteTask(task.value.id);
  snackBarStore.showSnackBar("Task Deleted!");
};

const handleEditTask = () => {
  dialogStore.showDialog({
    type: "PROMPT",
    title: "INFO",
    content: "Please edit the current todo content.",
    confirm: {
      text: "SAVE",
      event: (taskTitle: string) => {
        handleConfirmEdit(task.value.id, taskTitle);
      },
    },
    cancel: "CANCEL",
    data: {
      inputText: task.value.title,
      placeholder: "Please enter a new task.",
    },
  });
};

const handleConfirmEdit = (taskId: number, taskTitle: string) => {
  if (taskTitle == "" || taskTitle == null) {
    snackBarStore.showSnackBar("Task title can't be empty!");
    return;
  }
  let task = taskStore.getTaskById(taskId);
  if (task.title == taskTitle) {
    snackBarStore.showSnackBar("Task title is the same as before!");
    return;
  }
  task.title = taskTitle;
  taskStore.updateTask(task);
  snackBarStore.showSnackBar("Task Updated!");
  dialogStore.hideDialog();
};

const handleEditDeadline = () => {
  dialogStore.showDialog({
    type: "PROMPT",
    title: "INFO",
    content: "Please edit the current todo content.",
    confirm: {
      text: "SAVE",
      event: (deadline: string) => {
        handleConfirmEditDeadline(task.value.id, deadline);
      },
    },
    cancel: "CANCEL",
    data: {
      inputType: "date",
      inputText: task.value.deadline ?? "",
      placeholder: "Please select a new deadline",
    },
  });
};

const handleConfirmEditDeadline = (taskId: number, deadline: string) => {
  if (deadline == "") {
    snackBarStore.showSnackBar("Task deadline can't be empty string!");
    return;
  }
  let task = taskStore.getTaskById(taskId);
  if (task.deadline == deadline) {
    snackBarStore.showSnackBar("Task deadline is the same as before!");
    return;
  }
  task.deadline = deadline;
  taskStore.updateTask(task);
  snackBarStore.showSnackBar("Task Deadline Updated!");
  dialogStore.hideDialog();
};
</script>

<template>
  <div class="todo-list-item">
    <v-list-item
      @click="handleDoneTask(task.id)"
      :value="task.title"
      :class="{ 'bg-pink-lighten-4': task.done }"
    >
      <template v-slot:prepend>
        <v-list-item-action start>
          <v-checkbox-btn
            color="pink-accent-2"
            :model-value="task.done"
          ></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
        {{ task.title }}
      </v-list-item-title>

      <template v-slot:append>
        <div
          class="text-grey-darken-1 d-flex flex-row justify-center align-center"
          v-if="task.deadline"
        >
          <v-icon size="small" icon="mdi-calendar"></v-icon>
          <span>{{ formattedDate(task.deadline) }}</span>
        </div>
        <TodoMenu :menus="menus" />
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<style lang="scss" scoped></style>
