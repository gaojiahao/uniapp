<template>
  <div class="bsGridComponent">
    <bsGridItem v-for="item in productList" :key="item.id" :item="item" />
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="kong"></div>
  </div>
</template>

<script>
import bsGridItem from "@/components/bsComponents/bsProductSearchComponent/bsGridItem.vue";
export default {
  components: {
    bsGridItem
  },
  props: {
    productList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.bsGridComponent {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .kong {
    width: 19%;
    border: 1px solid transparent;
  }
}
</style>
