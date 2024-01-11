<script setup>
const props = defineProps(["announcements"]);
</script>
<template>
  <div class="2xl:container mx-auto  px-4 ">
    <div class="grid grid-cols-3 gap-[30px]">
      <HomeTheCard
        v-for="announcement in props.announcements"
        :key="announcement.id"
        :announcement="announcement"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
