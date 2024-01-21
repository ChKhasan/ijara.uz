<script setup>
import commentApi from "../../api/commentApi";
const props = defineProps(["announcement"]);
const router = useRouter();
const tabHandle = ref(1);
const zoom = ref(10);
const coords = ref([0, 0]);
const mapCenter = ref([40.7128, -74.006]);
const visible = ref(false);
const loading = ref(false);
const comments = ref([]);
const formRef = ref();

const formState = reactive({
  comment: "string",
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
  formRef.value.validate().then(async () => __POST_COMMENT(formState));
};
const __GET_COMMENT = async () => {
  try {
    const data = await commentApi.getComment();
    comments.value = data?.data;
  } catch (e) {
    errorHandle(e);
  }
};
const __POST_COMMENT = async (formData) => {
  try {
    loading.value = true;
    const data = await commentApi.postComment(formData);
    visible.value = false;
    ElNotification({
      title: "Success",
      message: "Izoh muvaffaqiyatli jonatildi",
      type: "success",
    });
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
    <div class="flex justify-between items-center">
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
        class="mt-[18px] px-4 py-2 bg-[color:var(--green)] rounded-[8px] text-white font-400 flex justify-center"
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
    <div class="comments flex flex-col gap-[18px] mt-[30px]" v-if="tabHandle == 3">
      <AppCommentCard v-for="comment in comments" :key="comment?.id" :comment="comment" />
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
