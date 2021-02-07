
<template>
<div class="wrapBox">
    <topComponent :title="topTitle" />
    <div class="box">
      <div class="topLayout">
        <div class="logoImg">
          <el-image :src="require('@/assets/images/logo.png')"  fit="fill"></el-image>
        </div>
        <div class="companyInfo">
          <div class="infoBox">
            <p class="infoName">汕头海潮玩具厂</p>
            <div class="userInfo">
              <div class="iten"><span class="title">联系人：</span>乔先生</div>
              <div class="iten"><span class="title">电话：</span>0755-2589633</div>
              <div class="iten"><span class="title">手机：</span>136999885632</div>
              <div class="iten"><span class="title">电子邮箱：</span>2463867116@qq.com</div>
            </div>
            <p class="addr"><span class="title">展厅地址：</span>广东省汕头市澄海区登峰路中段汕头海潮玩具厂</p>
          </div>
        </div>
      </div>
      <div class="floorBox">
        <div class="floorTitle">
          <span class="context">推荐产品</span>
          <span class="more" @click="toAllProduct('recommendProduct')">更多<span style="margin-left:8px;" class="el-icon-arrow-right"></span></span>
        </div>
        <div class="products">
          <div class="item" v-for="(item, i) in 8" :key="i">
            <el-image
              style="width: 282px; height: 211px; min-height: 211px;"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="contain"></el-image>
              <div class="context">
                <div class="productName">积木飞机</div>
                <div class="textBox">
                  <span>货号：8188B8188B</span>
                  <span>参考单价：<span class="price">￥3.8</span></span>
                </div>
              </div>
          </div>
          <p class="kong"></p>
          <p class="kong"></p>
          <p class="kong"></p>
        </div>
      </div>
      <div class="floorBox">
        <div class="floorTitle">
          <span class="context">全部产品</span>
          <span class="more" @click="toAllProduct('product')">更多<span style="margin-left:8px;" class="el-icon-arrow-right"></span></span>
        </div>
        <div class="products">
          <div class="item" v-for="(item, i) in 8" :key="i">
            <el-image
              style="width: 282px; height: 211px; min-height: 211px;"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="contain"></el-image>
              <div class="context">
                <div class="productName">积木飞机</div>
                <div class="textBox">
                  <span>货号：8188B8188B</span>
                  <span>参考单价：<span class="price">￥3.8</span></span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import topComponent from '@/components/shareFactoryTopComponent/shareFactoryTopComponent.vue'
export default {
  components: {
    topComponent
  },
  data () {
    return {
      topTitle: '',
      headerCellStyle: { backgroundColor: '#E5EEFF', color: '#333' },
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      tableData: [{
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }, {
        imageUrl: 'http://img.toysbear.com/ProductImgCutting//HS0000003/P0101765/P0101765_Photo.jpg',
        name: '实色拉线飞机',
        address: '汕头海潮玩具厂',
        productNumber: 'YS0046642',
        price: 17.3,
        price2: 20
      }]
    }
  },
  methods: {
    // 查看更多
    toAllProduct (item) {
      this.$router.push('/dontLoadShareFactoryAllProductsPC?id=' + item)
    },
    // 导出择样单
    exportExcel () {
      // eslint-disable-next-line camelcase
      const { the_nu, client_nu, hallNumber } = this.$route.query
      this.$http.post('/api/GetQuoteListBasicExcel', {
        the_nu: the_nu,
        client_nu: client_nu,
        hallNumber: hallNumber
      }, { responseType: 'blob' }).then(res => {
        const fileName = '择样订单.xls'
        const blob = res.data
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // 兼容IE
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else { // 兼容Google及fireFox
          const link = document.createElement('a')
          link.style.display = 'none'
          link.download = fileName
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href) // 释放URL 对象
          document.body.removeChild(link)
        }
      })
    },
    // 获取择样列表
    async getQuoteListBasicPage () {
      // eslint-disable-next-line camelcase
      const { the_nu, client_nu, hallNumber } = this.$route.query
      console.log(the_nu, client_nu, hallNumber, this.$route.query)
      const fd = {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        the_nu: the_nu,
        client_nu: client_nu,
        hallNumber: hallNumber,
        keyWord: '',
        type: 0
      }
      const res = await this.$http.post('/api/GetQuoteListBasicPage', fd)
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items
        this.totalCount = res.data.result.item.totalCount
      } else {
        this.$message.error(res.data.result.msg)
      }
    },
    // 修改页容量
    handleSizeChange (page) {
      this.pageSize = page
    },
    // 修改当前页
    currentChange (page) {
      this.currentPage = page
    }
  },
  created () {
    if (document.body.clientWidth <= 1024) this.$router.push('/dontLoadShareFactory?id=' + this.$route.query.id)
  },
  mounted () {
    this.getQuoteListBasicPage()
  }
}
</script>
<style scoped lang='less'>
@import './dontLoadShareFactoryPC.less';
</style>
