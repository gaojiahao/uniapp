<template>
  <div class="home">
    <h1>{{ id }}</h1>
    <el-button type="primary" @click="addId">加加</el-button>
    <el-button type="success" @click="myProvide">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <div style="display: flex; flex-wrap: wrap;">
      <div
        style="margin: 10px;"
        class="block"
        v-for="item in productList"
        :key="item.productNumber"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.img"
          lazy
          fit="contain"
        >
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance, ref, toRef, inject } from "vue";
import { _POST, getToken, getProduct } from "@/request/api";
import { useStore } from "vuex";
export default {
  name: "Home",
  props: {
    title: String,
    id: Number
  },
  setup(props, { emit }) {
    const title = toRef(props, "title");
    const id = toRef(props, "id");
    console.log(title.value, id.value);
    const _that = getCurrentInstance().appContext.config.globalProperties;
    const store = useStore();
    const productList = ref([]);
    console.log(store);
    async function getTokenFunc() {
      const res = await _POST(getToken, {
        companyNum: "LittleBearWeb",
        platForm: "PC"
      });
      const { code, item, msg } = res.result;
      console.log(item);
      if (code === 200) _that.$message.success(msg);
    }
    async function getProductListFunc() {
      const res = await _POST(getProduct, {
        maxResultCount: 10,
        skipCount: 1
      });
      const { code, item, msg } = res.result;
      if (code === 200) {
        _that.$message.success(msg, item);
        productList.value = item.items;
      }
    }
    function addId() {
      emit("changeId");
    }
    const onRefresh = inject("reload");
    function myProvide() {
      onRefresh();
    }
    onMounted(() => {
      getTokenFunc();
      getProductListFunc();
    });
    return {
      productList,
      addId,
      myProvide
    };
  }
};
</script>
