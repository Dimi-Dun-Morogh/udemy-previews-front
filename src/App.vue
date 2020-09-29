<template>
  <div id="app">
    <b-button title="info" class="btnInfo" v-b-modal.modal-1 variant="success">
      <b-icon icon="info-circle"></b-icon>
    </b-button>
    <b-modal
      id="modal-1"
      body-bg-variant="light"
      headerBgVariant="dark"
      header-text-variant="light"
    >
      <p class="my-4">
        by default data is fetched for
        <a href="#" @click="clickLink"
          >https://www.udemy.com/course/flutter-dart-the-complete-flutter-app-development-course/</a
        >;
        <br />
        copy pase any udemy course url to parse its avalaible preview video info
        <br />
        few url's for example (click on them) :
        <a href="#" @click="clickLink"
          >https://www.udemy.com/course/modern-javascript-from-beginning/</a
        >
        <br />
        <a href="#" @click="clickLink"
          >https://www.udemy.com/course/complete-react-developer-zero-to-mastery/</a
        >
      </p>
    </b-modal>
    <div class="input-wrap mb-2">
      <b-input-group size="sm" class="mb-2">
        <b-form-input
          v-model="text"
          placeholder="enter any udemy course url"
          @keydown.enter="fetchData"
        ></b-form-input>
        <b-input-group-prepend is-text class="searchBtn" @click="fetchData">
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
      </b-input-group>
    </div>
    <div class="d-flex space-between">
      <span
        >previews for
        <a :href="previews.url">{{ previews.courseName }}</a></span
      >
      <b-button-toolbar>
        <b-button-group class="ml-auto mb-1">
          <b-button
            title="duration longer"
            @click="durationDown"
            :disabled="!this.disabled"
          >
            <b-icon icon="arrow-up-circle"></b-icon>
          </b-button>
          <b-button
            title="duration shorter"
            @click="durationUp"
            variant="success"
            :disabled="this.disabled"
          >
            <b-icon icon="arrow-down-circle"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    <ListContainer />
  </div>
</template>

<script>
import ListContainer from "./components/list-container";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    text: "",
    disabled: true
  }),
  components: {
    ListContainer
  },
  computed: {
    ...mapGetters(["previews"])
  },
  methods: {
    ...mapActions(["sortByDurationDown", "sortByDurationUp", "getPreviews"]),
    durationUp() {
      this.disabled = !this.disabled;
      this.sortByDurationUp();
    },
    durationDown() {
      this.disabled = !this.disabled;
      this.sortByDurationDown();
    },
    fetchData() {
      this.getPreviews(this.text);
    },
    clickLink(e) {
      console.log(e.target.text);
      this.$bvModal.hide("modal-1");
      this.getPreviews(e.target.text);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.62);
  padding: 5px;
  min-height: 300px;
  border-radius: 5px;
  margin-top: 30px;
  padding-top: 20px;
  position: relative;
}
body {
  margin: 0;
  padding: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(11, 19, 14, 1) 12%,
    rgba(0, 212, 255, 1) 100%
  );
}
.input-wrap {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.searchBtn {
  cursor: pointer;
}
.btnInfo {
  position: absolute;
  right: 0;
  margin-left: auto;
  top: 0;
}
</style>
