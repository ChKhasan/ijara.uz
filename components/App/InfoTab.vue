<script setup>
import commentApi from "../../api/commentApi";
const props = defineProps(["announcement"]);
const route = useRoute();
const tabHandle = ref(1);
const zoom = ref(10);
const coords = ref([0, 0]);
const mapCenter = ref([40.7128, -74.006]);
const visible = ref(false);
const loading = ref(false);
const comments = ref([]);
const formRef = ref();

const formState = reactive({
  comment: "",
  announcement: 0,
});

const rules = {
  comment: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],
};
const busRoute = ref([
  { lat: 40.7128, lng: -74.006 },
  { lat: 40.7185, lng: -74.0024 },
  { lat: 40.7213, lng: -73.9884 },
  { lat: 40.7198, lng: -73.9712 },
  { lat: 40.7128, lng: -73.9662 },
]);
const onSubmit = () => {
  // console.log(announcement);
  // console.log(formState.announcement);
  formState.announcement = props.announcement?.id;
  // const data = {
  //   data: formState,
  //   params: props.announcement?.id,
  // };
  formRef.value.validate().then(async () => __POST_COMMENT(formState));
};
const __GET_COMMENT = async () => {
  try {
    const data = await commentApi.getComment({
      params: {
        announcement_id: route.params.id,
      },
    });
    comments.value = data?.data;
  } catch (e) {
    errorHandle(e);
  }
};
const __POST_COMMENT = async (formData) => {
  try {
    console.log(formData);
    loading.value = true;
    const data = await commentApi.postComment(formData);
    visible.value = false;
    ElNotification({
      title: "Success",
      message: "Izoh muvaffaqiyatli jonatildi",
      type: "success",
    });
    __GET_COMMENT();
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
};
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
onMounted(() => {
  __GET_COMMENT();
});
</script>
<template>
  <div
    class="info-tab rounded-xl border border-solid border-[var(--input-stroke)] bg-white px-[30px] py-[30px]"
  >
    <div class="flex justify-between items-start">
      <div class="flex gap-[30px]">
        <button
          :class="{ 'text-[var(--green)]': tabHandle == 1 }"
          @click="tabHandle = 1"
          class="text-[var(--gray-6)] text-[18px] font-500"
        >
          Ma’lumotlar
        </button>
        <!-- <button
        :class="{ 'text-[var(--green)]': tabHandle == 2 }"
        @click="tabHandle == 2"
        class="text-[var(--gray-6)] text-[18px] font-500"
      >
        Xonalari
      </button> -->
        <button
          :class="{ 'text-[var(--green)]': tabHandle == 3 }"
          @click="tabHandle = 3"
          class="text-[var(--gray-6)] text-[18px] font-500"
        >
          Izohlar ({{ comments.length }})
        </button>
      </div>
      <button
        @click="visible = true"
        v-if="tabHandle == 3"
        class="px-4 py-2 bg-[color:var(--green)] rounded-[8px] text-white font-400 flex justify-center"
      >
        Izoh qoldirish
      </button>
    </div>
    <div v-if="tabHandle == 1" class="mt-[30px]">
      <h1 class="text-[18px] font-600">Batafsil ma’lumot</h1>
      <div class="mt-[18px]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s Lorem
          Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500sLorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s Yana...
        </p>
      </div>
      <h1 class="text-[18px] font-600 mt-[30px]">Manzil haritada</h1>

      <div
        class="map mt-[18px] h-[400px] rounded-xl border border-solid border-[--grey-3] overflow-hidden"
      >
        <LMap ref="map" :zoom="zoom" :center="mapCenter">
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
          />
          <l-marker :lat-lng="coords"><l-popup>Vash marker</l-popup> </l-marker>
          <!-- <l-polyline :lat-lngs="busRoute" :color="'blue'" :weight="5"></l-polyline> -->
        </LMap>
      </div>
    </div>
    <div class="comments mt-[30px] min-h-[300px]" v-if="tabHandle == 3">
      <div class="flex flex-col gap-[18px] h-full" v-if="comments?.length > 0">
        <AppCommentCard
          v-for="comment in comments"
          :key="comment?.id"
          :comment="comment"
        />
      </div>
      <div class="flex justify-center items-center flex-col min-h-[250px]" v-else>
        <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_di_359_17146)">
