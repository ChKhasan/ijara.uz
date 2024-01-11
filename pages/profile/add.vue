<script setup>
import announcementApi from "@/api/announcementApi";

const loading = ref(false);
const formRef = ref();
const router = useRouter();

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
  need_people_count: 2147483647,
  room_count: 2147483647,
  address: "string",
  location_x: "string",
  location_y: "string",
  currency: "USD",
  total_price: 0,
  price_for_one: 0,
  appartment_status: 10,
  description: "string",
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
const onSubmit = () => {
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
</script>
<template>
  <div class="announcements py-[60px]">
    <div class="2xl:container mx-auto  px-4">
      <div class="title flex justify-between items-center">
        <h3 class="text-[60px] font-600">Mening qo'shish</h3>
      </div>
      <div class="body mt-[30px]">
        <el-form :model="formState" :label-position="'top'" ref="formRef" :rules="rules">
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
                        action="http://178.128.154.43:8000/api/images/"
                        list-type="picture-card"
                        v-model:file-list="fileListItem"
                        :headers="{
                          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0NTUwMDM5LCJpYXQiOjE3MDQyOTA4MzksImp0aSI6Ijg3YWNhMmJkNzg4YjRlNjg4OWQyZDk3ZmVmYWM3ZDc2IiwidXNlcl9pZCI6Nn0.LL_I-A08aBeO38S5e3pNezrcKXvMimeV_fA6I3Kp0x4
                      `,
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
          </div>
        </el-form>
        <div class="flex justify-end mt-[65px]">
          <button
            @click="onSubmit"
            class="w-[270px] h-12 rounded-[12px] bg-[var(--green)] text-white flex items-center justify-center"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
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
