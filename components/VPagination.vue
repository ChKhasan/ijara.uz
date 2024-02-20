<template lang="html">
  <div>
    <div class="v-pagination">
      <el-pagination
        class="order-pagination"
        v-model:current-page="current"
        @change="pageChange"
        :total="totalPage"
        :page-size.sync="params.pageSize"
        :hideOnSinglePage="true"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>
<script>
import global from "@/mixins/global";
export default {
  props: ["totalPage", "load"],
  mixins: [global],

  mounted() {
    this.getFirstData();
  },
  methods: {
    async pageChange(e) {
      await this.changePagination(e);
      this.$emit("getData");
    },
  },
  watch: {
    "$route.query.page"(val) {
      if (val != this.current) {
        this.current = val;
      }
    },
  },
};
</script>
<style lang="css" scoped>

.order-pagination {
  display: flex;
  gap: 10px;
}
.order-pagination :deep(.el-pager) {
  gap: 10px;
}
.order-pagination :deep(.number),
.order-pagination :deep(.btn-prev),
.order-pagination :deep(.btn-next),
.order-pagination :deep(.el-pagination-jump-prev),
.order-pagination :deep(.el-pagination-jump-next) {
  min-width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  /* border: 1px solid #ebebeb; */
  background: #F2F2F7;
  color: #000000;
}
.order-pagination :deep(.el-pagination-prev) a,
.order-pagination :deep(.el-pagination-next) a {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
}
.order-pagination :deep(.el-pagination-jump-next) .el-pagination-item-container,
.order-pagination :deep(.el-pagination-jump-prev) .el-pagination-item-container {
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
.order-pagination :deep(.el-pagination-jump-next) .el-pagination-item-container span,
.order-pagination :deep(.el-pagination-jump-prev) .el-pagination-item-container span {
  left: auto;
  top: auto;
  bottom: auto;
  right: auto;
}
.order-pagination {
  display: flex;
}
.order-pagination :deep(.el-pagination-item) a {
  color: var(--grey-40, #9a999b);
  font-family: var(--regular);
  font-size: 16px;
  font-weight: 400;
  line-height: 150%; /* 24px */
}
.order-pagination :deep(.is-active) {
  background-color: var(--green);
}
.order-pagination :deep(.is-active)  {
  color: #fff;
}
@media (max-width: 1200px) {
  .order-pagination :deep(.el-pagination-item),
  .order-pagination :deep(.el-pagination-prev),
  .order-pagination :deep(.el-pagination-next),
  .order-pagination :deep(.el-pagination-jump-prev),
  .order-pagination :deep(.el-pagination-jump-next) {
    min-width: 35px;
    height: 35px;
  }
  .order-pagination :deep(.el-pagination-item) a {
    font-size: 14px;
  }
}
</style>