<rect x="24" y="9" width="88" height="88" rx="44" fill="white"/>
<g filter="url(#filter1_d_359_17146)">
<g filter="url(#filter2_i_359_17146)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M59.7598 37.3192C65.8652 36.8657 71.9974 36.8955 78.0978 37.4082L81.7746 37.7172C84.5518 37.9506 86.8056 40.0277 87.2279 42.7429L87.4598 44.2343C88.2469 49.2951 88.1735 54.4498 87.2422 59.4867C86.7825 61.9722 84.5859 63.7784 82.0225 63.7784H61.6972C61.2296 63.7784 60.7692 63.8924 60.3573 64.1106L51.5021 68.8006C50.9758 69.0793 50.3396 69.065 49.8268 68.7629C49.314 68.4607 49 67.9154 49 67.3265V48.3201C49 42.5659 53.5001 37.7842 59.3223 37.3517L59.7598 37.3192ZM59.7554 48.3586C58.1922 48.3586 56.925 49.6074 56.925 51.1481C56.925 52.6885 58.1922 53.9374 59.7554 53.9374C61.3186 53.9374 62.5858 52.6885 62.5858 51.1481C62.5858 49.6074 61.3186 48.3586 59.7554 48.3586ZM68.8126 48.3586C67.2493 48.3586 65.9822 49.6074 65.9822 51.1481C65.9822 52.6885 67.2493 53.9374 68.8126 53.9374C70.3759 53.9374 71.643 52.6885 71.643 51.1481C71.643 49.6074 70.3759 48.3586 68.8126 48.3586ZM75.0394 51.1481C75.0394 49.6074 76.3065 48.3586 77.8698 48.3586C79.4331 48.3586 80.7002 49.6074 80.7002 51.1481C80.7002 52.6885 79.4331 53.9374 77.8698 53.9374C76.3065 53.9374 75.0394 52.6885 75.0394 51.1481Z" fill="url(#paint0_linear_359_17146)"/>
</g>
</g>
</g>
<defs>
<filter id="filter0_di_359_17146" x="0" y="0" width="136" height="136" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="15"/>
<feGaussianBlur stdDeviation="12"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_359_17146"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_359_17146" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-5"/>
<feGaussianBlur stdDeviation="7"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_359_17146"/>
</filter>
<filter id="filter1_d_359_17146" x="34" y="26.5" width="68" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_359_17146"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_359_17146" result="shape"/>
</filter>
<filter id="filter2_i_359_17146" x="49" y="24.8116" width="39" height="44.1884" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-12.1884"/>
<feGaussianBlur stdDeviation="14"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_17146"/>
</filter>
<linearGradient id="paint0_linear_359_17146" x1="68.5" y1="37" x2="68.5" y2="69" gradientUnits="userSpaceOnUse">
<stop stop-color="#7FDD34"/>
<stop offset="1" stop-color="#00A000"/>
</linearGradient>
</defs>
</svg>
<p>Xozircha hech qanday izoh topilmadi!</p>

      </div>
    </div>
    <el-dialog
      v-model="visible"
      :show-close="false"
      :width="536"
      modal-class="auth-modal"
    >
      <div class="flex flex-col">
        <div class="title mb-3 flex justify-between">
          <h4 class="font-600 text-[20px]">E'lon borasida izoh</h4>
          <button
            class="h-[28px] w-[28px] flex justify-center items-center bg-[--grey-1] absolute top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M8.46875 15.9128L15.5398 8.8418"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M8.46875 8.8418L15.5398 15.9128"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="form">
          <el-form
            :model="formState"
            :label-position="'top'"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item class="mb-0" prop="comment">
              <el-input
                class="comment_input"
                v-model="formState.comment"
                :rows="5"
                type="textarea"
                placeholder="Izohingizni qoldiring"
              />
            </el-form-item>
          </el-form>
        </div>
        <button
          @click="onSubmit"
          class="mx-auto font-600 text-[17px] text-white bg-[color:var(--green)] py-[14px] w-full flex justify-center rounded-lg"
          :class="{ 'pointer-events-none opacity-50': loading }"
        >
          <span v-if="!loading">Yuborish</span> <LoaderBtn v-else />
        </button>
      </div>
      <template #footer>
        <span></span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="css" scoped>
.info-tab {
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.08);
}
:deep(.el-dialog) {
  border-radius: 12px;
}
:deep(.el-dialog__body) {
  padding: 40px;
}
:deep(.comment_input) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--grey-1);
}
</style>
