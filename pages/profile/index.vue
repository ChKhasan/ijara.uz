<script setup>
const formState = reactive({
  name: "",
});

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
                <el-input v-model="formState.name" placeholder="+998" />
              </el-form-item>
              <el-form-item label="Familiya" class="auth w-full mb-0" prop="name">
                <el-input v-model="formState.name" placeholder="+998" />
              </el-form-item>
              <el-form-item
                label="Tu’gilgan sanangiz"
                class="date-input auth w-full mb-0"
                prop="name"
              >
                <el-date-picker
                  v-model="formState.name"
                  placeholder="Date"
                  class="w-full"
                />
              </el-form-item>
            </div>
          </el-form>

          <div class="flex justify-end mt-[65px]">
            <button
              class="w-[270px] h-12 rounded-[12px] bg-[var(--green)] text-white flex items-center justify-center"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
</style>
