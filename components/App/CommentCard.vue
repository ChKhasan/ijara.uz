<script setup>
const props = defineProps(["comment"]);
const { comment } = props;
</script>
<template>
  <div
    class="comment-card px-6 py-6 rounded-xl border border-solid border-[--input-stroke] flex flex-col gap-[18px]"
  >
    <div class="head flex justify-start gap-3">
      <div class="image h-[60px] w-[60px] overflow-hidden rounded-full">
        <img
          class="w-full h-full object-cover"
          src="../../assets/image/Rectangle1.png"
          alt=""
        />
      </div>
      <div class="info flex flex-col gap-1 justify-center">
        <h4 class="text-[--dark-5] font-600 text-[18px]">Eshonov Fakhriyor</h4>
        <p class="font-400 text-[--gray-5] text-[14px]">
          Sana:
          <span class="font-500 text-[--green]">{{
            $dayjs(comment.created).format("DD.MM.YYYY")
          }}</span>
        </p>
      </div>
    </div>
    <div class="body">
      <p class="text-[--dark-3] text-base font-400">
        {{ comment.comment }}
      </p>
    </div>
    <!-- <div class="footer flex justify-start">
      <div class="flex justify-start gap-2 items-center">
        <p class="text-[--gray-4] text-[14px] font-400">Bahosi:</p>
        <span
          class="rounded-[4px] bg-[--gray-1] h-[25px] flex justify-center items-center gap-1 text-black text-base px-2"
          >Juda yaxshi:
          <p
            class="text-white text-base px-1 h-[18px] flex justify-center items-center bg-[--green] rounded-[4px]"
          >
            8.7
          </p></span
        >
      </div>
    </div> -->
  </div>
</template>

<style lang="css" scoped>
.comment-card {
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.08);
}
</style>
