<script setup>
import likeApi from "@/api/likeApi";
import { useLikes } from "@/store/like";
import { useAuthHandle } from "@/store/auth";

const likesConfig = useLikes();
const authConfig = useAuthHandle();
const props = defineProps(["announcement"]);

// const props = defineProps({
//   announcement: {
//     type: Object,
//     required: true,
//   },
// });
// const { announcement } = props;

function addLike(id) {
  authConfig.auth ? __chek_likes(id) : likesConfig.likeHandle(id);
}
function __chek_likes(id) {
  const data = {
    announcement: id,
  };
  likesConfig.likes.includes(id) ? __DELETE_LIKE({ id: id }) : __POST_LIKE(data);
}
async function __POST_LIKE(data) {
  try {
    await likeApi.postLike(data);
    __GET_LIKE();
  } catch (e) {
    console.log(e);
  }
}
async function __DELETE_LIKE(data) {
  try {
    await likeApi.deleteLike(data);
    __GET_LIKE();
  } catch (e) {
    console.log(e);
  }
}
async function __GET_LIKE() {
  try {
    const data = await likeApi.getLike();
    console.log("userIds", data?.data);
    const userLikes = data?.data.map((item) => item.announcement?.id);
    console.log("userId", userLikes);
    likesConfig.handleUserLikes(userLikes);
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="card bg-white">
    <div class="image relative cursor-pointer h-[262px] rounded-[8px] overflow-hidden">
      <img
        v-if="announcement.images[0]?.image"
        class="w-full h-full object-cover"
        :src="announcement.images[0]?.image"
        alt=""
      />
      <img
        v-else
        class="w-full h-full object-cover"
        src="../../assets/image/Rectangle18.png"
        alt=""
      />
      <div class="absolute top-[18px] right-[18px]" @click="addLike(announcement?.id)">
        <svg
          v-if="likesConfig.likes.includes(announcement?.id)"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect width="32" height="32" rx="4" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.79688 12.729C4.79688 9.15318 7.82937 6.3999 11.3889 6.3999C13.2237 6.3999 14.8382 7.28991 15.9969 8.44149C17.1555 7.28991 18.77 6.3999 20.6049 6.3999C24.1644 6.3999 27.1969 9.15318 27.1969 12.729C27.1969 15.1957 26.0803 17.2726 24.6004 18.993C23.1256 20.7075 21.223 22.1465 19.5028 23.351L16.535 25.4292C16.21 25.6568 15.7838 25.6568 15.4588 25.4292L12.4909 23.351C10.7708 22.1465 8.86812 20.7075 7.39334 18.993C5.91348 17.2726 4.79688 15.1957 4.79688 12.729ZM12.3969 14.3999C11.7341 14.3999 11.1969 14.9372 11.1969 15.5999C11.1969 16.2626 11.7341 16.7999 12.3969 16.7999H19.5969C20.2596 16.7999 20.7969 16.2626 20.7969 15.5999C20.7969 14.9372 20.2596 14.3999 19.5969 14.3999H12.3969Z"
            fill="#00A000"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect width="32" height="32" rx="4" fill="#00A000" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.6115 6.66663C8.22147 6.66663 5.33337 9.34343 5.33337 12.8199C5.33337 15.2014 6.29506 17.2956 7.6274 19.0658C8.95744 20.8331 10.6972 22.3329 12.363 23.5516C12.9993 24.0171 13.643 24.4464 14.2321 24.7633C14.7853 25.0608 15.4214 25.3333 16 25.3333C16.5787 25.3333 17.2148 25.0608 17.768 24.7633C18.3571 24.4464 19.0007 24.0171 19.6371 23.5516C21.3029 22.3329 23.0426 20.8331 24.3727 19.0658C25.705 17.2956 26.6667 15.2014 26.6667 12.8199C26.6667 9.34343 23.7787 6.66663 20.3886 6.66663C18.6411 6.66663 17.1035 7.53191 16 8.65151C14.8966 7.53191 13.3589 6.66663 11.6115 6.66663ZM7.16195 12.8199C7.16195 10.5662 9.07676 8.59766 11.6115 8.59766C13.0672 8.59766 14.4265 9.51609 15.2752 10.6818C15.4483 10.9195 15.7161 11.0588 16 11.0588C16.284 11.0588 16.5518 10.9195 16.7249 10.6818C17.5736 9.51609 18.9328 8.59766 20.3886 8.59766C22.9233 8.59766 24.8381 10.5662 24.8381 12.8199C24.8381 14.6267 24.1118 16.3089 22.9412 17.8643C21.7682 19.4228 20.19 20.7978 18.5958 21.9643C17.9925 22.4056 17.4243 22.7811 16.9381 23.0426C16.4162 23.3232 16.1138 23.4023 16 23.4023C15.8863 23.4023 15.5839 23.3232 15.062 23.0426C14.5758 22.7811 14.0076 22.4056 13.4044 21.9643C11.8101 20.7978 10.2318 19.4228 9.05889 17.8643C7.88824 16.3089 7.16195 14.6267 7.16195 12.8199Z"
            fill="white"
          />
        </svg>
      </div>
      <div
        class="absolute bottom-[18px] left-[18px] px-[5px] py-[4px] rounded-[4px] bg-[color:#000000cc]"
      >
        <p class="text-white font-500 text-[16px] flex gap-[4px] items-center">
          Juda yaxshi:
          <span
            class="rounded-[4px] h-[24px] w-[24px] flex items-center font-400 justify-center bg-[color:#00a00080]"
            >8.7</span
          >
        </p>
      </div>
      <div
        class="absolute top-[18px] left-[18px] px-[5px] py-[4px] flex rounded-[4px] bg-[color:#000000cc]"
      >
        <p class="text-white font-500 text-[16px] flex gap-[4px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.93751 7.5C5.93751 5.53249 7.5325 3.9375 9.50002 3.9375C11.4675 3.9375 13.0625 5.53249 13.0625 7.5C13.0625 9.46755 11.4675 11.0625 9.50002 11.0625C7.5325 11.0625 5.93751 9.46755 5.93751 7.5ZM9.50002 5.0625C8.15385 5.0625 7.06251 6.1538 7.06251 7.5C7.06251 8.84618 8.15385 9.9375 9.50002 9.9375C10.8462 9.9375 11.9375 8.84618 11.9375 7.5C11.9375 6.1538 10.8462 5.0625 9.50002 5.0625Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.14329 6.64264C3.40904 3.41868 6.10315 0.9375 9.33802 0.9375H9.66202C12.8969 0.9375 15.591 3.41868 15.8567 6.64264C15.9995 8.3745 15.4645 10.0942 14.3645 11.4394L10.7698 15.8358C10.1135 16.6384 8.88652 16.6384 8.23027 15.8358L4.63549 11.4394C3.5355 10.0942 3.00054 8.3745 3.14329 6.64264ZM9.33802 2.0625C6.68864 2.0625 4.48213 4.09461 4.26449 6.73506C4.14567 8.17642 4.59091 9.60765 5.50641 10.7273L9.10117 15.1237C9.30735 15.3757 9.6927 15.3757 9.89887 15.1237L13.4936 10.7273C14.4091 9.60765 14.8543 8.17642 14.7355 6.73506C14.5179 4.09461 12.3114 2.0625 9.66202 2.0625H9.33802Z"
              fill="white"
            /></svg
          >Tashkent
        </p>
      </div>
    </div>
    <div class="body">
      <h3
        class="cursor-pointer"
        @click="$router.push(`/announcements/${announcement?.id}`)"
      >
        {{ announcement?.title }}
      </h3>
      <span class="location flex gap-[12px] items-center mt-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.25 10C7.25 7.37665 9.37665 5.25 12 5.25C14.6233 5.25 16.75 7.37665 16.75 10C16.75 12.6234 14.6233 14.75 12 14.75C9.37665 14.75 7.25 12.6234 7.25 10ZM12 6.75C10.2051 6.75 8.75 8.20507 8.75 10C8.75 11.7949 10.2051 13.25 12 13.25C13.7949 13.25 15.25 11.7949 15.25 10C15.25 8.20507 13.7949 6.75 12 6.75Z"
            fill="#D1D1D6"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.52439 8.85685C3.87872 4.55824 7.47087 1.25 11.784 1.25H12.216C16.5292 1.25 20.1213 4.55824 20.4756 8.85685C20.666 11.166 19.9527 13.4589 18.486 15.2526L13.693 21.1144C12.818 22.1845 11.182 22.1845 10.307 21.1144L5.51399 15.2526C4.04733 13.4589 3.33405 11.166 3.52439 8.85685ZM11.784 2.75C8.25152 2.75 5.30951 5.45948 5.01932 8.98008C4.8609 10.9019 5.45455 12.8102 6.67521 14.3031L11.4682 20.1649C11.7431 20.501 12.2569 20.501 12.5318 20.1649L17.3248 14.3031C18.5455 12.8102 19.1391 10.9019 18.9807 8.98008C18.6905 5.45948 15.7485 2.75 12.216 2.75H11.784Z"
            fill="#D1D1D6"
          />
        </svg>
        <p class="flex gap-[12px]">
          {{ announcement?.address }}
        </p>
      </span>
      <div class="flex justify-between mt-[24px]">
        <span class="text-[color:var(--gray-6)] flex items-center gap-[8px] text-[16px]"
          >Yulduzi:
          <p class="flex items-center gap-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.865 2.99616C12.4797 2.33201 11.5205 2.33201 11.1352 2.99616L8.42107 7.67347C8.2307 8.00155 7.90165 8.22545 7.52659 8.28209L2.44027 9.05032C1.58599 9.17935 1.28633 10.2579 1.95164 10.8091L5.74073 13.9483C6.09147 14.2389 6.25639 14.6973 6.17119 15.1447L5.18002 20.3499C5.02333 21.1727 5.88712 21.812 6.62827 21.4218L11.4177 18.8999C11.7822 18.708 12.2179 18.708 12.5825 18.8999L17.3719 21.4218C18.113 21.812 18.9768 21.1727 18.8201 20.3499L17.829 15.1447C17.7438 14.6973 17.9087 14.2389 18.2594 13.9483L22.0485 10.8091C22.7138 10.2579 22.4142 9.17935 21.5599 9.05032L16.4736 8.28209C16.0985 8.22545 15.7695 8.00155 15.5791 7.67347L12.865 2.99616Z"
                fill="#D7C30F"
              /></svg
            >{{ announcement?.appartment_status / 2 }}
          </p>
        </span>
        <p class="flex items-center gap-[8px] text-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.25016 4.0645C4.17496 4.10254 4.10243 4.17426 4.06147 4.25115C3.99613 4.3738 3.99509 4.41572 4.00394 6.57317C4.01279 8.73184 4.01417 8.77279 4.08176 8.91264C4.18231 9.12075 4.33574 9.27231 4.54602 9.37118L4.73164 9.45846H6.44667H8.16171L8.34733 9.37118C8.55761 9.27231 8.71104 9.12075 8.81159 8.91264C8.87918 8.77279 8.88055 8.73184 8.88941 6.57317C8.89826 4.41487 8.89725 4.37387 8.83181 4.25103C8.75701 4.11061 8.56966 4 8.40671 4C8.24462 4 8.05642 4.11064 7.98246 4.24943C7.91909 4.36842 7.9167 4.43101 7.9167 5.98506V7.59726H7.42669H6.93668V5.98506C6.93668 4.43101 6.9343 4.36842 6.87093 4.24943C6.79697 4.11064 6.60877 4 6.44667 4C6.28458 4 6.09638 4.11064 6.02242 4.24943C5.95905 4.36842 5.95666 4.43101 5.95666 5.98506V7.59726H5.46665H4.97664V5.98506C4.97664 4.43101 4.97426 4.36842 4.91089 4.24943C4.79034 4.02318 4.49526 3.9406 4.25016 4.0645ZM12.4085 4.02981C11.8308 4.16776 11.2494 4.79962 10.8408 5.73354C10.5224 6.46115 10.3883 7.04751 10.3857 7.72239C10.3837 8.25193 10.4373 8.51675 10.6158 8.85815C11.0415 9.67238 12.0457 10.0815 13.1613 9.89526C14.0302 9.75018 14.6071 9.25679 14.8496 8.45119C14.9537 8.10542 14.9521 7.38446 14.8462 6.90909C14.4318 5.04956 13.3734 3.79937 12.4085 4.02981ZM17.6386 4.07088C17.5686 4.10933 17.4841 4.18981 17.4508 4.24974C17.3926 4.35453 17.3902 4.54538 17.3902 9.18425V14.0098H18.5022C19.5522 14.0098 19.6214 14.0063 19.7431 13.9468C19.8267 13.906 19.8955 13.8398 19.9387 13.7587C20.0049 13.6344 20.0054 13.6063 19.9951 9.95069C19.9857 6.57648 19.9801 6.25114 19.9284 6.06855C19.7815 5.55045 19.548 5.1418 19.1895 4.77519C18.9012 4.48034 18.6464 4.30023 18.2732 4.12741C17.9576 3.98126 17.8236 3.96935 17.6386 4.07088ZM5.4744 14.8622L5.48299 19.3118L5.57413 19.4896C5.74622 19.8251 6.04372 19.9987 6.44667 19.9987C6.84963 19.9987 7.14713 19.8251 7.31922 19.4896L7.41036 19.3118L7.41895 14.8622L7.42758 10.4125H6.44667H5.46577L5.4744 14.8622ZM11.6812 15.0379L11.6898 19.3118L11.7809 19.4896C11.953 19.8251 12.2505 19.9987 12.6535 19.9987C13.0564 19.9987 13.3539 19.8251 13.526 19.4896L13.6172 19.3118L13.6258 15.0379L13.6344 10.764L13.4134 10.8128C13.2611 10.8464 13.0251 10.8615 12.6535 10.8615C12.2818 10.8615 12.0459 10.8464 11.8935 10.8128L11.6725 10.764L11.6812 15.0379ZM17.3975 17.13C17.4064 19.2731 17.4078 19.3144 17.4754 19.4542C17.5759 19.6623 17.7294 19.8138 17.9396 19.9127C18.0927 19.9847 18.1682 20 18.3703 20C18.7786 20 19.0945 19.8073 19.2651 19.4542C19.3327 19.3144 19.3341 19.2731 19.343 17.13L19.352 14.9482H18.3703H17.3885L17.3975 17.13Z"
              fill="#AEAEB2"
            /></svg
          >Noshushta<svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0274 4.77265C15.291 5.03625 15.291 5.46364 15.0274 5.72725L8.72737 12.0272C8.46376 12.2908 8.03644 12.2908 7.7728 12.0272L4.1728 8.42722C3.9092 8.16361 3.9092 7.73629 4.1728 7.47268C4.4364 7.20907 4.86379 7.20907 5.12739 7.47268L8.2501 10.5953L14.0728 4.77265C14.3364 4.50905 14.7638 4.50905 15.0274 4.77265Z"
              fill="#00A000"
            />
          </svg>
        </p>
      </div>
      <div class="flex flex-col gap-[8px] mt-[18px]">
        <div class="flex gap-[8px] items-center">
          <h6 class="flex text-[20px] gap-[4px]">
            <span class="text-[color:var(--green)] font-500"
              >{{ announcement?.total_price }}
            </span>
            UZS dan
          </h6>
          <h6 class="text-[color:var(--gray-4)] text-[14px] font-500 line-through">
            1 000 000 UZS
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  border-radius: 18px;
  box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.08);
  padding: 24px;
}
.image {
  margin-bottom: 24px;
}
.body h3 {
  font-family: var(--semiBold);
  font-size: 25px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
}
.body .location p {
  -webkit-line-clamp: 1;
  font-size: 16px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 8px;
  overflow: hidden;
}
.like {
  position: absolute;
  color: #000000cc;
  background: #00a00080;
}
</style>
