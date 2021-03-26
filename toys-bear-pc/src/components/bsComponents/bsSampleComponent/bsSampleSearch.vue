<template>
  <div class="bsSampleSearch">
    <div class="searchBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="left">
          <el-form-item label="报价客户：">
            <el-select
              style="width: 190px; margin: 0 15px;"
              v-model="formInline.region"
              placeholder="请输入/选择客户"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style=" margin: 0 15px;">
            <el-button class="el-icon-plus" type="primary" @click="onSubmit">
              新增客户</el-button
            >
          </el-form-item>
          <el-form-item label="报价备注：">
            <el-input
              style="width: 586px; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="默认公式：">
            <el-select
              style="width: 120px; margin: 0 15px;"
              v-model="formInline.region"
              placeholder="请输入"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利润率：">
            <el-input
              style="width: 120px; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="汇率：">
            <el-input
              style="width: 120px; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="币种：">
            <el-input
              style="width: 120px; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="每车尺寸：">
            <el-input
              style="width: 148px;; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>

          <el-form-item label="报价方式：">
            <el-select
              style="width: 120px; margin: 0 15px;"
              v-model="formInline.region"
              placeholder="请输入/选择客户"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总费用：">
            <el-input
              style="width: 120px;; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="小数位数">
            <el-input
              style="width: 120px;; margin: 0 15px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="取舍尺寸：">
            <el-select
              style="width: 350px; margin: 0 15px;"
              v-model="formInline.region"
              placeholder="请输入/选择客户"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="价格小于：">
            <el-input
              style="width: 120px;"
              v-model="formInline.user"
              placeholder=" "
            ></el-input>
          </el-form-item>
          <el-form-item label="小数位数：">
            <el-select
              style="width: 120px;"
              v-model="formInline.region"
              placeholder="请输入/选择客户"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "bsSampleSearch",
  props: {
    searchFormAata: {
      type: Object
    }
  },
  data() {
    return {
      formInline: {}
    };
  },
  mounted() {
    this.formInline = this.searchFormAata;
    // console.log(this.searchFormAata)
    console.log(this.formInline, "formInline");
  },
  methods: {
    onSubmit() {}
  }
};
</script>
<style scoped lang="less">
.bsSampleSearch {
  background-color: #fff;
  .title {
    height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &::before {
      width: 4px;
      height: 14px;
      background-color: #3368a9;
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      transform: translate(0, -50%);
    }
  }
  .searchBox {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    form {
      display: flex;
      justify-content: space-between;
      .left {
        flex: 1;
      }
      .right {
        padding-top: 10px;
        margin-right: 20px;
        width: 280px;
        height: 158px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
