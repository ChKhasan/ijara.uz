<script setup>
import { useLikes } from "@/store/like";
import likeApi from "@/api/likeApi";

const likesConfig = useLikes();
const loading = ref(true);
const loadList = ref([1, 2, 3, 4, 5, 6]);
const likes = ref([]);
async function __GET_LIKE() {
  try {
    const data = await likeApi.getLike();
    const userLikes = data?.data.map((item) => item.announcement?.id);
    likes.value = data?.data;
    likesConfig.handleUserLikes(userLikes);
    localStorage.removeItem("likes");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
async function POST_GET_LIKES() {
  try {
    let localLikes = JSON.parse(localStorage.getItem("likes"));
    if (localLikes && localLikes.length > 0) {
      await Promise.all(localLikes.map((item) => __POST_LIKE({ announcement: item })));
    }
    __GET_LIKE();
  } catch (e) {
    console.log(e);
  }
}
onMounted(() => {
  const AUTH_TOKEN = localStorage.getItem("accessToken");
  Boolean(AUTH_TOKEN) ? POST_GET_LIKES() : likesConfig.reloadLikes();
});
</script>
<template>
  <div class="likes py-[60px]">
    <div class="2xl:container mx-auto px-4">
      <h1 class="font-600 text-[60px] flex items-center gap-[24px]">Saqlanganlar</h1>
      <div class="grid grid-cols-3 gap-[30px]" v-if="loading">
        <el-skeleton
          v-for="loadCard in loadList"
          :key="loadCard"
          :rows="0"
          width="100%"
        />
      </div>
      <div class="list mt-[30px] grid grid-cols-3 gap-[30px]" v-if="!loading">
        <HomeTheCard
          v-for="announcement in likes"
          :key="announcement?.announcement.id"
          :announcement="announcement?.announcement"
        />
      </div>
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
