<script setup>
const tabHandle = ref(1);
</script>
<template>
  <div
    class="info-tab rounded-xl border border-solid border-[var(--input-stroke)] bg-white px-[30px] py-[30px]"
  >
    <div class="flex gap-[30px]">
      <button
        :class="{ 'text-[var(--green)]': tabHandle == 1 }"
        @click="tabHandle == 1"
        class="text-[var(--gray-6)] text-[18px] font-500"
      >
        Ma’lumotlar
      </button>
      <button
        :class="{ 'text-[var(--green)]': tabHandle == 2 }"
        @click="tabHandle == 2"
        class="text-[var(--gray-6)] text-[18px] font-500"
      >
        Xonalari
      </button>
      <button
        :class="{ 'text-[var(--green)]': tabHandle == 3 }"
        @click="tabHandle == 3"
        class="text-[var(--gray-6)] text-[18px] font-500"
      >
        Izohlar (14)
      </button>
    </div>
    <h1 class="text-[18px] font-600 mt-[30px]">Batafsil ma’lumot</h1>
    <div class="mt-[18px]">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s Yana...
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.info-tab {
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.08);
}
</style>
