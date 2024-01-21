<script setup>
const tab = ref(1);
const emit = defineEmits(["filter", "clearFilter"]);
const props = defineProps(["loading"]);

const route = useRoute();
const router = useRouter();
const filterForm = ref({
  conditioner: false,
  partnership: false,
  washing_machine: false,
  need_people_count: 1,
  total_price__gte: 0,
  total_price__lte: 4000000,
  room_count: 1,
});
const sliderValue = ref([0, 4000000]);
const tabOptions = [
  {
    name: "Ixtiyoriy sozlash",
    id: 1,
  },
  {
    name: "Oila uchun",
    id: 2,
  },
  {
    name: "Komandirovka",
    id: 3,
  },
];
onMounted(() => {
  Object.entries(route.query).forEach(([name, value]) => {
    filterForm.value[name] = value != "false" && value != "true" ? value : Boolean(value);
  });
  sliderValue.value[0] = filterForm.value.total_price__gte;
  sliderValue.value[1] = filterForm.value.total_price__lte;
});
function filterChange(e, name) {
  // emit("filter", { value: e, name: name });
}
function filterSend() {
  filterForm.value.total_price__gte = sliderValue.value[0];
  filterForm.value.total_price__lte = sliderValue.value[1];
  emit("filter", filterForm.value);
}
function clearFilter() {
  emit("clearFilter");
  filterForm.value = {
    conditioner: false,
    partnership: false,
    washing_machine: false,
    need_people_count: 1,
    total_price__gte: 0,
    total_price__lte: 4000000,
    room_count: 1,
  };
  sliderValue.value = [0, 4000000];
}
</script>
<template>
  <div
    class="filter rounded-[12px] flex flex-col gap-[24px] bg-white px-[30px] py-[30px] border-[1px] border-[color:var(--input-stroke)] border-solid"
  >
    <h5 class="font-600 text-[24px]">Filter</h5>
    <div class="tab flex justify-between">
      <button
        class="font-500 text-[16px] text-[color:var(--gray-5)]"
        v-for="option in tabOptions"
        :key="option.id"
        :class="{ active: tab == option.id }"
        @click="tab = option.id"
      >
        {{ option.name }}
      </button>
    </div>
    <div class="flex flex-col gap-[18px]">
      <div class="price-filter">
        <div class="grid grid-cols-2 gap-3">
          <el-input
            class="border-[2px] border-solid rounded-lg border-[var(--input-stroke)] h-[45px]"
            v-model="sliderValue[0]"
          />
          <el-input
            class="border-[2px] border-solid rounded-lg border-[var(--input-stroke)] h-[45px]"
            v-model="sliderValue[1]"
          />
        </div>
        <div class="range">
          <el-slider v-model="sliderValue" range :step="1000" :max="4000000" />
        </div>
      </div>
      <div
        class="border-b-[15px] border-[0] border-[color:var(--gray-1)] border-solid flex flex-col"
      >
        <div
          class="card border-b border-[0] border-[color:#E9EDEE] border-solid pb-[12px] flex justify-between items-center"
        >
          <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
            Sheriklikga
          </p>
          <el-checkbox
            @change="($event) => filterChange($event, 'partnership')"
            v-model="filterForm.partnership"
          />
        </div>
        <div
          class="max-h-0 overflow-hidden count-block"
          :class="{ 'showBlock ': filterForm.partnership }"
        >
          <div class="flex justify-between items-center mt-[12px] pb-[12px]">
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              Sheriklar soni
            </p>
            <el-input-number v-model="filterForm.need_people_count" :min="1" :max="10" />
          </div>
        </div>
        <div></div>
      </div>
      <div class="border-b-[15px] border-[0] border-[color:var(--gray-1)] border-solid">
        <h6 class="font-600 text-[16px] mb-[18px]">Qo'shimchalar</h6>
        <div class="flex flex-col gap-[12px]">
          <div
            class="card pb-[12px] border-b border-[0] border-[color:#E9EDEE] border-solid flex justify-between items-center"
          >
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              <svg
                xmlns="http://www.w3.org/40000000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                height="18px"
                width="18px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 496 496"
                xml:space="preserve"
              >
                <path
                  style="fill: #b3dce0"
                  d="M496,309.6c0,27.2-6.4,48.8-32.8,48.8H32.8C5.6,358.4,0,336.8,0,309.6V186.4  c0-27.2,21.6-48.8,48.8-48.8h398.4c27.2,0,48.8,21.6,48.8,48.8L496,309.6L496,309.6z"
                />
                <g>
                  <path
                    style="fill: #c1e3e5"
                    d="M0,186.4c0-27.2,21.6-48.8,48.8-48.8h398.4c27.2,0,48.8,21.6,48.8,48.8"
                  />
                </g>
                <path
                  style="fill: #9ecacc"
                  d="M464.8,308.8c0,5.6-4,9.6-9.6,9.6H40.8c-5.6,0-9.6-4-9.6-9.6l0,0c0-5.6,4-9.6,9.6-9.6h414.4  C460.8,299.2,464.8,303.2,464.8,308.8L464.8,308.8z"
                />
                <path
                  style="fill: #7eaaaa"
                  d="M31.2,308.8L31.2,308.8c0-5.6,4-9.6,9.6-9.6h414.4c5.6,0,9.6,4,9.6,9.6l0,0"
                />
                <path
                  style="fill: #9ecacc"
                  d="M464.8,336c0,5.6-4,9.6-9.6,9.6H40.8c-5.6,0-9.6-4-9.6-9.6l0,0c0-5.6,4-9.6,9.6-9.6h414.4  C460.8,326.4,464.8,330.4,464.8,336L464.8,336z"
                />
                <path
                  style="fill: #7eaaaa"
                  d="M31.2,336L31.2,336c0-5.6,4-9.6,9.6-9.6h414.4c5.6,0,9.6,4,9.6,9.6l0,0"
                />
                <path
                  style="fill: #46bc5c"
                  d="M145.6,267.2c0,2.4-2.4,4.8-4.8,4.8H39.2c-2.4,0-4.8-2.4-4.8-4.8v-33.6c0-2.4,2.4-4.8,4.8-4.8h102.4  c2.4,0,4.8,2.4,4.8,4.8v33.6H145.6z"
                />
                <path
                  style="fill: #2fa53f"
                  d="M140.8,229.6c2.4,0,4.8,2.4,4.8,4.8V268c0,2.4-2.4,4.8-4.8,4.8H39.2c-2.4,0-4.8-2.4-4.8-4.8"
                /></svg
              >Konditsioner
            </p>
            <el-checkbox
              @change="($event) => filterChange($event, 'conditioner')"
              v-model="filterForm.conditioner"
            />
          </div>
          <div
            class="card pb-[12px] border-b border-[0] border-[color:#E9EDEE] border-solid flex justify-between items-center"
          >
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              Kir yuvish mashinasi
            </p>
            <el-checkbox
              @change="($event) => filterChange($event, 'washing_machine')"
              v-model="filterForm.washing_machine"
            />
          </div>
          <div>
            <div class="card pb-[12px] flex justify-between items-center">
              <p
                class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center"
              >
                Xonalar soni
              </p>
              <el-input-number v-model="filterForm.room_count" :min="1" :max="10" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <!-- <div class="border-b-[15px] border-[0] border-[color:var(--gray-1)] border-solid">
        <h6 class="font-600 text-[16px] mb-[18px]">Shaxar markazidan uzoqligi</h6>
        <div class="flex flex-col gap-[12px]">
          <div
            class="card pb-[12px] border-b border-[0] border-[color:#E9EDEE] border-solid flex justify-between items-center"
          >
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              1-3 km
            </p>
            <el-checkbox />
          </div>
          <div
            class="card pb-[12px] border-b border-[0] border-[color:#E9EDEE] border-solid flex justify-between items-center"
          >
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              4-6 km
            </p>
            <el-checkbox />
          </div>
          <div class="card pb-[12px] flex justify-between items-center">
            <p class="flex text-[color:var(--dark-4)] text-[16px] gap-[8px] items-center">
              6 + km
            </p>
            <el-checkbox />
          </div>
        </div>
      </div> -->
      <div class="btns flex justify-between">
        <button class="text-[color:var(--red)] font-500 text-[17px]" @click="clearFilter">
          Tozalash 
        </button>
        <button
          @click="filterSend"
          class="w-100 min-w-[240px] py-[14px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
          :class="{ 'pointer-events-none opacity-50': loading }"
        >
          <span v-if="loading">
            <LoaderBtn />
          </span>
          <span v-if="!loading">Qidirish</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tab .active {
  color: var(--green);
}

.count-block {
  transition: all 0.4s linear;
  /* margin-bottom: 0; */
}
.showBlock {
  max-height: 100px;
  /* margin-top: 12px; */
}
:deep(.el-input-number__increase),
:deep(.el-input-number__decrease) {
  background-color: transparent;
}
</style>
