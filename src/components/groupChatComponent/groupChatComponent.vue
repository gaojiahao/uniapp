<template>
  <!-- 发起群聊 -->
  <div class="wrapBox">
    <div class="topLayout">发起群聊</div>
    <!-- 发起群聊 -->
    <div class="searchBox">
      <div class="inputBox">
        <el-input
          class="searchInput"
          prefix-icon="iconfont icon-sousuo"
          v-model="search"
          clearable
          placeholder="请输入关键词">
        </el-input>
        <el-button type="primary" round>搜索</el-button>
      </div>
    </div>
    <!-- 下拉列表 -->
    <div class="contentList">
      <!-- 好友item -->
      <div class="itemBox" v-for="(item, i) in friendList" :key="i" @click="openTwoView({item,componentName: 'friendApplicationComponent',code:1})">
          <el-image
            fit="contain"
            :src="require('@/assets/images/imgError.jpg')"
            lazy
          >
            <div
              slot="placeholder"
              class="image-slot"
              style="width: 40px; height: 40px; margin: 0 auto"
            >
              <img class="errorImg" src="~@/assets/images/imgError.jpg" alt />
            </div>
            <div
              slot="error"
              class="image-slot"
              style="width: 40px; height: 40px; margin: 0 auto"
            >
              <img class="errorImg" src="~@/assets/images/imgError.jpg" alt />
            </div>
          </el-image>
          <div class="name">XXX什么什么什么什么群</div>
          <div class="count">(999)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      friendList: 20
    }
  },
  methods: {
    openTwoView (item) {
      console.log(item)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang='less'>
@deep: ~">>>";
.wrapBox {
  width: 100%;
  height: 827px;
  .topLayout {
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #f5f5f5;
  }
  .searchBox {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;
    .inputBox {
      flex: 1;
      background: #f5f5f5;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      @{deep} .searchInput {
        input.el-input__inner {
          background-color: transparent;
          border: none;
        }
      }
      .el-button {
        background-color: #165af7;
      }
    }
  }
  .contentList {
    width: 100%;
    height: calc(100% - 113px);
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .itemBox {
      height: 60px;
      display: flex;
      width: 100%;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      box-sizing: border-box;
          .el-image {
            width: 40px;
            height: 40px;
            img {
              width: 40px;
              height: 40px;
            }
          }
        .name {
          margin-left: 10px;
          max-width: 250px;
          color: #1b1b1b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .count {
          font-size: 12px;
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
         }
    }
  }
}
</style>
