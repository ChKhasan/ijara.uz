<script setup>
import VOtpInput from "vue3-otp-input";
import { useCounterStore } from "@/store/modal";
import { useAuthHandle } from "@/store/auth";
import { ElMessageBox } from "element-plus";
import { ElNotification } from "element-plus";
import authApi from "~/api/authApi";
// import Loader from "../"

const dialogVisible = ref(false);

const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const router = useRouter();
const formRef = ref();
const modal = useCounterStore();
const auth = useAuthHandle();
const open = ref(true);
const loginVisible = ref(false);
const openSign = ref(false);
const openCode = ref(false);
const openInfo = ref(false);
const loading = ref(false);
const formState = reactive({
  name: "",
  phone_number: "",
  password: "",
});
const formLogin = reactive({
  phone_number: "",
  password: "",
});
const rules = {
  name: [
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
const onSubmit = () => {
  const formData = {
    ...formState,
    phone_number: formState.phone_number.replaceAll(" ", ""),
  };
  formRef.value
    .validate()
    .then(async () => {
      const data = await authApi.postNumberSend(formData);
      dialogVisible.value = false;
      openSign.value = true;
    })
    .catch((error) => {});
};

const handleOk = (e) => {
  open.value = false;
};
watch(
  () => modal.visible,
  () => {
    openInfo.value = !openInfo.value;
  }
);
watch(
  () => modal.login,
  () => {
    loginVisible.value = !loginVisible.value;
  }
);
const otpInput = ref(null);
const bindValue = ref("");

const handleOnComplete = (value) => {
  bindValue.value = value;
};

const handleOnChange = (value) => {
  bindValue.value = value;
};
const onRegister = () => {
  const formData = {
    ...formState,
    phone_number: formState.phone_number.replaceAll(" ", ""),
  };
  formRef.value.validate().then(async () => __REGISTER(formData));
};
const onSubmitLogin = () => {
  const formData = {
    ...formLogin,
    phone_number: formLogin.phone_number.replaceAll(" ", ""),
  };
  formRef.value.validate().then(async () => __LOGIN(formData));
};

const __REGISTER = async (formData) => {
  try {
    loading.value = true;
    const data = await authApi.postRegister(formData);
    loginVisible.value = false;
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
};
const __LOGIN = async (formData) => {
  try {
    loading.value = true;
    const data = await authApi.postLogin(formData);
    if (data.status == 200) {
      localStorage.setItem("accessToken", data?.data?.access);
      localStorage.setItem("refreshToken", data?.data?.refresh);
      auth.authHandle(true);
      router.push("/profile");
    }

    loginVisible.value = false;
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
  <div>
    <el-dialog
      v-model="loginVisible"
      :show-close="false"
      :width="536"
      modal-class="auth-modal"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex justify-center">
          <span class="rounded-[18px] bg-white px-[20px] py-[20px] user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
            >
              <g filter="url(#filter0_d_393_13875)">
                <g filter="url(#filter1_i_393_13875)">
                  <path
                    d="M26 5C21.7242 5 18.2581 8.36213 18.2581 12.5095C18.2581 16.6569 21.7242 20.0191 26 20.0191C30.2758 20.0191 33.7419 16.6569 33.7419 12.5095C33.7419 8.36213 30.2758 5 26 5Z"
                    fill="#AEAEB2"
                  />
                  <path
                    d="M26 5C21.7242 5 18.2581 8.36213 18.2581 12.5095C18.2581 16.6569 21.7242 20.0191 26 20.0191C30.2758 20.0191 33.7419 16.6569 33.7419 12.5095C33.7419 8.36213 30.2758 5 26 5Z"
                    fill="url(#paint0_linear_393_13875)"
                  />
                  <path
                    d="M17.7419 24.0242C13.4662 24.0242 10 27.3862 10 31.5337V33.9133C10 35.4216 11.127 36.7077 12.6617 36.9508C21.4954 38.3497 30.5046 38.3497 39.3382 36.9508C40.873 36.7077 42 35.4216 42 33.9133V31.5337C42 27.3862 38.5339 24.0242 34.2581 24.0242H33.5543C33.1734 24.0242 32.7949 24.0826 32.4328 24.1972L30.646 24.7633C27.627 25.7193 24.373 25.7193 21.354 24.7633L19.5671 24.1972C19.205 24.0826 18.8265 24.0242 18.4457 24.0242H17.7419Z"
                    fill="#AEAEB2"
                  />
                  <path
                    d="M17.7419 24.0242C13.4662 24.0242 10 27.3862 10 31.5337V33.9133C10 35.4216 11.127 36.7077 12.6617 36.9508C21.4954 38.3497 30.5046 38.3497 39.3382 36.9508C40.873 36.7077 42 35.4216 42 33.9133V31.5337C42 27.3862 38.5339 24.0242 34.2581 24.0242H33.5543C33.1734 24.0242 32.7949 24.0826 32.4328 24.1972L30.646 24.7633C27.627 25.7193 24.373 25.7193 21.354 24.7633L19.5671 24.1972C19.205 24.0826 18.8265 24.0242 18.4457 24.0242H17.7419Z"
                    fill="url(#paint1_linear_393_13875)"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_393_13875"
                  x="-9"
                  y="-4"
                  width="68"
                  height="63"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_393_13875"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_393_13875"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_i_393_13875"
                  x="10"
                  y="-5"
                  width="32"
                  height="43"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-10" />
                  <feGaussianBlur stdDeviation="8.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_393_13875"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_393_13875"
                  x1="26"
                  y1="5"
                  x2="26"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_393_13875"
                  x1="26"
                  y1="5"
                  x2="26"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
        <div class="flex justify-center">
          <h2 class="font-600 text-[31px]">
            Tizimga <span class="text-[color:var(--green)]">kirish</span>
          </h2>
        </div>
        <div>
          <el-form
            :model="formLogin"
            :label-position="'top'"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item label="Telefon raqamingiz" class="auth" prop="phone_number">
              <el-input
                v-model="formLogin.phone_number"
                placeholder="+998"
                v-maska
                data-maska="+998 ## ### ## ##"
              />
            </el-form-item>
            <el-form-item label="Parol" class="auth" prop="password">
              <el-input
                type="password"
                v-model="formLogin.password"
                placeholder="******"
              />
            </el-form-item>
          </el-form>
          <button
            class="w-full h-12 items-center text-[17px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
            :class="{ 'pointer-events-none opacity-50': loading }"
            @click="onSubmitLogin"
          >
            <span v-if="!loading">Kirish</span> <LoaderBtn v-else />
          </button>
        </div>
        <button
          class="mx-auto font-600 text-[17px] text-[color:var(--green)]"
          @click="(open = false), (openSign = true)"
        >
          Ro’yxatdan o’tish
        </button>
      </div>
      <template #footer>
        <span></span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :width="536"
      modal-class="auth-modal"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex justify-center">
          <span class="rounded-[18px] bg-white px-[20px] py-[20px] user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="53"
              viewBox="0 0 52 53"
              fill="none"
            >
              <g filter="url(#filter0_d_393_13875)">
                <g filter="url(#filter1_i_393_13875)">
                  <path
                    d="M26 5C21.7242 5 18.2581 8.36213 18.2581 12.5095C18.2581 16.6569 21.7242 20.0191 26 20.0191C30.2758 20.0191 33.7419 16.6569 33.7419 12.5095C33.7419 8.36213 30.2758 5 26 5Z"
                    fill="#AEAEB2"
                  />
                  <path
                    d="M26 5C21.7242 5 18.2581 8.36213 18.2581 12.5095C18.2581 16.6569 21.7242 20.0191 26 20.0191C30.2758 20.0191 33.7419 16.6569 33.7419 12.5095C33.7419 8.36213 30.2758 5 26 5Z"
                    fill="url(#paint0_linear_393_13875)"
                  />
                  <path
                    d="M17.7419 24.0242C13.4662 24.0242 10 27.3862 10 31.5337V33.9133C10 35.4216 11.127 36.7077 12.6617 36.9508C21.4954 38.3497 30.5046 38.3497 39.3382 36.9508C40.873 36.7077 42 35.4216 42 33.9133V31.5337C42 27.3862 38.5339 24.0242 34.2581 24.0242H33.5543C33.1734 24.0242 32.7949 24.0826 32.4328 24.1972L30.646 24.7633C27.627 25.7193 24.373 25.7193 21.354 24.7633L19.5671 24.1972C19.205 24.0826 18.8265 24.0242 18.4457 24.0242H17.7419Z"
                    fill="#AEAEB2"
                  />
                  <path
                    d="M17.7419 24.0242C13.4662 24.0242 10 27.3862 10 31.5337V33.9133C10 35.4216 11.127 36.7077 12.6617 36.9508C21.4954 38.3497 30.5046 38.3497 39.3382 36.9508C40.873 36.7077 42 35.4216 42 33.9133V31.5337C42 27.3862 38.5339 24.0242 34.2581 24.0242H33.5543C33.1734 24.0242 32.7949 24.0826 32.4328 24.1972L30.646 24.7633C27.627 25.7193 24.373 25.7193 21.354 24.7633L19.5671 24.1972C19.205 24.0826 18.8265 24.0242 18.4457 24.0242H17.7419Z"
                    fill="url(#paint1_linear_393_13875)"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_393_13875"
                  x="-9"
                  y="-4"
                  width="68"
                  height="63"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_393_13875"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_393_13875"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_i_393_13875"
                  x="10"
                  y="-5"
                  width="32"
                  height="43"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-10" />
                  <feGaussianBlur stdDeviation="8.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_393_13875"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_393_13875"
                  x1="26"
                  y1="5"
                  x2="26"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_393_13875"
                  x1="26"
                  y1="5"
                  x2="26"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
        <div class="flex justify-center">
          <h2 class="font-600 text-[31px]">
            Tizimga <span class="text-[color:var(--green)]">kirish</span>
          </h2>
        </div>
        <div>
          <el-form
            :model="formState"
            :label-position="'top'"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item label="Telefon raqamingiz" class="auth" prop="name">
              <el-input
                v-model="formState.name"
                placeholder="+998"
                v-maska
                data-maska="+998 ## ### ## ##"
              />
            </el-form-item>
          </el-form>
          <button
            class="w-full h-12 items-center text-[17px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
            @click="onSubmit"
          >
            Kirish
          </button>
        </div>
        <button
          class="mx-auto font-600 text-[17px] text-[color:var(--green)]"
          @click="(open = false), (openSign = true)"
        >
          Ro’yxatdan o’tish
        </button>
      </div>
      <template #footer>
        <span></span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="openSign"
      @ok="handleOk"
      :width="536"
      :closable="false"
      wrap-className="auth-modal"
      :content-style="{ padding: '40px', borderRadius: '12px' }"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex justify-center">
          <span class="rounded-[18px] bg-white px-[20px] py-[20px] user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="54"
              viewBox="0 0 60 54"
              fill="none"
            >
              <g filter="url(#filter0_d_394_14105)">
                <g filter="url(#filter1_i_394_14105)">
                  <path
                    d="M26 5.5C21.8579 5.5 18.5 8.85786 18.5 13C18.5 17.1421 21.8579 20.5 26 20.5C30.1422 20.5 33.5 17.1421 33.5 13C33.5 8.85786 30.1422 5.5 26 5.5Z"
                    fill="url(#paint0_linear_394_14105)"
                  />
                  <path
                    d="M18 24.5C13.8579 24.5 10.5 27.8578 10.5 32V34.3766C10.5 35.883 11.5918 37.1674 13.0785 37.4102C21.6362 38.8074 30.3638 38.8074 38.9214 37.4102C40.4082 37.1674 41.5 35.883 41.5 34.3766V32C41.5 27.8578 38.1422 24.5 34 24.5H33.3182C32.9492 24.5 32.5826 24.5584 32.2318 24.6728L30.5008 25.2382C27.5762 26.193 24.4238 26.193 21.4992 25.2382L19.7681 24.6728C19.4174 24.5584 19.0507 24.5 18.6817 24.5H18Z"
                    fill="url(#paint1_linear_394_14105)"
                  />
                  <path
                    d="M43 10.5C43.8284 10.5 44.5 11.1716 44.5 12V15.5H48C48.8284 15.5 49.5 16.1716 49.5 17C49.5 17.8284 48.8284 18.5 48 18.5H44.5V22C44.5 22.8284 43.8284 23.5 43 23.5C42.1716 23.5 41.5 22.8284 41.5 22V18.5H38C37.1716 18.5 36.5 17.8284 36.5 17C36.5 16.1716 37.1716 15.5 38 15.5H41.5V12C41.5 11.1716 42.1716 10.5 43 10.5Z"
                    fill="url(#paint2_linear_394_14105)"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_394_14105"
                  x="-7"
                  y="-4"
                  width="68"
                  height="63"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_394_14105"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_394_14105"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_i_394_14105"
                  x="10.5"
                  y="-4.5"
                  width="39"
                  height="42.958"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-10" />
                  <feGaussianBlur stdDeviation="8.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_394_14105"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_394_14105"
                  x1="43"
                  y1="10.5"
                  x2="43"
                  y2="23.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_394_14105"
                  x1="43"
                  y1="10.5"
                  x2="43"
                  y2="23.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_394_14105"
                  x1="43"
                  y1="10.5"
                  x2="43"
                  y2="23.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#97FF45" />
                  <stop offset="1" stop-color="#17B917" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
        <div class="flex justify-center">
          <h2 class="font-600 text-[31px]">
            Ro’yhatdan <span class="text-[color:var(--green)]">o’tish</span>
          </h2>
        </div>
        <el-form :model="formState" :label-position="'top'" ref="formRef" :rules="rules">
          <el-form-item label="Telefon raqamingiz" class="auth mb-0" name="name">
            <el-input v-model="formState.name" placeholder="+998" />
          </el-form-item>
        </el-form>
        <div class="flex gap-[12px] items-start">
          <el-checkbox />
          <p class="text-[16px] text-[color:var(--dark-5)] font-400">
            Men
            <span class="text-[color:var(--green)] font-600 underline cursor-pointer"
              >Foydalanish huquqlari</span
            >
            bilan tanishib chiqdim, va barchasiga roziman.
          </p>
        </div>
        <button
          class="w-full h-12 items-center text-[17px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
          @click="(openCode = true), (openSign = false)"
        >
          Ro’yhatdan o’tish
        </button>
      </div>
      <template #footer>
        <span></span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="openCode"
      @ok="handleOk"
      :width="456"
      :closable="false"
      wrap-className="auth-modal"
      :content-style="{ padding: '40px', borderRadius: '12px' }"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex justify-center">
          <h2 class="font-700 text-[31px] leading-[38px]">Kodni kiriting</h2>
        </div>
        <div class="flex items-center flex-col gap-[12px]">
          <p class="font-400 text-[16px] text-[color:var(--gray-6)] leading-[16px]">
            Telefoninggizga kelgan kodni kiriting !!!
          </p>
          <v-otp-input
            ref="otpInput"
            v-model="bindModal"
            input-classes="otp-input"
            separator=""
            :num-inputs="5"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :placeholder="['*', '*', '*', '*', '*']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
          <p class="font-400 text-[16px] text-[color:var(--gray-6)] leading-[16px]">
            1:00
          </p>
        </div>
        <button
          class="w-full h-12 items-center text-[17px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center leading-[16px]"
          :class="{ 'pointer-events-none opacity-50': loading }"
          @click="openInfo = true"
        >
          <span v-if="!loading">Tasdiqlash</span> <LoaderBtn v-else />
        </button>
        <button
          class="mx-auto font-600 text-[17px] text-[color:var(--green)] leading-[16px]"
        >
          Boshqa tel raqam kiritish
        </button>
      </div>
      <template #footer class="mt-0">
        <span></span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="openInfo"
      @ok="handleOk"
      :width="456"
      :closable="false"
      wrap-className="auth-modal"
      :content-style="{ padding: '40px', borderRadius: '12px' }"
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex justify-center">
          <h2 class="font-700 text-[31px] leading-[38px]">
            Shaxsiy ma’lumotlarni kiriting!
          </h2>
        </div>
        <div class="mx-auto w-[100px] h-[100px] rounded-full relative flex items-center">
          <img
            class="object-cover w-full h-full overflow-hidden rounded-full"
            src="@/assets/image/Rectangle1.png"
            alt=""
          />
          <span class="absolute right-[-12px]"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect width="24" height="24" rx="4" fill="#00A000" />
              <path
                d="M12 17V7M7 12H17"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
          ></span>
        </div>
        <div>
          <el-form
            :model="formState"
            :label-position="'top'"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item label="Ism" class="auth info" name="name">
              <el-input v-model="formState.name" placeholder="(Ism)" />
            </el-form-item>
            <el-form-item label="Telefon raqami" class="auth info" name="name">
              <el-input
                v-model="formState.phone_number"
                v-maska
                data-maska="+998 ## ### ## ##"
                placeholder="+998 (__) ___ __ __"
              />
            </el-form-item>
            <el-form-item label="Parol" class="auth info" name="name">
              <el-input type="password" v-model="formState.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <button
          class="w-full h-12 items-center text-[17px] bg-[color:var(--green)] rounded-[8px] text-white font-600 flex justify-center"
          :class="{ 'pointer-events-none opacity-50': loading }"
          @click="onRegister"
        >
          <span v-if="!loading">Tasdiqlash</span> <LoaderBtn v-else />
        </button>
      </div>
      <template #footer class="mt-0">
        <span></span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="css" scoped>
:deep(.el-dialog) {
  border-radius: 12px;
}
:deep(.el-dialog__body) {
  padding: 40px;
}
.auth :deep(label),
.info :deep(input) {
  color: var(--gray-6);
  font-family: var(--regular);
  font-size: 16px;
  font-weight: 400;
}
.auth :deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 2px solid var(--input-stroke);
  background: var(--nput-color, #fafafc);
  height: 48px;
  font-family: var(--medium);
  color: var(--dark-5);
}
.info :deep(label) {
  color: var(--dark-6);
}
.auth :deep(label)::before {
  display: none !important;
}
.user-icon {
  box-shadow: 0px 15px 24px 0px rgba(0, 0, 0, 0.08),
    0px -12px 14px 0px rgba(0, 0, 0, 0.14) inset;
}
:deep(.otp-input) {
  width: 38px;
  height: 38px;
  padding: 5px;
  margin: 0 6px;
  font-size: 20px;
  border-radius: 4px;
  border-radius: 8px;
  border: 2px solid var(--input-stroke, #d1ddd1);
  background: var(--input-color, #fafafc);
  text-align: center;
}
/* Background colour of an input field with value */
:deep(.otp-input).is-complete {
  border: 2px solid var(--green);
  background: var(--input-color);
}
:deep(.otp-input)::-webkit-inner-spin-button,
:deep(.otp-input)::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
:deep(.otp-input)::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
