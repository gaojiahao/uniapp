<template>
  <div class="BsContactWay">
    <div class="title">联系方式 ({{ totalCount }})</div>
    <div class="searchBox">
      <div class="left">
        <div class="item">
          <span class="label">关键字：</span>
          <el-input
            v-focus
            type="text"
            size="medium"
            v-model="searchForm.keyword"
            clearable
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">业务员：</span>
          <el-select
            v-model="searchForm.user"
            size="medium"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-button
            @click="search"
            type="primary"
            icon="el-icon-search"
            size="medium"
          >
            搜索
          </el-button>
        </div>
      </div>
      <el-button
        @click="openAddContact"
        type="primary"
        icon="el-icon-plus"
        size="medium"
      >
        新增
      </el-button>
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="collecTable"
        :header-cell-style="{ backgroundColor: '#f9fafc' }"
      >
        <el-table-column label="序号" type="index" align="center" width="70">
        </el-table-column>
        <el-table-column label="语种" prop="yuyan">
          <template slot-scope="scope">
            {{ scope.row.yuyan }}
          </template>
        </el-table-column>
        <el-table-column label="公司名称" prop="name">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="地址" prop="dizhi" width="300">
          <template slot-scope="scope">
            {{ scope.row.url }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="联系人"></el-table-column>
        <el-table-column prop="title" label="联系电话"></el-table-column>
        <el-table-column prop="title" label="联系手机"></el-table-column>
        <el-table-column prop="title" label="邮箱"></el-table-column>
        <el-table-column prop="title" label="业务员"></el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-button
              style="margin-right: 10px"
              size="mini"
              type="success"
              @click.stop="openEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click.stop="handleDelete(scope.row)"
              slot="reference"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <center style="padding: 20px 0">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          background
          :total="totalCount"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
    </div>

    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="addContactWay" width="40%">
      <el-form
        ref="addMyClientRef"
        label-width="100px"
        :rules="addContactWayRules"
        :model="ContactWayRulesFormData"
      >
        <el-form-item label="语种选择:" prop="yuyan">
          <el-select
            v-model="ContactWayRulesFormData.yuyan"
            size="medium"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称:" prop="name">
          <el-input
            v-model="ContactWayRulesFormData.studio"
            placeholder="请输入公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系地址:" prop="dizhi">
          <el-input
            v-model="ContactWayRulesFormData.dizhi"
            placeholder="请输入联系地址"
          ></el-input>
        </el-form-item>

        <div class="dialogContact">
          <div class="left">
            <el-form-item label="联系人:">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入联系人"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入联系电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="传真号码:">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入传真号码:"
              ></el-input>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="手机:" prop="tel">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入手机"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="QQ:">
              <el-input
                v-model="ContactWayRulesFormData.phoneNumber"
                placeholder="请输入QQ"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <center>
          <template>
            <el-button type="primary">提 交</el-button>
            <el-button plain @click="addContactWay = false">取 消</el-button>
          </template>
        </center>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BsContactWay",
  data() {
    return {
      List: [],
      searchForm: {
        keyword: null,
        user: null
      },
      addContactWay: false,
      ContactWayRulesFormData: {},
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      addContactWayRules: {
        yuyan: [{ required: true, message: "请选择语种", trigger: "blur" }],
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        dizhi: [
          { required: true, message: "请输入联系地址", trigger: "change" }
        ],
        tel: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 查询
    search() {},
    // 编辑
    openEdit(row) {
      console.log(row);
    },
    // 删除
    handleDelete(row) {
      console.log(row);
    },
    // 打开新增弹框
    openAddContact() {
      this.addContactWay = true;
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (
        this.currentPage * pageSize > this.totalCount &&
        this.currentPage != 1
      )
        return false;
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.BsContactWay {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
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
    height: 76px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        max-width: 258px;
        margin-right: 20px;
        .label {
          width: 58px;
          min-width: 58px;
        }
      }
    }
  }
  .dialogContact {
    display: flex;
    .left,
    .right {
      flex: 1;
    }
  }
}
</style>
