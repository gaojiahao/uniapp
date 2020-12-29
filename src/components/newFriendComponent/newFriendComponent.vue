<template>
<!-- 添加好友 -->
  <div class="wrapBox">
    <div class="topLayout">
      <span></span>
      <span class="title">新的好友</span>
      <span class="add"><span @click="openTwoView({componentName: 'addFriendComponent'})">添加好友</span></span>
    </div>
    <div class="searchBox">
      <div class="inputBox">
        <el-input
          class="searchInput"
          prefix-icon="iconfont icon-sousuo"
          v-model="search"
          clearable
          placeholder="请输入关键词"
        >
        </el-input>
        <el-button type="primary" round>搜索</el-button>
      </div>
    </div>
    <div class="contentList">
      <!-- 好友item -->
      <div class="itemBox" v-for="(item, i) in friendList" :key="i" @click="openTwoView({item,componentName: 'friendApplicationComponent',code:1})">
        <div class="left">
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
          <div class="middle">
          <div class="name">宋小宝</div>
          <div class="company">您好 我是大大大大哥</div>
        </div>
        </div>
        <div class="right">
          <el-button
            size="mini"
            type="primary"
            @click.stop="openTwoView({item,componentName: 'friendApplicationComponent',code:2})"
            round
            >接受</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: null,
      friendList: [{
        name: 1,
        id: 1
      },
      {
        name: 2,
        id: 2
      }]
    }
  },
  methods: {
    openTwoView (item) {
      this.$emit('openTwoView', item)
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
  box-sizing: border-box;
  .topLayout{
      color: #333;
      height: 50px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      span{
        flex: 1;
        &.title {
          text-align: center;
        }
        &.add {
          text-align: right;
          font-size: 12px;
          color: #666;
          cursor: pointer;
        }
      }
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
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
          .el-image {
            width: 40px;
            height: 40px;
            img {
              width: 40px;
              height: 40px;
            }
          }
        .middle{
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          box-sizing: border-box;
        .name {
          width: 200px;
          color: #1b1b1b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .company {
          width: 200px;
          font-size: 12px;
          color: #165af8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        }
      }
      .right {
        .el-button {
          background-color: #165af8;
        }
      }
    }
  }
}
</style>
