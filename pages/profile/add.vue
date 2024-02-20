<script setup>
import announcementApi from "@/api/announcementApi";
const accessToken = ref(null);
const loading = ref(false);
const formRef = ref();
const router = useRouter();
const visibleMap = ref(false);
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

const formState = reactive({
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
    formState.images = fileListItem.value.map((item) => item.response.uuid);
};
const onSubmit = async () => {
  formRef.value.validate().then(async () => __CREATE_ANNOUNCE(formState));
};

const __CREATE_ANNOUNCE = async (formData) => {
  try {
    loading.value = true;
    const data = await announcementApi.postAnnouncement(formData);
    dialogVisible.value = false;
    ElNotification({
      title: "Success",
      message: "E'lon muvaffaqiyatli qo'shildi",
      type: "success",
    });
    router.push("/profile");
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
  accessToken.value = localStorage.getItem("accessToken");
});
const closeMap = () => {
  visibleMap.value = false;
};
const formHandle = (obj) => {
  formState.transports = obj.transports;
  formState.location_x = obj.coords.value[0];
  formState.location_y = obj.coords.value[1];
};
</script>
<template>
  <ProfileLayout>
    <div class="announcements py-[60px]">
      <div class="2xl:container mx-auto px-4">
        <div class="title flex justify-between items-center">
          <h3 class="text-[60px] font-600">E'lon qo'shish</h3>
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

                  <!-- <div class="flex flex-col gap-4">
                    <p v-if="loadingBus" class="text-base font-400 text-[--dark-5]">
                      Поиск маршрутов рядом с адресом
                    </p>
                    <p v-else class="text-base font-400 text-[--dark-5]">
                      Маршруты рядом с адресом
                    </p>
                    <div class="flex gap-4" v-if="loadingBus">
                      <el-skeleton
                        v-for="loadCard in loadList"
                        :key="loadCard"
                        :rows="0"
                        width="100%"
                      />
                    </div>
                    <div v-else class="bus-routes">
                      <ul class="flex gap-4 flex-wrap">
                        <li
                          class="w-8 h-8 flex justify-center items-center bg-[--green] text-white cursor-pointer rounded-sm"
                          v-for="route in routes"
                          @click="handleBusRoute(route)"
                        >
                          {{ route }}
                        </li>
                      </ul>
                    </div>
                  </div> -->
                </div>
              </div>
              <div
                class="flex justify-end max-w-[60%] mt-4 cursor-pointer"
                @click="visibleMap = true"
              >
                <div
                  class="h-12 w-[250px] flex items-center justify-center bg-[#3A75CE] rounded-lg text-white font-500 gap-2"
                >
                Haritadan joyni ko’rsatish
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4 7C4 4.92893 5.67893 3.25 7.75 3.25C9.8211 3.25 11.5 4.92893 11.5 7C11.5 9.0711 9.8211 10.75 7.75 10.75C5.67893 10.75 4 9.0711 4 7ZM7.75 4.75C6.5074 4.75 5.5 5.75736 5.5 7C5.5 8.2426 6.5074 9.25 7.75 9.25C8.9926 9.25 10 8.2426 10 7C10 5.75736 8.9926 4.75 7.75 4.75Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.20691 6.12724C1.48067 2.80603 4.25605 0.25 7.5885 0.25H7.9125C11.245 0.25 14.0203 2.80603 14.2941 6.12724C14.4408 7.90751 13.8909 9.6753 12.7602 11.0581L9.1654 15.4545C8.4341 16.3488 7.0669 16.3488 6.3356 15.4545L2.74082 11.0581C1.61008 9.6752 1.06017 7.90751 1.20691 6.12724ZM7.5885 1.75C5.03671 1.75 2.91147 3.70726 2.70184 6.25046C2.58702 7.64343 3.0173 9.0266 3.90204 10.1086L7.4968 14.505C7.6279 14.6653 7.8731 14.6653 8.0042 14.505L11.599 10.1086C12.4837 9.0266 12.914 7.64343 12.7992 6.25046C12.5895 3.70726 10.4643 1.75 7.9125 1.75H7.5885Z"
                      fill="white"
                    />
                    <path
                      d="M3.42082 14.3353C3.60606 13.9648 3.45589 13.5143 3.08541 13.3291C2.71493 13.1438 2.26442 13.294 2.07918 13.6645L0.0791814 17.6645C-0.0370686 17.897 -0.0246384 18.1731 0.112012 18.3942C0.248672 18.6153 0.490072 18.7499 0.750002 18.7499H14.75C15.0099 18.7499 15.2513 18.6153 15.388 18.3942C15.5246 18.1731 15.5371 17.897 15.4208 17.6645L13.4208 13.6645C13.2356 13.294 12.7851 13.1438 12.4146 13.3291C12.0441 13.5143 11.8939 13.9648 12.0792 14.3353L13.5365 17.2499H1.96353L3.42082 14.3353Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <!-- <div class="search">
                <el-input v-model="search" @change="onChange" />
              </div>
              <div class="map mt-6">
                <LMap ref="map" :zoom="zoom" :center="mapCenter" @click="handleMapClick">
                  <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                  <l-marker :lat-lng="coords"><l-popup>Vash marker</l-popup> </l-marker>
                  <l-polyline
                    :lat-lngs="busRoute"
                    :color="'#219FC8'"
                    :weight="5"
                  ></l-polyline>
                  <l-polyline
                    :lat-lngs="busRoute2"
                    :color="'#7AC335'"
                    :weight="5"
                  ></l-polyline>
                </LMap>
              </div> -->
              <ProfileMapModal
                :visible="visibleMap"
                @close="closeMap"
                @formHandle="formHandle"
              />
            </div>
          </el-form>

          <div class="flex justify-end mt-[65px] max-w-[60%]">
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
:deep(.el-skeleton) {
  max-width: 32px;
}
:deep(.el-skeleton__item) {
  width: 100%;
  height: 32px;
}
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
