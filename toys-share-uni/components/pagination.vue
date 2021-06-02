<template>
  <div class="pagination">
    <div class="count">
      共
      <span class="red">{{totalPage}}</span>&nbsp;页
      <span class="red">{{totalElements}}</span>&nbsp;条记录
    </div>&ensp;
    <div
      class="page-button page-first"
      :class="{'page-disabled':currentPage <= 1}"
      @click="jump(1)"
    >首页</div>&ensp;
    <div
      class="page-button page-prev"
      :class="{'page-disabled':currentPage <= 1}"
      @click="prev()"
    >上一页</div>&ensp;
    <div
      class="page-button page-nums"
      v-for="(nPage,index) in pageNumbers"
      :key="index"
      :class="{currentPage:nPage+pageOffset==currentPage}"
      @click="jump(nPage+pageOffset)"
    >{{nPage+pageOffset}}&ensp;</div>
    <div
      class="page-button page-next"
      :class="{'page-disabled':currentPage >= totalPage || totalPage <= 1}"
      @click="next()"
    >下一页</div>&ensp;
    <div
      class="page-button page-last"
      :class="{'page-disabled':currentPage >= totalPage}"
      @click="jump(totalPage)"
    >尾页</div>&ensp;
	<div
	  class="page-qianwang"
	>前往</div>&ensp;
    <input type="number" v-model="newPage" class="pagination_input" @keypress.enter="inputJump()">&ensp;
    <div class="page-button page-jump" @click="inputJump()">页</div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  model: { // 通过v-model传过来的参数
    prop: 'currentPage',
    event: 'change',
  },
  props: {
    totalPage: {
      type: Number,
      default: 1,
    },
    totalElements: {
      type: Number,
      default: 0,
    },
    currentPage: { // 通过v-model传过来的参数
      type: Number,
      default: 1,
    },
    maxButtonTotal: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      newPage: '', // 避免操作props参数
    };
  },
  computed: {
    buttonTotal() {
      return Math.min(this.maxButtonTotal, this.totalPage);
    },
    pageNumbers() {
      return Math.min(this.buttonTotal, this.totalPage);
    },
    pageOffset() {
      // eslint-disable-next-line no-mixed-operators
      return (this.currentPage - Math.ceil(this.currentPage / this.totalPage * this.buttonTotal));
    },
  },
  methods: {
    prev() { // 点击上一页
      if (this.currentPage === 1) {
        return;
      }
      this.$emit('change', this.currentPage - 1);
    },
    next() { // 点击下一页
      if (this.currentPage === this.totalPage) {
        return;
      }
      this.$emit('change', this.currentPage + 1); // 修改当前页码
    },
    jump(id) { // 直接跳转
      if (id > this.totalPage) {
      // eslint-disable-next-line no-param-reassign
        id = this.totalPage;
      }
      this.newPage = '';
      this.$emit('change', id); // 修改当前页码
    },
    // eslint-disable-next-line consistent-return
    inputJump() {
      if (this.newPage === '') { // 判空处理
        return '';
      } if (this.newPage !== this.currentPage && this.newPage > 0
    && this.newPage <= this.totalPage) { // 填写数字才能跳转
        this.jump(this.newPage * 1);
        this.newPage = '';
      } else {
        this.newPage = '';
      }
    },
  },

};
</script>
<style lang="scss" scoped>
.pagination {
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
input[type="number"] {
  width: 4em;
  border: 1px solid #ddd;
}
.count{
    height: 36px;
  line-height: 36px;
}
.red {
  color: #e4393c;
}
.page-button {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  user-select: none;
   padding: 0 14px;
  &:hover {
    text-decoration: underline;
  }
}
.page-nums{
  border:1px solid red;
  color: #333;
  border: 1px solid #E9E9E9;
  background-color: #FFFFFF;
  height: 36px;
  line-height: 36px;
  padding: 0 14px;
  margin-right: 5px;
  font-size: 14px;
}
.currentPage{
  padding: 0 14px;
  margin-right: 5px;
  font-size: 14px;
  color: #ffffff;
  border:0;
  background-color: #36ADE2;
}
.page-disabled {
  color: #999;
  pointer-events: none;
}
.pagination_input{
	width: 34px;
	font-size: 16px;
	line-height: 36px;
	height: 36px;
	overflow: hidden;
	border: 1px solid #E9E9E9;
	border-radius: 4px;
}
.page-qianwang{
	height: 36px;
	line-height: 36px;
	user-select: none;
	padding: 0 14px;
}
</style>