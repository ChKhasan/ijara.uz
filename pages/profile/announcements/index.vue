<script setup>
import announcementApi from "~/api/announcementApi";
const announcements = ref([]);
const route = useRoute();
const loadList = ref([1, 2, 3, 4, 5]);
const loading = ref(true);
const totalPage = ref(0);
async function __GET_ANNOUNCEMENTS() {
  try {
    loading.value = true;
    const data = await announcementApi.getMyAnnouncement({
      params: {
        ...route.query,
      },
    });
    announcements.value = data?.data?.results;
    totalPage.value = data?.data?.count;
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  __GET_ANNOUNCEMENTS();
});
// useAsyncData("announcement", async () => {
//   return
// });
</script>
<template>
  <ProfileLayout>
    <div class="announcements py-[60px]">
      <div class="2xl:container mx-auto px-4">
        <div class="title flex justify-between items-center">
          <h3 class="text-[60px] font-600">Mening e'lonlarim</h3>
          <div class="tab gap-[10px] flex rounded-[12px] items-center">
            <button
              class="px-[20px] whitespace-nowrap py-[10px] rounded-[12px] text-black bg-[var(--gray-1)] text-[16px] font-500 flex items-center gap-[10px]"
              @click="$router.push('/profile')"
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
              class="px-[20px] whitespace-nowrap py-[10px] rounded-[12px] text-white bg-[var(--green)] text-[16px] font-500 flex items-center gap-[10px]"
              @click="$router.push('/profile/add')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 12.75V5.25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5.25 9H12.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              E'lon qo'shish
            </button>
          </div>
        </div>
        <div
          class="body mx-auto max-w-[1200px] mt-[30px] flex flex-col gap-4 items-center"
          v-if="loading"
        >
          <el-skeleton
            v-for="loadCard in loadList"
            :key="loadCard"
            :rows="0"
            width="100%"
          />
        </div>
        <div
          class="body mx-auto max-w-[1200px] items-center mt-[30px] flex flex-col gap-4"
          v-else
        >
          <AppTheCard
            v-for="announcement in announcements"
            :announcement="announcement"
            :key="announcement?.id"
            :profile="true"
          />
       
        </div>
        <div class="mx-auto max-w-[1200px] flex justify-center">
        
        <VPagination
          :load="true"
          class="xl:hidden mt-6"
          :totalPage="totalPage"
          @getData="__GET_ANNOUNCEMENTS"
        />
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style lang="css" scoped>
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
.auth :deep(input) {
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
:deep(.el-skeleton) {
  max-width: 711px;
}
:deep(.el-skeleton__p.is-first) {
  max-width: 711px;
  width: 100%;
  border-radius: 18px;
  height: 312px;
}
</style>
