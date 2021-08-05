import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Wake up',
          done: false,
        },
        {
          id: 2,
          title: 'Get bananas',
          done: false,
        },
        {
          id: 3,
          title: 'Eat bananas',
          done: false,
        },
      ],
      snackbar: {
        show: false,
        text: '',
      },
    };
  },
  getters: {},
  mutations: {
    addTask(state, payload) {
      let newTask = {
        id: Date.now(),
        title: payload,
        done: false,
      };
      state.tasks.push(newTask);
    },
    doneTask(state, payload) {
      let id = payload;
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, payload) {
      let id = payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    showSnackbar(state, payload) {
      state.snackbar.show = true;
      state.snackbar.text = payload;
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    addTask(context, payload) {
      let timeout = 0;
      context.commit('addTask', payload);
      if (context.state.snackbar.show) {
        context.commit('hideSnackbar');
        timeout = 500;
      }
      setTimeout(() => {
        context.commit('showSnackbar', 'Task added!');
        if (context.state.snackbar.show) {
          setTimeout(() => {
            context.commit('hideSnackbar');
          }, 1500);
        }
      }, timeout);
    },
    doneTask(context, payload) {
      context.commit('doneTask', payload);
    },
    deleteTask(context, payload) {
      let timeout = 0;
      context.commit('deleteTask', payload);
      if (context.state.snackbar.show) {
        context.commit('hideSnackbar');
        timeout = 500;
      }
      setTimeout(() => {
        context.commit('showSnackbar', 'Task added!');
        if (context.state.snackbar.show) {
          setTimeout(() => {
            context.commit('hideSnackbar');
          }, 1500);
        }
      }, timeout);
    },
    hideSnackbar(context) {
      context.commit('hideSnackbar');
    },
  },
  modules: {},
});
