<template>
  <!-- 添加好友验证 -->
  <div class="wrapBox">
    <div class="topLayoutTwo">
      <span class="item"></span>
      <span class="item">好友验证</span>
      <span class="item itemBtn">
        <el-button type="primary" size="mini" round>发送</el-button>
      </span>
    </div>
    <div class="line">发送好友请求</div>
    <el-input
      class="roleConText"
      type="textarea"
      :rows="4"
      placeholder="请输入验证信息"
      v-model="roleConText"
    >
    </el-input>
    <div class="line">备注名</div>
    <el-input
      class="cateFriends"
      v-model="selectCateFriends"
      clearable
      placeholder="请输入备注"
    ></el-input>
    <el-dialog
      title="好友验证"
      :visible.sync="showdialogVerification"
      width="40%"
    >
      <div class="addFriendsDialog">
        <div class="line">发送好友请求</div>
        <el-input
          class="roleConText"
          type="textarea"
          :rows="4"
          placeholder="请输入验证信息"
          v-model="roleConText"
        >
        </el-input>
        <div class="line">备注名</div>
        <el-input
          class="cateFriends"
          v-model="selectCateFriends"
          clearable
          placeholder="请输入备注"
        ></el-input>
        <center style="margin-top: 100px">
          <el-button @click="showdialogVerification = false">取 消</el-button>
          <el-button type="primary" @click="showdialogVerification = false"
            >发 送</el-button
          >
        </center>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleConText: null,
      selectCateFriends: null,
      showdialogVerification: false
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped lang='less'>
@deep: ~">>>";
// 好友验证
.wrapBox{
  background-color: #f6f6f6;
  .topLayoutTwo{
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    padding: 0 10px;
    .item{
      flex: 1;
      text-align: center;
      &.itemBtn{
        text-align: right;
        .el-button{
          background-color: #165af7;
        }
      }
    }
  }
  .line{
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 14px;
    color: #999;
  }
  @{deep} .roleConText{
    font-size: 16px;
    .el-textarea__inner{
      border: none;
      outline: none;
      padding: 5px 10px;
    }
  }
  @{deep} .cateFriends{
    width: 100%;
    font-size: 16px;
    input{
      border: none;
      outline: none;
    }
  }
  .addFriendsDialog{
    width: 100%;
    max-height: 400px;
  }
}
</style>
