<template>
  <b-button-toolbar>
    <b-button-group class="ml-auto mb-1">
      <b-button
        title="duration longer"
        @click="onButtonDown"
        :disabled="!this.disabled"
      >
        <b-icon icon="arrow-up-circle"></b-icon>
      </b-button>
      <b-button
        title="duration shorter"
        @click="onButtonUp"
        variant="success"
        :disabled="this.disabled"
      >
        <b-icon icon="arrow-down-circle"></b-icon>
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>
<script>
export default {
  name: "SortButtons",
  props: ["disabled"],
  methods: {
    onButtonUp() {
      this.$emit("onButtonUp");
    },
    onButtonDown() {
      this.$emit("onButtonDown");
    }
  }
};
</script>
