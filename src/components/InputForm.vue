<template>
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
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "InputForm",
  data: () => ({
    text: ""
  }),
  methods: {
    ...mapActions(["getPreviews"]),
    fetchData() {
      this.getPreviews(this.text);
    }
  }
};
</script>
<style scoped>
.input-wrap {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
