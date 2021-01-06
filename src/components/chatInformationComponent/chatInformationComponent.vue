<template>
<div class="wrapBox">
  <div class="topLayout">聊天信息 <span v-if="totalCount > 0">{{totalCount}}</span></div>
  <div class="groupMembers">
    <div class="title">群成员</div>
    <ul class="items">
      <li class="item" v-for="(item, i) in 50" :key="i">
        <div class="userImg">
          <el-image
            fit="contain"
            src=""
            lazy
          >
            <div
              slot="placeholder"
              class="image-slot"
              style="width: 50px; height: 50px; margin: 0 auto"
            >
              <img class="errorImg" src="~@/assets/images/imgError.jpg" alt />
            </div>
            <div
              slot="error"
              class="image-slot"
              style="width: 50px; height: 50px; margin: 0 auto"
            >
              <img class="errorImg" src="~@/assets/images/imgError.jpg" alt />
            </div>
          </el-image>
        </div>
        <p class="name">张木伟张木伟张木伟张木伟</p>
      </li>
      <li class="block"></li>
      <li class="block"></li>
      <li class="block"></li>
      <li class="block"></li>
    </ul>
  </div>
  <div class="lookGroupMembers">
    <span class="item">查看全部群成员<i class="el-icon-arrow-right"></i></span>
  </div>
  <div class="lookSee">
    <p class="item"><span>查找聊天记录</span><i class="el-icon-arrow-right"></i></p>
    <p class="item"><span>我在本群的昵称</span><i class="el-icon-arrow-right"></i></p>
  </div>
  <el-popconfirm
    class="deleteBtn"
    title="是否退出群组？"
    @onConfirm="deleteCement">
    <div slot="reference" class="deleteOut">
      <span>删除并退出</span>
    </div>
  </el-popconfirm>
</div>
</template>

<script>
export default {
  props: ['options'],
  data () {
    return {
      totalCount: 0
    }
  },
  methods: {
    deleteCement () {
      console.log('退出了群聊')
    }
    // 获取群成员
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
  height: 825px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
  color: #333;
  background-color: #F5F5F5;
  .topLayout {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .groupMembers{
    padding: 0 10px;
    box-sizing: border-box;
    background-color: #fff;
    .title{
      color: #1b1b1b;
      height: 50px;
      display: flex;
      align-items: center;
    }
    .items{
      width: 100%;
      max-height: 240px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      justify-content: space-between;
      .block{
        width: 60px;
        margin: 5px;
      }
      .item{
        width: 65px;
        height: 80px;
        box-sizing: border-box;
        cursor: pointer;
        .userImg{
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-image{
            width: 50px;
            height: 50px;
            border-radius: 25px;
            img{
              width: 50px;
              height: 50px;
            }
          }
        }
        .name{
          font-size: 14px;
          text-align: center;
          margin-top: 5px;
          overflow: hidden;/*超出部分隐藏*/
          white-space: nowrap;/*不换行*/
          text-overflow:ellipsis;/*超出部分文字以...显示*/
        }
      }
    }
  }
  .lookGroupMembers{
    text-align: center;
    background-color: #fff;
    padding-top: 10px;
    color: #999999;
    padding-bottom: 20px;
    font-size: 14px;
    .item{
      cursor: pointer;
      i {
        margin-left: 5px;
      }
    }
  }
  .lookSee{
    background-color: #fff;
    padding: 0 10px;
    margin: 20px 0;
    .item{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
  }
  .deleteOut{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
    color: #FF2B20;
  }
}
@{deep} .el-popconfirm__action{
  display: flex;
  justify-content: center;
}
</style>
