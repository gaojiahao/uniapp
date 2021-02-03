<template>
  <div class="baojia">
  <div class="productBox">
    <div class="item" v-for="(item, i) in 10" :key="i">
      <div class="myImgBox">
        <el-image
        class="myImg"
        :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
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
    // 呼叫联系人
    // callContact () {
    //   const link = document.createElement('a')
    //   link.href = 'tel'
    //   link.value = '17603033458'
    //   link.click()
    // },
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
    console.log(this.$route.query)
    document.title = '产品详情'
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
    // if (this.$store.state.screenWidth > 1024) this.$router.push('/offerSharingPC?id=' + this.$route.query.id)
  },
  watch: {
    '$store.state.screenWidth' (val) {
      // if (val > 1024) {
      //   this.$router.push('/offerSharingPC?id=' + this.$route.query.id)
      // }
    }
  }
}
</script>
<style scoped lang='less'>
@import './dontLoadProductDetails.less';
</style>
