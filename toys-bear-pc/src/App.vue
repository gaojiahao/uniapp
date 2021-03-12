<template>
  <router-view @changeId="changeId" :id="id" />
</template>

<style lang="scss"></style>
<script>
import { ref } from "vue";
export default {
  setup() {
    const id = ref(1);
    function changeId() {
      id.value++;
    }
    return {
      id,
      changeId
    };
  }
};
</script>
