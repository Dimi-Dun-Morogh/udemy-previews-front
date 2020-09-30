<template>
  <div>
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
        copy paste any udemy course url to parse its avalaible preview video
        info
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Modal",
  methods: {
    ...mapActions(["getPreviews"]),
    clickLink(e) {
      console.log(e.target.text);
      this.$bvModal.hide("modal-1");
      this.getPreviews(e.target.text);
    }
  }
};
</script>
