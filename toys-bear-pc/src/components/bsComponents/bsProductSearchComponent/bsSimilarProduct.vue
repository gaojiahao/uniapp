<template>
  <div>敬请期待</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {
    console.log(this.item);
  }
};
</script>
<style scoped lang="less"></style>
