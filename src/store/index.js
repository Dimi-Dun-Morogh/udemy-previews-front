import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import axios from "axios";
const { PREVIEWS, PRELOADER } = mutations;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    previews: {},
    preloader: true
  },
  getters: {
    previews: ({ previews }) => previews,
    preloader: ({ preloader }) => preloader
  },
  mutations: {
    [PREVIEWS](state, value) {
      state.previews = value;
    },
    [PRELOADER](state, value) {
      state.preloader = value;
    }
  },
  actions: {
    async getPreviews({ dispatch, commit }, url) {
      try {
        commit(PRELOADER, true);
        const response = await axios.post(
          "https://parse-udemy-previews.herokuapp.com/previews",
          {
            url
          }
        );
        dispatch("serializePreviews", response.data);
        console.log(response.data);
      } catch (error) {
        commit(PRELOADER, false);
        return Promise.reject(error);
      } finally {
        commit(PRELOADER, false);
      }
    },
    serializePreviews({ commit }, data) {
      let serialized = [];
      data.results.forEach(item => {
        let videoName = item.videoName.split(" ");
        item.videoPreview = videoName.pop();
        item.videoName = videoName.join(" ");
        serialized.push(item);
      });
      data.results = serialized;
      commit(PREVIEWS, data);
    },
    sortByDurationDown({ commit, getters }) {
      const { previews } = getters;
      previews.results.sort(
        (a, b) => b.durationInSeconds - a.durationInSeconds
      );
      commit(PREVIEWS, previews);
    },
    sortByDurationUp({ commit, getters }) {
      const { previews } = getters;
      previews.results.sort(
        (a, b) => a.durationInSeconds - b.durationInSeconds
      );
      commit(PREVIEWS, previews);
    }
  },
  modules: {}
});
