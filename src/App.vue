<template>
  <div id="app">
    <b-overlay
      :show="preloader"
      variant="dark"
      rounded="sm"
      class="preloaderOverlay"
    >
      <b-button
        title="info"
        class="btnInfo"
        v-b-modal.modal-1
        variant="success"
      >
        <b-icon icon="info-circle"></b-icon>
      </b-button>
      <Modal />
      <InputForm />
      <div class="d-flex justify-content-between align-items-center">
        <span
          >previews for
          <a :href="previews.url">{{ previews.courseName }}</a></span
        >
        <SortButtons
          :disabled="disabled"
          @onButtonUp="durationUp"
          @onButtonDown="durationDown"
        />
      </div>
      <ListContainer />
    </b-overlay>
  </div>
</template>

<script>
import ListContainer from "./components/list-container";
import Modal from "./components/Modal";
import InputForm from "./components/InputForm";
import SortButtons from "./components/SortButtons";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    disabled: true
  }),
  components: {
    ListContainer,
    Modal,
    InputForm,
    SortButtons
  },
  computed: {
    ...mapGetters(["previews", "preloader"])
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
  /* padding-top: 20px; */
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

.searchBtn {
  cursor: pointer;
}
.btnInfo {
  position: absolute;
  right: 0;
  margin-left: auto;
  top: 0;
}
.preloaderOverlay {
  min-height: 300px;
}
</style>
