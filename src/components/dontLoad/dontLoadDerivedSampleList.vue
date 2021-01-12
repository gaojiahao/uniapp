<template>
<div class="wrapBox">
    <div class="box">
      <div class="topLayout"></div>
      <div class="btnBox">
        <el-button type="primary">主要按钮</el-button>
      </div>
      <div class="tableBox">
        <el-table
          :data="tableData"
          border
          height="610"
          style="width: 100%">
          <el-table-column label="序号" width="57"  type="index" align="center"></el-table-column>
          <el-table-column
            prop="imageUrl"
            label="产品图片"
            align="center">
            <template slot-scope="scope">
              <el-image
              style="width: 75px; height: 55px"
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]">
            </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="来源厂商">
          </el-table-column>
          <el-table-column
            prop="productNumber"
            align="center"
            label="出厂货号">
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            label="出厂价格">
            <template slot-scope="scope">
              <span class="price">
                ￥{{scope.row.price}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price2"
            align="center"
            label="报出价格">
            <template slot-scope="scope">
              <span class="price2">
                ￥{{scope.row.price2}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
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
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang='less'>
@deep: ~">>>";
.wrapBox{
  width: 100%;
  height: 100vh;
  background: #F5F5F5;
  .box{
    padding-top: 16px;
    width: 1200px;
    margin: 0 auto;
    .topLayout{
      height: 152px;
      background-color: #fff;
    }
    .btnBox{
      height: 79px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-button{
        width: 110px;
        height: 32px;
        background: linear-gradient(180deg, #2E6DFF 0%, #1654E3 100%);
        box-shadow: 0px 3px 10px rgba(24, 86, 229, 0.3);
        border-radius: 2px;
        color: #FFFFFF;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tableBox{
      height: 610px;
      background-color: #fff;
      color: #1B1B1B;
      .price{
        color: #F4382E;
      }
      .price2{
        color: #165AF7;
      }
    }
  }
}
</style>
