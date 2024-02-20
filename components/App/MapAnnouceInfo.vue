<script setup>
const props = defineProps(["announcement"]);
</script>
<template>
  <div
    class="rounded-[12px] w-full flex flex-col gap-[24px] bg-white px-[30px] py-[30px] border-[1px] border-[color:var(--input-stroke)] border-solid"
  >
  <h1 class="font-600 text-[24px]">{{ announcement?.title }}</h1>
    <el-carousel height="300px">
      <el-carousel-item v-for="item in props.announcement.images" :key="item.id">
        <div class="carousel-image">
          <img class="w-full h-full object-contain" :src="item?.image" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="flex justify-between w-full">
      <h4 class="text-[18px] font-600">Qulayliklar</h4>
      <div class="flex gap-4">
        <el-tag type="success">Konditsioner</el-tag>
        <el-tag type="success">Kir yuvish mashinasi</el-tag>
        <el-tag type="success">Konditsioner</el-tag>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.el-carousel__item) .carousel-image {
  height: 300px;
}
</style>
