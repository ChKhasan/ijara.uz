<script setup>
import announcementApi from "@/api/announcementApi";
const route = useRoute();
const loading = ref(true);
const announcement = ref({});
const url = ref(
  "http://178.128.154.43/media/images/a3319116-4fbb-4436-8205-90291ec6e796/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
);
const srcList = ref([
  "http://178.128.154.43/media/images/a3319116-4fbb-4436-8205-90291ec6e796/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
]);
async function __GET_ANNOUNCEMENTS() {
  try {
    console.log("test");
    loading.value = true;
    const data = await announcementApi.getAnnouncementById({ id: route.params.id });
    console.log(data);
    announcement.value = data?.data;
    // url.value = announcement.value?.images[0]?.image;
    // srcList.value = announcement.value?.images.map((item) => item.image);
  } catch (e) {
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
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
// onMounted(() => {
//   __GET_ANNOUNCEMENTS();
// });
useAsyncData("announcement", async () => {
  return __GET_ANNOUNCEMENTS();
});
</script>
<template>
  <div class="announcement py-[60px]">
    <div class="2xl:container mx-auto px-4">
      <div class="back mb-[30px]">
        <button
          @click="$router.go(-1)"
          class="bg-[var(--grey-1)] font-500 text-[18px] h-11 flex justify-center items-center rounded-xl gap-2 px-[18px]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z"
              fill="black"
            />
          </svg>
          Ortga qaytish
        </button>
      </div>
      <div class="head">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h1 class="font-600 text-[48px]">{{ announcement?.title }}</h1>
            <span class="flex items-center gap-1 font-600 text-[20px]"
              ><svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1523 4.49496C16.6386 3.60943 15.3596 3.60943 14.8459 4.49496L11.2271 10.7314C10.9733 11.1688 10.5346 11.4673 10.0345 11.5429L3.25272 12.5672C2.11368 12.7392 1.71413 14.1773 2.60121 14.9123L7.65333 19.0979C8.12098 19.4853 8.34088 20.0965 8.22728 20.6931L6.90572 27.6333C6.6968 28.7304 7.84852 29.5828 8.83672 29.0625L15.2226 25.7C15.7086 25.4441 16.2895 25.4441 16.7756 25.7L23.1615 29.0625C24.1496 29.5828 25.3014 28.7304 25.0924 27.6333L23.771 20.6931C23.6574 20.0965 23.8772 19.4853 24.3448 19.0979L29.397 14.9123C30.284 14.1773 29.8846 12.7392 28.7455 12.5672L21.9638 11.5429C21.4636 11.4673 21.025 11.1688 20.7711 10.7314L17.1523 4.49496Z"
                  fill="#D7C30F"
                /></svg
              >5
            </span>
          </div>
          <div
            class="flex bg-[var(--grey-1)] font-500 text-[18px] h-11 px-3 justify-center items-center rounded-xl gap-2"
          >
            <p class="text-black text-[18px] font-500">Juda yaxshi:</p>
            <span
              class="bg-[var(--green)] h-5 px-1 rounded font-400 text-[18px] flex items-center text-white"
              >{{ announcement?.appartment_status }}</span
            >
          </div>
        </div>
        <p class="text-[18px] flex justify-start items-center gap-3 mt-5">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.25 10.5C7.25 7.87665 9.37665 5.75 12 5.75C14.6233 5.75 16.75 7.87665 16.75 10.5C16.75 13.1234 14.6233 15.25 12 15.25C9.37665 15.25 7.25 13.1234 7.25 10.5ZM12 7.25C10.2051 7.25 8.75 8.70507 8.75 10.5C8.75 12.2949 10.2051 13.75 12 13.75C13.7949 13.75 15.25 12.2949 15.25 10.5C15.25 8.70507 13.7949 7.25 12 7.25Z"
              fill="#AEAEB2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.52439 9.35685C3.87872 5.05824 7.47087 1.75 11.784 1.75H12.216C16.5292 1.75 20.1213 5.05824 20.4756 9.35685C20.666 11.666 19.9527 13.9589 18.486 15.7526L13.693 21.6144C12.818 22.6845 11.182 22.6845 10.307 21.6144L5.51399 15.7526C4.04733 13.9589 3.33405 11.666 3.52439 9.35685ZM11.784 3.25C8.25152 3.25 5.30951 5.95948 5.01932 9.48008C4.8609 11.4019 5.45455 13.3102 6.67521 14.8031L11.4682 20.6649C11.7431 21.001 12.2569 21.001 12.5318 20.6649L17.3248 14.8031C18.5455 13.3102 19.1391 11.4019 18.9807 9.48008C18.6905 5.95948 15.7485 3.25 12.216 3.25H11.784Z"
              fill="#AEAEB2"
            />
          </svg>
          {{ announcement?.address }}
        </p>
      </div>
      <!-- <div class="gallery mt-8">
        <div class="h-[392px] gallery-grid">
          <div class="w-full h-full rounded-xl overflow-hidden">
            <img
              class="w-full h-full object-cover"
              src="../../assets/image/Rectangle18.png"
              alt=""
            />
          </div>
          <div class="grid grid-cols-1 gap-5 max-h-[392px]">
            <div class="w-full h-full rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="../../assets/image/Rectangle18.png"
                alt=""
              />
            </div>
            <div class="w-full h-full rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="../../assets/image/Rectangle18.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="max-h-[392px] grid grid-cols-1 gap-5">
          <div class="w-full h-full rounded-xl overflow-hidden">
            <img
              class="w-full h-full object-cover"
              src="../../assets/image/Rectangle18.png"
              alt=""
            />
          </div>
          <div class="w-full h-full rounded-xl overflow-hidden">
            <img
              class="w-full h-full object-cover"
              src="../../assets/image/Rectangle18.png"
              alt=""
            />
          </div>
        </div>
      </div> -->
      <div class="carousel mt-8">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in announcement?.images" :key="item?.id">
            <div class="carousel-image">
              <img class="w-full h-full object-contain" :src="item?.image" alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div>
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
        />
      </div> -->
      <div class="body mt-[30px]">
        <div>
          <div>
            <p class="text-[20px] text-[var(--dark-3)]">
              {{ announcement?.description }}
            </p>
            <div class="mt-[30px]">
              <div class="flex justify-between w-full">
                <h4 class="text-[18px] font-600">Qulayliklar</h4>
                <div class="flex gap-4">
                  <el-tag type="success">Konditsioner</el-tag>
                  <el-tag type="success">Kir yuvish mashinasi</el-tag>
                  <el-tag type="success">Konditsioner</el-tag>
                </div>
              </div>
              <!-- <div class="grid grid-cols-4 mt-[18px] gap-[50px]">
                <ul class="flex flex-col gap-3" v-for="item in [1, 2, 3, 4]" :key="item">
                  <li
                    class="text-[12px] text-[var(--dark-5)] flex items-center gap-3"
                    v-for="item in [1, 2, 3, 4, 5]"
                    :key="item"
                  >
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.7161 7.02031C17.5783 7.0333 17.1564 7.07245 16.7784 7.10731C12.1146 7.53762 7.53785 9.52648 4.01588 12.6533C3.15829 13.4147 2.99752 13.6636 3.00003 14.2257C3.00228 14.7329 3.1452 15.0264 3.55856 15.3726C3.89926 15.658 4.286 15.7739 4.74633 15.7287C5.21192 15.683 5.38352 15.5836 6.08384 14.9541C9.88765 11.5353 15.0235 9.75007 20.1107 10.0784C24.6318 10.3702 28.6255 12.0096 31.8595 14.9013C32.5892 15.5538 32.8093 15.6851 33.2455 15.7279C33.7146 15.774 34.0984 15.6599 34.4414 15.3726C34.8548 15.0264 34.9977 14.7329 35 14.2257C35.0025 13.6578 34.8443 13.4183 33.9215 12.5926C30.5768 9.59978 26.4542 7.74196 21.8726 7.16285C20.9565 7.04706 18.373 6.95845 17.7161 7.02031ZM18.1545 13.127C14.5285 13.3294 11.1456 14.7603 8.50254 17.2097C7.97638 17.6972 7.84962 17.9094 7.80509 18.3766C7.70451 19.4322 8.80303 20.2793 9.84525 19.9499C10.0737 19.8777 10.3111 19.7216 10.6833 19.3985C13.1019 17.2994 15.8326 16.2809 19.0393 16.282C22.2048 16.2831 25.0563 17.3333 27.4217 19.3693C27.6639 19.5778 27.9697 19.8012 28.1012 19.8656C28.8364 20.2261 29.7185 19.9576 30.1475 19.2429C30.3932 18.8335 30.437 18.5235 30.3084 18.1027C30.2252 17.8304 30.1204 17.6812 29.7542 17.3139C28.475 16.0306 26.448 14.7675 24.5143 14.0486C23.2848 13.5915 21.5354 13.2169 20.3295 13.1526C19.9944 13.1347 19.5511 13.1114 19.3445 13.1008C19.1378 13.0903 18.6023 13.102 18.1545 13.127ZM18.6138 19.269C16.7197 19.3867 14.8299 20.2067 13.4372 21.5153C12.7908 22.1227 12.6573 22.3551 12.6237 22.9308C12.6039 23.2714 12.6263 23.4127 12.7395 23.6631C13.0123 24.2666 13.7626 24.6907 14.3834 24.5924C14.7822 24.5291 15.0786 24.3613 15.5931 23.9075C16.9463 22.7136 18.7422 22.2825 20.5431 22.7192C21.4447 22.9378 22.2324 23.3554 23.0668 24.0571C23.6479 24.5458 24.0228 24.6744 24.5648 24.5709C25.5936 24.3743 26.1455 23.3737 25.7625 22.3996C25.6604 22.14 25.5172 21.968 25.0266 21.5161C24.2929 20.8403 23.7763 20.4827 22.9673 20.0908C21.6104 19.4335 20.2129 19.1697 18.6138 19.269ZM18.3686 25.3296C17.3357 25.5861 16.4881 26.4001 16.2151 27.3975C15.7213 29.2011 17.1906 31.0032 19.1523 31C21.1261 30.9968 22.5938 29.2083 22.1007 27.4069C21.9555 26.8767 21.7119 26.4787 21.2826 26.0702C20.5014 25.3269 19.4526 25.0603 18.3686 25.3296Z"
                        fill="#D1D1D6"
                      /></svg
                    >Wifi
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
          <AppInfoTab class="mt-[30px]" :announcement="announcement" />
        </div>
        <AppSearch />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.body,
.gallery {
  display: grid;
  grid-template-columns: 1fr 393px;
  gap: 20px;
}
:deep(.el-carousel__item) .carousel-image {
  height: 400px;
}

:deep(.el-carousel__item:nth-child(2n)) {
  background-color: rgba(153, 169, 191, 0.7);
}

:deep(.el-carousel__item:nth-child(2n + 1)) {
  background-color: rgba(153, 169, 191, 0.7);
}
/* :deep(.el-carousel .is-active)  {
  background-color: transparent;

} */
</style>
