<template>
  <div class="bsToyCircle">
    <div class="topLauot">
      <div class="topLeft">
        <div class="tagItem">
          <i class="icon home"></i>
          <span>玩具圈首页</span>
        </div>
        <div class="tagItem">
          <i class="icon ordinary"></i>
          <span>普通公告</span>
        </div>
        <div class="tagItem">
          <i class="icon procurement"></i>
          <span>采购公告</span>
        </div>
        <div class="tagItem">
          <i class="icon supply"></i>
          <span>供应公告</span>
        </div>
      </div>
      <div class="topRight">
        <el-button type="primary" size="medium">
          <i class="iconfont icon-promotionrp"></i>
          我要发布
        </el-button>
      </div>
    </div>
    <div class="noticeContent">
      <waterfall :col="col" :data="findList" height="100%" @loadmore="loadmore">
        <template>
          <div
            class="cell-item-box"
            v-for="(item, index) in findList"
            :key="index"
          >
            <div class="cell-item">
              <div class="item-top">
                <div class="itemTopLeft">
                  <el-avatar
                    style="background-color:#E4EFFF;"
                    :size="50"
                    :src="item.userInfo.companyLogo"
                  >
                    <p class="errText">
                      {{ item.userInfo.companyName }}
                    </p>
                  </el-avatar>
                </div>
                <div class="itemTopRight"></div>
              </div>
              <div class="item-body">
                <div class="item-desc">{{ item.title }}</div>
                <div class="item-footer">
                  <div class="footer-left">
                    <img :src="item.videoImg" alt="" srcset="" />
                    <div class="name">{{ item.bearNotice.notice }}</div>
                  </div>
                  <div class="like">
                    <img :src="item.videoImg" alt="" />
                    <div class="like-total">{{ item.bearNotice.notice }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>
  </div>
</template>

<script>
export default {
  name: "bsToyCircle",
  data() {
    return {
      findList: [],
      col: 3
    };
  },
  methods: {
    // 到底了
    loadmore() {
      console.log("到底了");
    },
    // 获取公告列表
    async getDataList(flag) {
      const res = await this.$http.post("/api/BearNoticePage", {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize
      });
      if (res.data.result.code === 200) {
        this.$emit("getNoticeUnreadTotal");
        if (flag) {
          this.findList = this.findList.concat(
            res.data.result.item.result.items
          );
        } else {
          this.findList = res.data.result.item.result.items;
          console.log(this.findList);
          this.loading = false;
        }
        this.total = res.data.result.item.result.totalCount;
      } else {
        this.$message.error(res.data.result.msg);
      }
    }
  },
  created() {},
  mounted() {
    this.getDataList();
  },
  computed: {
    itemWidth() {
      return 138 * 0.5 * (document.documentElement.clientWidth / 375); // #rem布局 计算宽度
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 375); // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    }
  }
};
</script>
<style scoped lang="less">
.bsToyCircle {
  width: 100%;
  min-height: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .topLauot {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    .topLeft {
      flex: 1;
      display: flex;
      align-items: center;
      .tagItem {
        width: 160px;
        height: 50px;
        opacity: 1;
        background: #ffffff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          border-radius: 6px;
          margin-top: -5px;
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
        }
        .icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 16px;
        }
        .home {
          background: url("~@/assets/images/noticeHomeIcon.png") no-repeat
            center;
        }
        .ordinary {
          background: url("~@/assets/images/ordinaryNoticeIcon.png") no-repeat
            center;
        }
        .procurement {
          background: url("~@/assets/images/procurementNoticeIcon.png")
            no-repeat center;
        }
        .supply {
          background: url("~@/assets/images/supplyNoticeIcon.png") no-repeat
            center;
        }
        .icon {
          background-size: contain;
        }
      }
    }
  }
  .noticeContent {
    height: calc(100% - 85px);
    position: relative;
    overflow: hidden;
    padding-right: 20px;
    padding-bottom: 20px;
    border-radius: 4px;
    .vue-waterfall {
      &::-webkit-scrollbar {
        // 谷歌隐藏滚动条
        display: none;
      }
      -ms-overflow-style: none; // ie10隐藏滚动条
      overflow: -moz-scrollbars-none; // Firefox隐藏滚动条
    }
    .item-body {
      .item-desc {
        text-align: left;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
      }
      .item-footer {
        display: flex;
        justify-content: space-between;
        .footer-left {
          display: flex;
          align-items: center;
          font-family: SF Pro Display;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.6);
          img {
            border-radius: 50%;
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
        }
        .like {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: SF Pro Display;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.4);
          img {
            margin-right: 4px;
          }
        }
      }
    }
    .cell-item-box {
      width: 100%;
      padding-left: 20px;
      padding-top: 20px;
      border-radius: 6px;
      overflow: hidden;
      box-sizing: border-box;
    }
    .cell-item {
      background: #ffffff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 20px;
      .item-top {
        height: 60px;
        display: flex;
        margin-bottom: 10px;
        .itemTopLeft,
        .itemTopRight {
          flex: 1;
          height: 100%;
        }
        .itemTopRight {
          
        }
      }
    }
  }
}
</style>
