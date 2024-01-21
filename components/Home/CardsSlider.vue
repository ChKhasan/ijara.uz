<script setup>
const props = defineProps(["announcements", "loading"]);
const loadList = ref([1, 2, 3, 4, 5, 6]);
</script>
<template>
  <div class="2xl:container mx-auto px-4">
    <ClientOnly>
      <div class="grid grid-cols-3 gap-[30px]" v-if="loading">
        <el-skeleton
          v-for="loadCard in loadList"
          :key="loadCard"
          :rows="0"
          width="100%"
        />
      </div>
    </ClientOnly>
    <div class="grid grid-cols-3 gap-[30px]" v-if="!loading">
      <HomeTheCard
        v-for="announcement in props.announcements"
        :key="announcement.id"
        :announcement="announcement"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.el-skeleton__p.is-first) {
  width: 100%;
  border-radius: 18px;
  height: 490px;
}
</style>
