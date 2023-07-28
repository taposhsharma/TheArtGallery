import { createStore } from "vuex";
let newstate = false;
const user = localStorage.getItem("user");
if (user == null) {
  newstate = false;
} else {
  newstate = true;
}
const store = createStore({
  state() {
    return {
      loggedIn: newstate,
    };
  },
  mutations: {
    changeLog(state) {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export default store;
