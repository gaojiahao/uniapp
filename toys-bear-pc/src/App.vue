<template>
  <router-view @changeId="changeId" :id="id" />
</template>

<script>
import { ref, provide } from "vue";
export default {
  setup() {
    const id = ref(1);
    function changeId() {
      id.value++;
    }
    const onRefresh = () => {
      console.log(123456789);
    };
    provide("reload", onRefresh);
    return {
      id,
      changeId
    };
  }
};
</script>
<style lang="scss"></style>
