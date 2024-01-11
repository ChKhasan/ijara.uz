<script setup>
const tab = ref(2);

const linkOptions = [
  {
    title: "Shaxsiy ma'lumotlarim",
    id: 1,
    to: "/profile",
    name: "profile",
  },
  {
    title: "Mening e'lonlarim",
    id: 2,
    to: "/profile/announcements",
    name: "profile-announcements",
  },
];
</script>
<template>
  <div class="profile-tab">
    <div
      class="tab gap-[10px] flex px-[4px] rounded-[12px] items-center border border-[color:#EAEAEA] border-solid py-[4px]"
    >
      <button
        v-for="link in linkOptions"
        :key="link.id"
        class="px-[20px] whitespace-nowrap py-[10px] rounded-[12px] text-[color:var(--dark-1)] text-[16px] font-500 flex items-center gap-[10px]"
        :class="{ active: $route.name == link.name }"
        @click="$router.push(link.to)"
      >
        {{ link.title }}
      </button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.tab .active {
  color: #fff;
  background-color: var(--green);
}
</style>
