<template>
  <section class="mp:bg-silver-dark py-3 px-2 mp:px-9 mp:pb-3 tab:pb-6 xl:p-6 mp:h-[89px]">
    <div class="container">
      <div class="flex justify-between mp:flex-wrap items-center mp:gap-y-4 mp:gap-0 tab:gap-1">
        <p
            class="text-primary-medium text-xs md:text-base 2md:text-xl lg:!text-2xl xl:!text-[28px] mp:text-sm font-bold mp:order-3"
        >
          {{ trustPilotData.title }}
        </p>
        <NuxtImg
            v-if="trustPilotData.ratingImg"
            class="h-8 xl:h-auto w-auto mp:order-4 mp:w-[114px] mp:h-[23px]"
            :src="trustPilotData.ratingImg"
            loading="lazy"
            draggable="false"
            alt="trust pilot stars"
            preload
            height="50"
            width="250"
        />
        <p
            class="text-primary-medium text-xs md:text-base mp:mt-[5px] 2md:text-xl lg:!text-2xl xl:!text-[28px] small:text-xs font-bold mp:order-2"
        >
          {{ trustPilotData.ratingText }}
        </p>
        <NuxtImg
            v-if="trustPilotData.logo"
            class="mp:w-[102px] tab:w-[134px] mp:h-[26px]"
            :src="trustPilotData.logo"
            loading="lazy"
            draggable="false"
            alt="trust pilot logo"
            preload
            height="42"
            width="164"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
const trustPilotData = computed(() => {
  return {
    title: 'Our customers love us!',
    ratingText: '4.6 Out of 5 Rated Excellent!',
    logo: '/images/trust-pilot/tp_logo.svg',
    ratingImg: '/images/trust-pilot/rating-logo.svg'
  };
});
</script>
