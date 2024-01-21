<script setup>
import { useAuthHandle } from "@/store/auth";
import { useLikes } from "@/store/like";
import likeApi from "@/api/likeApi";

const likesConfig = useLikes();
const auth = useAuthHandle();
onMounted(() => {
  const AUTH_TOKEN = localStorage.getItem("accessToken");
  auth.authHandle(Boolean(AUTH_TOKEN));
  Boolean(AUTH_TOKEN) ? POST_GET_LIKES() : likesConfig.reloadLikes();
});
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
async function __POST_LIKE(data) {
  try {
    await likeApi.postLike(data);
  } catch (e) {
    console.log(e);
  }
}
async function __GET_LIKE() {
  try {
    const data = await likeApi.getLike();
    const userLikes = data?.data.map((item) => item.announcement?.id);
    likesConfig.handleUserLikes(userLikes);
    localStorage.removeItem("likes");
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="layout W-100">
    <LayoutTheHeader />
    <slot />
    <LazyLayoutTheFooter />
  </div>
</template>

<style lang="css" scoped></style>
