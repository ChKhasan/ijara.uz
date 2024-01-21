<script setup>
import announcementApi from "@/api/announcementApi";
const accessToken = ref(null);
const loading = ref(false);
const formRef = ref();
const router = useRouter();
const zoom = ref(10);
const coords = ref([0, 0]);
const mapCenter = ref([40.7128, -74.006]);
const route = useRoute();
const announcement = ref({});
const busRoute = ref([
  { lat: 40.7128, lng: -74.006 },
  { lat: 40.7185, lng: -74.0024 },
  { lat: 40.7213, lng: -73.9884 },
  { lat: 40.7198, lng: -73.9712 },
  { lat: 40.7128, lng: -73.9662 },
]);
const rules = {
  title: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],
  phone_number: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],
};

const formState = ref({
  transports: [],
  images: [],
  title: "",
  partnership: true,
  need_people_count: 0,
  room_count: 0,
  address: "",
  location_x: "",
  location_y: "",
  currency: "USD",
  total_price: 0,
  price_for_one: 0,
  appartment_status: 10,
  description: "",
  conditioner: true,
  washing_machine: true,
  user: 1,
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const fileListItem = ref([]);

const handleRemove = (uploadFile, uploadFiles) => {};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const handleAvatarSuccess = (uploadFile) => {
  if (fileListItem.value[0].response.uuid)
    formState.value.images = fileListItem.value.map((item) => item.response.uuid);
};
const onSubmit = () => {
  formRef.value.validate().then(async () => __CREATE_ANNOUNCE(formState.value));
};
const __CREATE_ANNOUNCE = async (formData) => {
  try {
    loading.value = true;
    const data = await announcementApi.putAnnouncement({
      data: formData,
      id: route.params.id,
    });
    dialogVisible.value = false;
    ElNotification({
      title: "Success",
      message: "E'lon muvaffaqiyatli o'zgartirildi",
      type: "success",
    });
    router.push("/profile/announcements");
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
};
const __DELETE_ANNOUNCE = async (formData) => {
  try {
    loading.value = true;
    const data = await announcementApi.deleteAnnouncement({
      id: route.params.id,
    });
    dialogVisible.value = false;
    ElNotification({
      title: "Success",
      message: "E'lon muvaffaqiyatli o'chirildi",
      type: "success",
    });
    router.push("/profile/announcements");
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
function handleMapClick(e) {
  coords.value = Object.values(e.latlng);
}

async function __GET_ANNOUNCEMENT_BY_ID() {
  try {
    loading.value = true;
    const data = await announcementApi.getAnnouncementById({ id: route.params.id });
    console.log(data);
    announcement.value = data?.data;
    formState.value = data?.data;
    console.log("form", formState.value.title);
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
const open = () => {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
    draggable: true,
  })
    .then(async () => {
      await __DELETE_ANNOUNCE();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
useAsyncData("announcement", async () => {
  return __GET_ANNOUNCEMENT_BY_ID();
});
onMounted(() => {
  accessToken.value = localStorage.getItem("accessToken");
  // __GET_ANNOUNCEMENT_BY_ID();
});
</script>
<template>
  <ProfileLayout>
    <div class="announcements py-[60px]">
      <div class="2xl:container mx-auto px-4">
        <div class="title flex justify-between items-center">
          <h3 class="text-[60px] font-600">E'lonni o'zgartirish</h3>

          <div class="flex gap-4 justify-end">
            <button
              class="px-[20px] whitespace-nowrap py-[10px] rounded-[12px] text-black bg-[var(--gray-1)] text-[16px] font-500 flex items-center gap-[10px]"
              @click="$router.push('/profile/announcements')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z"
                  fill="black"
                />
              </svg>
              Ortga qaytish
            </button>
            <button
              @click="open"
              class="px-[20px] whitespace-nowrap py-[10px] rounded-[12px] text-[#ff0000] bg-[var(--gray-1)] text-[16px] font-500 flex items-center gap-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                style="
                  width: 100%;
                  height: 100%;
                  transform: translate3d(0, 0, 0);
                  content-visibility: visible;
                "
                viewBox="0 0 500 500"
              >
                <g clip-path="url(#e)">
                  <g clip-path="url(#f)" style="display: none">
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g class="primary design" mask="url(#g)" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                      <path fill="none" class="primary" />
                    </g>
                    <g class="primary design" mask="url(#h)" style="display: none">
                      <path class="primary" />
                      <path fill="none" class="primary" />
                    </g>
                  </g>
                  <g clip-path="url(#i)" style="display: none">
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g clip-path="url(#j)" mask="url(#k)" style="display: none">
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#l)" style="display: none">
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g clip-path="url(#m)" mask="url(#n)" style="display: none">
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                      <g class="primary design" style="display: none">
                        <path class="primary" />
                        <path fill="none" class="primary" />
                      </g>
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                  </g>
                  <g clip-path="url(#o)" style="display: block">
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path fill="none" class="primary" />
                    </g>
                    <g class="primary design" style="display: block">
                      <path
                        fill="red"
                        d="M388.737 155.025H92.95l27.912 251.626c3.124 28.746 27.704 50.409 56.866 50.409h142.06c29.162 0 53.742-21.663 56.866-50.409l27.912-251.626h-15.83zM269.589 248.76c0-11.457 9.374-20.83 20.83-20.83 11.457 0 20.83 9.373 20.83 20.83v124.98c0 11.456-9.373 20.83-20.83 20.83-11.456 0-20.83-9.374-20.83-20.83V248.76zm-83.32 0c0-11.457 9.374-20.83 20.83-20.83 11.457 0 20.83 9.373 20.83 20.83v124.98c0 11.456-9.373 20.83-20.83 20.83-11.456 0-20.83-9.374-20.83-20.83V248.76z"
                        class="primary"
                      />
                    </g>
                    <g class="primary design" style="display: block">
                      <path
                        fill="red"
                        d="M415.396 82.116h-145.81v-20.83c0-11.498-9.311-20.83-20.83-20.83-11.519 0-20.83 9.332-20.83 20.83v20.83H82.116c-11.519 0-20.83 9.332-20.83 20.83 0 11.498 9.311 20.83 20.83 20.83h333.28c11.519 0 20.83-9.332 20.83-20.83 0-11.498-9.311-20.83-20.83-20.83z"
                        class="primary"
                      />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                  </g>
                  <g clip-path="url(#p)" style="display: none">
                    <g fill="none" class="primary design" style="display: none">
                      <path class="primary" />
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path fill="none" class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                    <g class="primary design" style="display: none">
                      <path class="primary" />
                    </g>
                  </g>
                </g>
              </svg>
              O'chirish
            </button>
          </div>
        </div>
        <div class="body mt-[30px]">
          <el-form
            :model="formState"
            :label-position="'top'"
            ref="formRef"
            :rules="rules"
          >
            <div class="forma max-w-[992px] mx-auto bg-[var(--gray-1)] px-8 py-8">
              <h4 class="text-black font-semibold mb-4 text-[24px]">
                Опишите в подробностях
              </h4>
              <div class="max-w-[60%]">
                <div class="form-grid flex flex-col gap-[30px]">
                  <el-form-item
                    label="Укажите название*"
                    class="form-item w-full mb-0"
                    prop="title"
                  >
                    <el-input v-model="formState.title" placeholder="Hазвание" />
                  </el-form-item>
                  <el-form-item
                    label="Местоположение*"
                    class="form-item w-full mb-0"
                    name="name"
                  >
                    <el-input v-model="formState.address" placeholder="Местоположение*" />
                  </el-form-item>
                  <el-form-item
                    label="Описание*"
                    class="form-textarea w-full mb-0"
                    name="name"
                  >
                    <el-input
                      type="textarea"
                      rows="6"
                      v-model="formState.description"
                      placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание"
                    />
                  </el-form-item>
                  <!-- <el-form-item
                    label="Tu’gilgan sanangiz"
                    class="date-input w-full mb-0"
                    name="name"
                  >
                    <el-date-picker v-model="formState.name" />
                  </el-form-item> -->
                  <!-- <el-form-item
                  label="Tu’gilgan sanangiz"
                  class="form-item w-full mb-0"
                  name="name"
                >
                  <el-select multiple style="width: 100%" placeholder="Please select">
                    <el-option
                      v-for="i in 25"
                      :key="(i + 9).toString(36) + i"
                      :label="(i + 9).toString(36) + i"
                      :value="i"
                    />
                  </el-select>
                </el-form-item> -->
                  <el-popover
                    placement="right-start"
                    :width="400"
                    trigger="hover"
                    style="background: red"
                    content="Добавьте в объявление настоящие фото товара, а не фото из интернета, чтобы повысить доверие покупателей. Поддерживаются файлы до 5МБ в формате .jpg .jpeg, .png, .gif/."
                  >
                    <template #reference>
                      <div class="clearfix">
                        <h4 class="text-black font-semibold mb-0 text-[24px]">Фото</h4>
                        <p class="mb-3 mt-3">
                          Первое фото будет на обложке объявления. Перетащите, чтобы
                          изменить порядок.
                        </p>
                        <el-upload
                          name="image"
                          action="http://178.128.154.43/api/images/"
                          list-type="picture-card"
                          v-model:file-list="fileListItem"
                          :headers="{
                            Authorization: `Bearer ${accessToken}`,
                          }"
                          :on-success="handleAvatarSuccess"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                        >
                          <div v-if="fileListItem.length < 8">
                            <div class="ant-upload-text">Upload</div>
                          </div>
                        </el-upload>
                        <el-dialog v-model="dialogVisible">
                          <img w-full :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                      </div> </template
                  ></el-popover>
                </div>
              </div>
            </div>
            <div class="forma max-w-[992px] mt-4 mx-auto bg-[var(--gray-1)] px-8 py-8">
              <h4 class="text-black font-semibold mb-4 text-[24px]">
                Дополнительная информация
              </h4>
              <div class="max-w-[60%]">
                <div class="flex flex-col">
                  <el-form-item class="w-full mb-0" name="name">
                    <!-- <el-switch v-model="formState.conditioner" /> -->
                    <el-checkbox
                      v-model="formState.conditioner"
                      label="Кондиционер"
                      size="large"
                    />
                  </el-form-item>
                  <el-form-item class="w-full mb-0" name="name">
                    <!-- <el-switch v-model="formState.washing_machine" /> -->
                    <el-checkbox
                      v-model="formState.washing_machine"
                      label="Стиральная машина"
                      size="large"
                    />
                  </el-form-item>
                  <el-form-item class="w-full mb-0" name="name">
                    <!-- <el-switch v-model="formState.washing_machine" /> -->
                    <el-checkbox
                      v-model="formState.partnership"
                      label="К партнерству"
                      size="large"
                    />
                  </el-form-item>
                </div>
                <div class="flex flex-col gap-[30px]">
                  <el-form-item label="Цена" class="form-item w-full mb-0" name="name">
                    <el-input v-model="formState.total_price" placeholder="999 999 999" />
                  </el-form-item>

                  <el-form-item
                    label="Цена (На человека)"
                    class="form-item w-full mb-0"
                    name="name"
                  >
                    <el-input
                      v-model="formState.price_for_one"
                      placeholder="Местоположение*"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Число людей"
                    class="form-item w-full mb-0"
                    name="name"
                  >
                    <el-input v-model="formState.need_people_count" placeholder="999" />
                  </el-form-item>
                  <el-form-item
                    label="Количество комнат"
                    class="form-item w-full mb-0"
                    name="name"
                  >
                    <el-input v-model="formState.room_count" placeholder="999" />
                  </el-form-item>
                </div>
              </div>
              <div class="map mt-6">
                <LMap ref="map" :zoom="zoom" :center="mapCenter" @click="handleMapClick">
                  <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                  <!-- <l-marker :lat-lng="coords"><l-popup>Vash marker</l-popup> </l-marker> -->
                  <l-polyline
                    :lat-lngs="busRoute"
                    :color="'blue'"
                    :weight="5"
                  ></l-polyline>
                </LMap>
              </div>
            </div>
          </el-form>
          <div class="flex justify-end mt-[65px]">
            <button
              @click="onSubmit"
              class="w-[270px] h-12 rounded-[12px] bg-[var(--green)] text-white flex items-center justify-center"
              :class="{ 'pointer-events-none opacity-50': loading }"
            >
              <span v-if="!loading">Saqlash</span> <LoaderBtn v-else />
            </button>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style lang="css" scoped>
.map {
  height: 450px;
}
.form-item :deep(label),
.date-input :deep(label) {
  margin-bottom: 10px;
}
.form-item,
.form-textarea {
  margin-bottom: 0;
}
.form-item :deep(label),
.date-input :deep(label),
.date-input :deep(input),
.form-item :deep(input) {
  color: var(--dark-5);
  font-family: var(--regular);
  font-size: 16px;
  font-weight: 400;
  width: 100%;
}
.form-item :deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
  padding: 13px 18px;
  height: 48px;
}
.date-input :deep(label:before),
.form-item :deep(label:before) {
  display: none !important;
}
.date-input :deep(.ant-picker) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
  width: 100%;
  height: 48px;
}
.date-input:deep(.ant-col),
.form-item :deep(.ant-col) {
  padding: 0;
}
.form-textarea :deep(textarea) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
}
.form-item :deep(.ant-select-selector) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
  padding: 0 12px;
  height: 48px;
}
.form-item :deep(.ant-select-multiple .ant-select-selection-item) {
  height: 36px;
  display: flex;
  align-items: center;
  color: var(--dark-5);
  font-family: var(--regular);
  font-size: 16px;
  font-weight: 400;
}
:deep(.ant-upload-list-picture-card .ant-upload-list-item),
:deep(.ant-upload-select-picture-card) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
}
</style>
