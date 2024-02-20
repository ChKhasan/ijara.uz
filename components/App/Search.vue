<script setup>
const emit = defineEmits(["getData"]);
const props = defineProps(["transports"]);
const router = useRouter();
const route = useRoute();
const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const value = ref([]);
const text = ref("");
const list = ref([]);
const loading = ref(false);
const optionsTransport = ref([]);
onMounted(() => {
  if (props.transports?.length > 0)
    list.value = props.transports.map((item) => {
      return item;
    });
});
const remoteMethod = (query) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      optionsTransport.value = list.value.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
    console.log(optionsTransport.value);
  } else {
    optionsTransport.value = [];
  }
};
async function filterSend() {
  let query = { ...route.query };

  query.transports = value.value;

  await router.replace({
    path: "/announcements",
    query: { ...query },
  });
  emit("getData");
}
</script>
<template>
  <div
    class="shadow rounded-[12px] bg-white px-[30px] py-[30px] border-[1px] border-[color:var(--input-stroke)] border-solid"
  >
    <div>
      <h5 class="font-600 text-[24px] flex gap-[5px]">
        Qayerga
        <span class="flex items-center text-[color:var(--green)]">ketmoqdasiz?</span>
      </h5>
    </div>
    <div
      class="shadow rounded-[8px] border-[1px] border-[color:var(--input-stroke)] border-solid mt-[18px]"
    >
      <div
        class="px-[18px] py-[18px] border-[0] border-b border-[color:var(--input-stroke)] border-solid"
      >
        <p
          class="font-400 flex items-center gap-[8px] text-[color:var(--gray-5)] text-[14px] mb-[12px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.4375 7.5C5.4375 5.53249 7.03249 3.9375 9.00001 3.9375C10.9675 3.9375 12.5625 5.53249 12.5625 7.5C12.5625 9.46755 10.9675 11.0625 9.00001 11.0625C7.03249 11.0625 5.4375 9.46755 5.4375 7.5ZM9.00001 5.0625C7.65383 5.0625 6.5625 6.1538 6.5625 7.5C6.5625 8.84618 7.65383 9.9375 9.00001 9.9375C10.3462 9.9375 11.4375 8.84618 11.4375 7.5C11.4375 6.1538 10.3462 5.0625 9.00001 5.0625Z"
              fill="#AEAEB2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.64378 6.64264C2.90953 3.41868 5.60364 0.9375 8.83851 0.9375H9.16251C12.3974 0.9375 15.0915 3.41868 15.3572 6.64264C15.5 8.3745 14.965 10.0942 13.865 11.4394L10.2703 15.8358C9.61401 16.6384 8.38701 16.6384 7.73076 15.8358L4.13598 11.4394C3.03598 10.0942 2.50102 8.3745 2.64378 6.64264ZM8.83851 2.0625C6.18913 2.0625 3.98262 4.09461 3.76498 6.73506C3.64616 8.17642 4.0914 9.60765 5.00689 10.7273L8.60166 15.1237C8.80783 15.3757 9.19318 15.3757 9.39936 15.1237L12.9941 10.7273C13.9096 9.60765 14.3548 8.17642 14.236 6.73506C14.0184 4.09461 11.8119 2.0625 9.16251 2.0625H8.83851Z"
              fill="#AEAEB2"
            /></svg
          >Qayerga ketmoqdasiz?
        </p>
        <el-cascader
          class="color-black"
          v-model:value="value"
          :options="options"
          @change="onChange"
          ><span class="cursor-pointer">{{ text ? text : `Manzilni kiriting` }}</span>
        </el-cascader>
      </div>
      <div
        class="px-[18px] py-[18px] border-[0] border-b border-[color:var(--input-stroke)] border-solid"
      >
        <p
          class="font-400 flex items-center gap-[8px] text-[color:var(--gray-5)] text-[14px] mb-[12px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.4375 7.5C5.4375 5.53249 7.03249 3.9375 9.00001 3.9375C10.9675 3.9375 12.5625 5.53249 12.5625 7.5C12.5625 9.46755 10.9675 11.0625 9.00001 11.0625C7.03249 11.0625 5.4375 9.46755 5.4375 7.5ZM9.00001 5.0625C7.65383 5.0625 6.5625 6.1538 6.5625 7.5C6.5625 8.84618 7.65383 9.9375 9.00001 9.9375C10.3462 9.9375 11.4375 8.84618 11.4375 7.5C11.4375 6.1538 10.3462 5.0625 9.00001 5.0625Z"
              fill="#AEAEB2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.64378 6.64264C2.90953 3.41868 5.60364 0.9375 8.83851 0.9375H9.16251C12.3974 0.9375 15.0915 3.41868 15.3572 6.64264C15.5 8.3745 14.965 10.0942 13.865 11.4394L10.2703 15.8358C9.61401 16.6384 8.38701 16.6384 7.73076 15.8358L4.13598 11.4394C3.03598 10.0942 2.50102 8.3745 2.64378 6.64264ZM8.83851 2.0625C6.18913 2.0625 3.98262 4.09461 3.76498 6.73506C3.64616 8.17642 4.0914 9.60765 5.00689 10.7273L8.60166 15.1237C8.80783 15.3757 9.19318 15.3757 9.39936 15.1237L12.9941 10.7273C13.9096 9.60765 14.3548 8.17642 14.236 6.73506C14.0184 4.09461 11.8119 2.0625 9.16251 2.0625H8.83851Z"
              fill="#AEAEB2"
            /></svg
          >Qayerga ketmoqdasiz?
        </p>
        <el-cascader
          class="color-black"
          v-model:value="value"
          :options="options"
          @change="onChange"
          ><span class="cursor-pointer">{{ text ? text : `Manzilni kiriting` }}</span>
        </el-cascader>
      </div>
      <div class="px-[18px] py-[18px]">
        <p
          class="font-400 flex items-center gap-[8px] text-[color:var(--gray-5)] text-[14px] mb-[12px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.8125 5.625C5.8125 3.86459 7.23959 2.4375 9 2.4375C10.7604 2.4375 12.1875 3.86459 12.1875 5.625C12.1875 7.38541 10.7604 8.8125 9 8.8125C7.23959 8.8125 5.8125 7.38541 5.8125 5.625ZM9 3.5625C7.8609 3.5625 6.9375 4.48591 6.9375 5.625C6.9375 6.76408 7.8609 7.6875 9 7.6875C10.1391 7.6875 11.0625 6.76408 11.0625 5.625C11.0625 4.48591 10.1391 3.5625 9 3.5625Z"
              fill="#AEAEB2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 11.0625C5.06802 11.0625 4.3125 11.8181 4.3125 12.75V13.6412C4.3125 13.6548 4.32233 13.6664 4.33573 13.6685C7.42479 14.1729 10.5752 14.1729 13.6642 13.6685C13.6777 13.6664 13.6875 13.6548 13.6875 13.6412V12.75C13.6875 11.8181 12.9319 11.0625 12 11.0625H11.7443C11.7246 11.0625 11.705 11.0656 11.6861 11.0717L11.037 11.2838C9.7134 11.7159 8.2866 11.7159 6.96299 11.2838L6.31385 11.0717C6.29507 11.0656 6.27541 11.0625 6.25565 11.0625H6ZM3.1875 12.75C3.1875 11.1967 4.4467 9.9375 6 9.9375H6.25565C6.39402 9.9375 6.53152 9.9594 6.66305 10.0023L7.31219 10.2143C8.40893 10.5724 9.59107 10.5724 10.6878 10.2143L11.3369 10.0023C11.4685 9.9594 11.6059 9.9375 11.7443 9.9375H12C13.5533 9.9375 14.8125 11.1967 14.8125 12.75V13.6412C14.8125 14.2061 14.4031 14.6878 13.8455 14.7788C10.6364 15.3028 7.36357 15.3028 4.15445 14.7788C3.59691 14.6878 3.1875 14.2061 3.1875 13.6412V12.75Z"
              fill="#AEAEB2"
            /></svg
          >Necha kishi?
        </p>
        <!-- <el-cascader
          class="color-black"
          v-model:value="value"
          :options="options"
          @change="onChange"
          ><span class="cursor-pointer">{{ text ? text : `Manzilni kiriting` }}</span>
        </el-cascader> -->
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          :loading="loading"
          style="width: 240px"
        >
          <el-option
            v-for="(item, index) in optionsTransport"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </div>
    <span
      class="text-[color:var(--dark-3)] text-[17px] mt-[24px] flex gap-[12px] items-center"
    >
      <el-checkbox @change="value" />
      Men O’zbekiston fuqarosiman
    </span>
    <button
      @click="filterSend"
      class="mt-[18px] w-full py-[14px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
    >
      Qayta qidirish
    </button>
  </div>
</template>

<style lang="css" scoped>
.shadow {
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.08);
}
</style>
