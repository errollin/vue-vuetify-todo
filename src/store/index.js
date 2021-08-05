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
    };
  },
  getters: {},
  mutations: {
    addTask(state,payload) {
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
  },
  actions: {},
  modules: {},
});
