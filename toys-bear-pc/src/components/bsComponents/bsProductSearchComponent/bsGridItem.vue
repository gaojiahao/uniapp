<template>
  <div class="bsGridItem">
    <div class="itemImg">
      <el-image
        style="min-width:222px;min-height:166px;"
        fit="contain"
        :src="item && item.img"
        lazy
      >
        <div slot="placeholder" class="image-slot">
          <img :src="require('@/assets/images/imgError.png')" />
        </div>
        <div slot="error" class="image-slot">
          <img :src="require('@/assets/images/imgError.png')" />
        </div>
      </el-image>
    </div>
  </div>
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
  mounted() {}
};
</script>
<style scoped lang="less">
.bsGridItem {
  width: 19%;
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  .itemImg {
    position: relative;
    display: flex;
    justify-content: center;
    .el-image {
      img {
        width: 100%;
        height: 166px;
        object-fit: contain;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }
    }
  }
}
</style>
