<script setup>
import announcementApi from "@/api/announcementApi";
const announcements = ref([]);
const loading = ref(true);
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
    const data = await announcementApi.getAnnouncement();
    announcements.value = data?.data;
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
useAsyncData("announcement", async () => {
  return __GET_ANNOUNCEMENTS();
});
</script>
<template>
  <div class="pb-10">
    <HomeBanner />
    <HomeCardsSlider :announcements="announcements" :loading="loading" />
  </div>
</template>

<style lang="css" scoped>


</style>
