<script setup>
import announcementApi from "@/api/announcementApi";
import { useAuthHandle } from "@/store/auth";

const auth = useAuthHandle();
const announcements = ref([]);
const loading = ref(true);
const totalPage = ref(0);
const route = useRoute();
const errorHandle = (error) => {
  error.response
    ? ElNotification({
        title: "Error",
        message: error.response.statusText,
        type: "error",
      })
    : ElNotification({
        title: "Error",
        message: "Serverda xatolik",
        type: "error",
      });
};
async function __GET_ANNOUNCEMENTS() {
  try {
    loading.value = true;
    const data = await announcementApi.getAnnouncement({
      params: {
        ...route.query,
        page_size: route.query.page_size || 6,
      },
    });
    announcements.value = data?.data?.results;
    totalPage.value = data?.data?.count;
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  const AUTH_TOKEN = localStorage.getItem("accessToken");
  auth.authHandle(Boolean(AUTH_TOKEN));
});
useAsyncData("announcement", async () => {
  return __GET_ANNOUNCEMENTS();
});
</script>
<template>
  <div class="pb-10">
    <HomeBanner />
    <HomeCardsSlider :announcements="announcements" :loading="loading" />
    <div class="flex justify-center mt-6">
      <VPagination
        :load="true"
        class="xl:hidden"
        :totalPage="totalPage"
        @getData="__GET_ANNOUNCEMENTS"
      />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
