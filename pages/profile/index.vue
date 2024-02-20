<script setup>
import authApi from "~/api/authApi";
const formState = reactive({
  name: "",
  first_name: "",
  last_name: "",
  email: "",
  // images: ["f6ee130b-3226-4e3b-ba4f-4505509c02f0"],
});
const formRef = reactive(null);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const fileListItem = ref([]);
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const handleAvatarSuccess = (uploadFile) => {
  if (fileListItem.value[0].response.uuid)
    formState.images = fileListItem.value.map((item) => item.response.uuid);
};
const handleRemove = (uploadFile, uploadFiles) => {};
let userInfo = {};
const onSubmit = async () => {
  console.log(userInfo);
  __PUT_USER(formState);
  // formRef.validate().then(async () => __PUT_USER(formState));
};
const __PUT_USER = async (formData) => {
  try {
    const data = await authApi.putUserInfo({
      data: { ...formData },
      id: userInfo?.id,
    });
    ElNotification({
      title: "Success",
      message: "Ma'lumotlaringiz muvaffaqiyatli o'zgartirildi",
      type: "success",
    });
    // router.push("/profile");
  } catch (e) {
    errorHandle(e);
  } finally {
  }
};
const __GET_USER = async () => {
  try {
    const data = await authApi.getuserInfo();
    console.log(data);
    Object.keys(formState).forEach((elem) => {
      formState[elem] = data?.data[elem];
    });
    userInfo = data?.data;
  } catch (e) {
    console.log(e.response);
    errorHandle(e);
  } finally {
  }
};
onMounted(() => {
  __GET_USER();
});
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
const rules = {
  name: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],
};
</script>
<template>
  <ProfileLayout>
    <div class="profile py-[60px]">
      <div class="2xl:container mx-auto px-4">
        <div class="title flex justify-between items-center">
          <h3 class="text-[60px] font-600">Sozlamalar</h3>
          <ProfileTab />
        </div>
        <div class="body mt-[30px]">
          <div class="image-block">
            <h5 class="image-title font-600 text-[31px]">Shaxsiy ma’lumotlar</h5>
            <div class="relative mt-11 w-[168px] h-[168px] flex items-center">
              <div class="image w-full h-full rounded-full overflow-hidden">
                <img
                  class="w-full h-full object-cover"
                  src="../../assets/image/Rectangle18.png"
                  alt=""
                />
              </div>
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
                  <button class="absolute right-[-16px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="4" fill="#00A000" />
                      <path
                        d="M16.0026 22.6666V9.33325M9.33594 15.9999H22.6693"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="forma">
            <el-form
              :model="formState"
              :label-position="'top'"
              ref="formRef"
              :rules="rules"
            >
              <div class="form-grid flex flex-col gap-[30px]">
                <el-form-item label="Ism" class="auth w-full mb-0" prop="name">
                  <el-input v-model="formState.name" placeholder="Ism" />
                </el-form-item>
                <el-form-item label="Familiya" class="auth w-full mb-0" prop="name">
                  <el-input v-model="formState.first_name" placeholder="Familiyangiz" />
                </el-form-item>
                <el-form-item
                  label="Otangizning ismi"
                  class="auth w-full mb-0"
                  prop="name"
                >
                  <el-input
                    v-model="formState.last_name"
                    placeholder="Otangizning ismi"
                  />
                </el-form-item>
                <el-form-item
                  label="Elektron pochta"
                  class="auth w-full mb-0"
                  prop="name"
                >
                  <el-input
                    v-model="formState.email"
                    type="email"
                    placeholder="example@mail.ru"
                  />
                </el-form-item>
                <!-- <el-form-item
                  label="Tu’gilgan sanangiz"
                  class="date-input auth w-full mb-0"
                  prop="name"
                >
                  <el-date-picker
                    v-model="formState.name"
                    placeholder="Date"
                    class="w-full"
                  />
                </el-form-item> -->
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
    </div>
  </ProfileLayout>
</template>

<style lang="css" scoped>
.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.auth :deep(label),
.date-input :deep(label) {
  margin-bottom: 10px;
}
.auth {
  margin-bottom: 0;
}
.auth :deep(label),
.date-input :deep(label),
.date-input :deep(input),
.auth :deep(input) {
  color: var(--dark-5);
  font-family: var(--regular);
  font-size: 16px;
  font-weight: 400;
  width: 100%;
}
.auth :deep(.el-input) {
  width: 100%;
}
.auth :deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--input-color);
  padding: 13px 18px;
  height: 48px;
}
.date-input :deep(label:before),
.auth :deep(label:before) {
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
.auth :deep(.ant-col) {
  padding: 0;
}
:deep(.el-upload--picture-card) {
  width: initial;
  height: initial;
}
</style>
