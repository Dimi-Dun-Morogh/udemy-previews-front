<template>
  <div>
    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between li-item"
        v-for="(video, index) in previews.results"
        :key="index"
        ><span>{{ video.videoName }}</span>
        <span>{{ video.videoPreview }} {{ video.duration }}</span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ListContainer",
  computed: {
    ...mapGetters(["previews"])
  },
  mounted() {
    this.getPreviews();
  },
  methods: {
    ...mapActions(["getPreviews"])
  }
};
</script>

<style scoped>
.li-item {
  margin-bottom: 3px;
}
.li-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}
</style>
