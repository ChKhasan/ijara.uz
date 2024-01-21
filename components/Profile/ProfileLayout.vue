<script setup>
const router = useRouter();
onMounted(() => {
  if (!localStorage.getItem("accessToken")) router.push("/");
});
</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
