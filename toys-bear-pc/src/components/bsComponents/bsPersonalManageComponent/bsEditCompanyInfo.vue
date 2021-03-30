<template>
  <div>
    <el-form
      status-icon
      :show-message="false"
      ref="ClientForm"
      label-width="100px"
      :model="editClientForm"
      :rules="addRules"
      class="clientDialogForm"
    >
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="editClientForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="简称" prop="companyNickName">
        <el-input v-model="editClientForm.companyNickName"></el-input>
      </el-form-item>
      <div class="threeBox">
        <el-form-item label="公司logo" prop="companyLogo">
          <el-upload
            :class="{ hide: hide1Upload }"
            :action="baseAPI + '/api/File/InsertPic'"
            list-type="picture-card"
            ref="upload"
            :auto-upload="false"
            :on-change="changeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveImg"
            :http-request="successUpload"
            :file-list="editImages"
            accept=".jpg,.jpeg,.png,.ico,.bmp,.JPG,.JPEG,.PNG,.ICO,.BMP"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogUpload"
            destroy-on-close
            :modal="false"
          >
            <img width="100%" :src="companyLogoUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="公司背景" prop="bgImg">
          <el-upload
            :class="{ hide: hide2Upload }"
            :action="baseAPI + '/api/File/InsertPic'"
            list-type="picture-card"
            ref="upload2"
            :auto-upload="false"
            :on-change="changeUpload2"
            :on-preview="handlePictureCardPreview2"
            :on-remove="handleRemoveImg2"
            :http-request="successUpload2"
            :file-list="editImages2"
            accept=".jpg,.jpeg,.png,.ico,.bmp,.JPG,.JPEG,.PNG,.ICO,.BMP"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogUpload2"
            destroy-on-close
            :modal="false"
          >
            <img width="100%" :src="companyLogoUrl2" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="营业执照" prop="bgImg">
          <el-upload
            :class="{ hide: hide2Upload }"
            :action="baseAPI + '/api/File/InsertPic'"
            list-type="picture-card"
            ref="upload2"
            :auto-upload="false"
            :on-change="changeUpload2"
            :on-preview="handlePictureCardPreview2"
            :on-remove="handleRemoveImg2"
            :http-request="successUpload2"
            :file-list="editImages2"
            accept=".jpg,.jpeg,.png,.ico,.bmp,.JPG,.JPEG,.PNG,.ICO,.BMP"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog
            :visible.sync="dialogUpload2"
            destroy-on-close
            :modal="false"
          >
            <img width="100%" :src="companyLogoUrl2" alt />
          </el-dialog>
        </el-form-item>
      </div>
      <el-form-item>
        <div class="myMap">
          <BMapComponent
            @clickMap="clickMap"
            @attrItems="attrItems"
            ref="mapBaiduMap"
            :isMapClick="dialogTitle"
            :address="editClientForm.address"
          ></BMapComponent>
        </div>
      </el-form-item>
      <el-form-item label="联系地址" class="attrsForItem" prop="address">
        <el-input
          id="suggestId"
          name="address_detail"
          v-model="editClientForm.address"
          @keyup.enter.native="selectMapAttrs($event, false)"
        ></el-input>
        <div class="housingList" v-show="isShowAttrsList && attrsList.length">
          <div
            v-for="(item, index) in attrsList"
            :key="index"
            @click="
              selectMapAttrs(
                $event,
                item.city + item.district + item.street + item.business
              )
            "
          >
            {{ item.city + item.district + item.street + item.business }}
          </div>
        </div>
      </el-form-item>
      <div class="threeBox">
        <el-form-item label="手机" prop="phoneNumber">
          <el-input v-model.trim="editClientForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactsMan">
          <el-input v-model="editClientForm.contactsMan"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="e_mail">
          <el-input v-model="editClientForm.e_mail"></el-input>
        </el-form-item>
      </div>
      <div class="threeBox">
        <el-form-item label="联系电话" prop="telephoneNumber">
          <el-input v-model="editClientForm.telephoneNumber"></el-input>
        </el-form-item>

        <el-form-item label="传真号码" prop="fax">
          <el-input v-model="editClientForm.fax"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="editClientForm.qq"></el-input>
        </el-form-item>
      </div>
      <div class="threeBox">
        <el-form-item label="msn" prop="msn">
          <el-input v-model="editClientForm.msn"></el-input>
        </el-form-item>
        <el-form-item label="skype" prop="skype">
          <el-input v-model="editClientForm.skype"></el-input>
        </el-form-item>
        <el-form-item label="公司KeyCode" prop="companyKeyCode">
          <el-input
            type="text"
            v-model="editClientForm.companyKeyCode"
          ></el-input>
        </el-form-item>
        <!-- :disabled="dialogTitle !== '新增客户'" -->
      </div>
      <el-form-item label="公司API" prop="api">
        <el-input type="text" v-model="editClientForm.companyAPI"></el-input>
      </el-form-item>
      <!-- :disabled="dialogTitle !== '新增客户'" -->
      <el-form-item label="公司介绍" prop="homepage">
        <el-input
          type="textarea"
          v-model="editClientForm.homepage"
          :maxlength="
            $store.state.globalJson.Json.CompanyRestrictions[1].itemCode
          "
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="editClientForm.remark"
          :maxlength="$store.state.globalJson.Json.UserRestrictions[0].itemCode"
        ></el-input>
        <p class="textareaLength">
          最多可输入
          <span>{{
            $store.state.globalJson.Json.UserRestrictions[0].itemCode
          }}</span
          >字，当前输入
          <span>{{
            editClientForm.remark && editClientForm.remark.length
          }}</span
          >，还可输入
          <span>{{
            $store.state.globalJson.Json.UserRestrictions[0].itemCode -
              (editClientForm.remark && editClientForm.remark.length)
          }}</span>
        </p>
      </el-form-item>
      <center>
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button @click="close">取消</el-button>
      </center>
    </el-form>
  </div>
</template>

<script>
import BMapComponent from "@/components/commonComponent/attrsMap/attrsMap.vue";
export default {
  props: ["editClientForm"],
  components: {
    BMapComponent
  },
  data() {
    return {
      addRules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 99, message: "请输入 1-99 个字符", trigger: "blur" }
        ],
        companyType: [
          { required: true, message: "请选择公司类型", trigger: "change" }
        ],
        companyLogo: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                this.$message.error("请选择公司logo");
                cb(new Error("请选择公司logo"));
              }
            }
          }
        ],
        address: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
          { min: 1, max: 100, message: "请输入 1-100 个字符", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系手机", trigger: "blur" },
          {
            validator: (rule, value, cb) => {
              if (/^\s*\d{11}\s*$/.test(value)) {
                cb();
              } else {
                cb(new Error("手机号格式错误"));
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    submint() {
      console.log(123);
      this.$emit("submit", this.editClientForm);
    },
    close() {
      this.$emit("close");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.myMap {
  height: 150px;
}
.threeBox {
  display: flex;
  justify-content: space-between;
  .el-upload {
    width: 100px;
    height: 100px;
  }
}
</style>
