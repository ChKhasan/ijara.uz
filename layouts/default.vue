<script setup>
import { useAuthHandle } from "@/store/auth";

const auth = useAuthHandle();
onMounted(() => {
  const AUTH_TOKEN = localStorage.getItem("accessToken");
  auth.authHandle(Boolean(AUTH_TOKEN));
});
</script>
<template>
  <div class="layout W-100">
    <LayoutTheHeader />
    <el-config-provider>
      <!-- Your Element Plus components go here -->
      <slot />
    </el-config-provider>
    <LazyLayoutTheFooter />
  </div>
</template>

<style lang="css" scoped></style>
