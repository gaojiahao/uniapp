<template>
  <div class="bsGridItem" @click="toProductDetails">
    <div class="itemImg">
      <el-image
        style="width:222px;height:166px;"
        fit="contain"
        :src="item.img"
        lazy
      >
        <div slot="placeholder" class="image-slot">
          <img :src="require('@/assets/images/imgError.png')" />
        </div>
        <div slot="error" class="image-slot">
          <img :src="require('@/assets/images/imgError.png')" />
        </div>
      </el-image>
      <div
        class="spotProductIcon"
        v-if="$route.path === '/bsIndex/bsSpotProducts'"
      ></div>
      <div
        class="newProductIcon"
        v-if="$route.path === '/bsIndex/bsLatestProducts'"
      ></div>
      <div
        class="vipProductIcon"
        v-if="$route.path === '/bsIndex/bsVIPProducts'"
      ></div>
    </div>
    <div class="content">
      <div class="productName">
        {{ item.name }}
      </div>
      <div class="addCartBox">
        <div class="left">
          <p class="item">
            <span class="title">参考单价：</span>
            <template v-if="item.isIntegral">
              <span class="price">{{ item.cu_de }}</span>
              <span class="price">{{ item.price }}</span>
            </template>
            <template v-else>
              积分查看价格
            </template>
          </p>
          <p class="item">
            <span class="title">出厂货号：</span>
            <span>{{ item.fa_no }}</span>
          </p>
        </div>
        <div class="right">
          <i v-if="isShopping" class="shoppingCartActive"></i>
          <i v-else class="shoppingCart"></i>
        </div>
      </div>
      <p class="item">
        <span class="title">包装：</span>
        <span class="conText">{{ item.ch_pa }}</span>
      </p>
      <p class="item">
        <span class="title">产品规格：</span>
        <span class="conText">
          {{ item.pr_le }} x {{ item.pr_wi }} x {{ item.pr_hi }} (cm)
        </span>
      </p>
      <p class="item">
        <span class="title">外箱规格：</span>
        <span class="conText">
          {{ item.ou_le }} x {{ item.ou_wi }} x {{ item.ou_hi }}(cm)
        </span>
      </p>
      <p class="item">
        <span class="title">包装规格：</span>
        <span class="conText">
          {{ item.in_le }} x {{ item.in_wi }} x {{ item.in_hi }}(cm)
        </span>
      </p>
      <p class="item">
        <span class="title">装箱量：</span>
        <span class="conText">{{ item.in_en }}/{{ item.ou_lo }}(pcs)</span>
      </p>
      <p class="item">
        <span class="title">体积/材积：</span>
        <span class="conText">
          {{ item.bulk_stere }}(cbm)/{{ item.bulk_feet }}(cuft)
        </span>
      </p>
      <p class="item">
        <span class="title">毛重/净重：</span>
        <span class="conText">{{ item.gr_we }}/{{ item.ne_we }}(kg)</span>
      </p>
      <div class="sourceBox">
        <i class="sourceIcon"></i>
        <template v-if="item.isIntegral">
          <span class="text">
            {{ item.supplierName }}
          </span>
        </template>
        <template v-else>
          <span class="text">
            {{ item.exhibitionName }}
          </span>
        </template>
      </div>
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
    return {
      isShopping: false
    };
  },
  methods: {
    async toProductDetails() {
      const res = await this.$http.post("/api/UpdateIntegral", {
        integraType: 1,
        productNumber: this.item.productNumber
      });
      const { code, msg } = res.data.result;
      if (code === 200) {
        this.$message.success("积分扣除成功");
      } else {
        this.$message.error(msg);
      }
      sessionStorage.setItem("productDetail", JSON.stringify(this.item));
      this.$store.commit("handlerBsMenuLabels", {
        linkUrl: "/bsIndex/bsProductDetails",
        name: "产品详情"
      });
      this.$router.push("/bsIndex/bsProductDetails");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.bsGridItem {
  width: 16%;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  .itemImg {
    position: relative;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 16px;
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
    .spotProductIcon,
    .newProductIcon,
    .vipProductIcon {
      position: absolute;
      left: 16px;
      top: 16px;
      width: 45px;
      height: 45px;
    }
    .spotProductIcon {
      width: 40px;
      height: 40px;
      background: url("~@/assets/images/spotProductIcon.png") center no-repeat;
      background-size: contain;
    }
    .newProductIcon {
      background: url("~@/assets/images/newProductIcon.png") center no-repeat;
      background-size: contain;
    }
    .vipProductIcon {
      background: url("~@/assets/images/vipProductIcon.png") center no-repeat;
      background-size: contain;
    }
  }
  .content {
    font-size: 13px;
    .productName {
      font-size: 14px;
      color: #000;
      padding: 4px 16px;
      box-sizing: border-box;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
    .addCartBox {
      display: flex;
      padding: 0 16px;
      box-sizing: border-box;
      .left {
        flex: 1;
        .item {
          padding: 4px 0;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          .title {
            color: #666;
          }
          .price {
            color: #eb1515;
          }
        }
      }
      .right {
        width: 46px;
        min-width: 46px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        .shoppingCart {
          width: 36px;
          height: 36px;
          transition: all 1s;
          background: url("~@/assets/images/shoppingCartIcon.png") no-repeat
            center;
          background-size: contain;
        }
        .shoppingCartActive {
          width: 36px;
          height: 36px;
          transition: all 1s;
          background: url("~@/assets/images/shoppingCartActiveIcon.png")
            no-repeat center;
          background-size: contain;
        }
        &:hover {
          .shoppingCart {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
          }
          .shoppingCartActive {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
          }
        }
      }
    }
    .item {
      padding: 4px 16px;
      box-sizing: border-box;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
      .title {
        color: #666;
      }
    }
    .sourceBox {
      height: 48px;
      padding: 0 16px;
      box-sizing: border-box;
      border-top: 1px solid #e5e5e5;
      margin-top: 10px;
      display: flex;
      align-items: center;
      .sourceIcon {
        width: 18px;
        min-width: 18px;
        height: 18px;
        margin-right: 16px;
        background: url("~@/assets/images/sourceIcon.png") no-repeat center;
        background-size: contain;
      }
      .text {
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
      }
    }
  }
}
</style>
