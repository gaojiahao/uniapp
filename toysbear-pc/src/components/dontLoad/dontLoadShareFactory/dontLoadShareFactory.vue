<template>
  <div
    class="baojia">
  <!-- @scroll="baojiaScroll"
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled" -->
  <div class="boxOne">
    <div class="left">
      <el-image
      class="myImg"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="contain"></el-image>
    </div>
    <div class="right">
      <p class="item">
        <span class="contactTitle">联系人：</span>
        <span class="text">马冬梅</span>
        <a class="contactIcon" href="tel:17603033458"></a>
      </p>
      <p class="item">
        <span class="title">电话：</span>
        <span>0755-85114101</span>
        <span>10</span>
      </p>
      <p class="item">
        <span class="title">地址：</span>
        <span class="text">汕头汕头汕头汕头汕头汕</span>
        <span class="addrIcon"></span>
      </p>
    </div>
  </div>
  <div class="line"></div>
  <div class="allProductTitle">
    <span class="title">所有产品</span>
    <span style="color:#165AF8;" class="el-icon-arrow-right" @click="toAllProduct('allProduct')"></span>
  </div>
  <div class="productBox">
    <div class="item" @click.stop="toProductDetail(item)" v-for="(item, i) in 2" :key="i">
      <div class="myImgBox">
        <el-image
        class="myImg"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="contain"></el-image>
        <div class="newIcon"></div>
      </div>
      <div class="context">
        <p class="itemText name">积木飞机</p>
        <p class="itemText">出厂货号：<span>HS0046642</span></p>
        <p class="itemText">参考单价：<span class="price">￥10</span></p>
      </div>
      <div class="iconBox">
        <div class="vipIcon"></div>
        <div class="presentIcon"></div>
        <div class="cardIcon"></div>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <div class="allProductTitle">
    <span class="title">推荐产品</span>
    <span style="color:#165AF8;"  @click="toAllProduct('recommendProduct')" class="el-icon-arrow-right"></span>
  </div>
  <div class="productBox">
    <div class="item" @click.stop="toProductDetail(item)" v-for="(item, i) in 2" :key="i">
      <div class="myImgBox">
        <el-image
        class="myImg"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="contain"></el-image>
        <div class="newIcon"></div>
      </div>
      <div class="context">
        <p class="itemText name">积木飞机</p>
        <p class="itemText">出厂货号：<span>HS0046642</span></p>
        <p class="itemText">参考单价：<span class="price">￥10</span></p>
      </div>
      <div class="iconBox">
        <div class="vipIcon"></div>
        <div class="presentIcon"></div>
        <div class="cardIcon"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    // 查看产品详情
    toProductDetail (item) {
      this.$router.push('/dontLoadProductDetails?product=' + JSON.stringify(item))
    },
    // 查看所有产品
    toAllProduct (type) {
      this.$router.push('/dontLoadAllProducts?type=' + type)
    },
    // 呼叫联系人
    callContact () {
      const link = document.createElement('a')
      link.href = 'tel'
      link.value = '17603033458'
      link.click()
    },
    // 获取所有分类
    async getProductCategoryList () {
      this.$store.commit('updateAppLoading', true)
      const res = await this.$http.post('/api/SelectProductCategory', { companyNumber: this.productInfo.companyNumber })
      if (res.data.result.code === 200) {
        this.categoryList = res.data.result.item
        // this.categoryChildren = this.categoryList[0].children
      } else {
        this.$message.error(res.data.result.msg)
      }
      this.$store.commit('updateAppLoading', false)
    }
  },
  created () {
    if (document.body.clientWidth > 1024) this.$router.push('/dontLoadShareFactoryPC?id=' + this.$route.query.id)
  },
  beforeDestroy () {
    document.title = '小竹熊 云科技'
  },
  computed: {
    noMore () {
      return this.totalCount <= this.productList.length
    },
    disabled () {
      return this.$store.state.vueElementLoading || this.noMore
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang='less'>
@import './dontLoadShareFactory.less';
</style>
