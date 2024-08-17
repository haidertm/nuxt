<template>
  <div class="bg-silver md:h-[46px] mp:h-[45px]">
    <div
        class="usp-bar-inner px-1 2md:px-[12px] py-[6.5px] container hidden md:flex justify-between"
        v-if="uspBars && uspBars.length > 0"
    >
      <div
          v-for="(content, index) in uspBars"
          :key="index"
          class="usp-content flex items-center"
          :class="{
          'justify-start': index === 0,
          'justify-center': index === 1,
          'justify-end': index === uspBars.length - 1,
        }"
          @click="navigateToLink(content.link)"
      >
        <NuxtImg :width="content.width" :height="content.height" :src="content.Icon" alt="usp" />
        <p class="font-gillSansRegular pt-1 md:pl-3 lg:pl-4 text-black text-base font-normal tab:text-xs mp:text-base">
          {{ content.title }}
        </p>
      </div>
    </div>
    <div class="usp-bar-inner px-6 py-1 container block md:hidden" v-if="uspBars && uspBars.length > 0">
      <carousel class="w-full" :slides-per-view="1" :wrap-around="true" :autoplay="3000">
        <slide
            v-for="(content, index) in uspBars"
            :key="index"
            @click="navigateToLink(content.link)"
            class="usp-content flex items-center w-full mp:justify-center py-0.5"
        >
          <NuxtImg
              :src="content.Icon"
              alt="usp"
              class="cursor-pointer"
              :width="content.width"
              :height="content.height"
              loading="lazy"
          />
          <p class="font-gillSansRegular pl-3 text-black text-sm font-normal hover:cursor-pointer">
            {{ content.title }}
          </p>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';

const symbol = 'AED'
const uspBars = computed(() => {
  return [
    {
      id: 1,
      Icon: '/images/content/tre_panel/uspbar/delivery.svg',
      title: `Free Delivery Over ${symbol} 1000`,
      link: '',
      width: 33,
      height: 33
    },
    {
      id: 2,
      Icon: '/images/content/tre_panel/uspbar/samples.svg',
      title: 'Totally Free Cut Samples',
      link: '',
      width: 40,
      height: 40
    },
    {
      id: 3,
      Icon: '/images/content/tre_panel/uspbar/call.svg',
      title: 'Friendly Expert Advice',
      link: '',
      width: 24,
      height: 24
    }
  ];
});
const navigateToLink = (url: string) => {
  const router = useRouter();
  router.push(url);
};
</script>
