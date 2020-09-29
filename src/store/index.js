import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import axios from "axios";
const { PREVIEWS } = mutations;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    previews: {}
  },
  getters: {
    previews: ({ previews }) => previews
  },
  mutations: {
    [PREVIEWS](state, value) {
      state.previews = value;
    }
  },
  actions: {
    async getPreviews({ dispatch }, url) {
      try {
        const response = await axios.post(
          "https://parse-udemy-previews.herokuapp.com/previews",
          {
            url
          }
        );
        dispatch("serializePreviews", response.data);
        console.log(response.data);
      } catch (error) {
        return Promise.reject(error);
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
