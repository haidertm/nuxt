<template>
  <div
      v-if="homeBannersDesktop && homeBannersDesktop.length > 0"
      :class="classes[configSite as ConfigType]['zoomClass']"
      @pointerdown="handleDown"
      @pointerup="handleUp"
      @pointercancel="handleUp"
  >
    <div class="banner-carousel relative" :class="classes[configSite as ConfigType]['div']">
      <div
          class="w-full h-full absolute -translate-x-2/4 -translate-y-2/4 -mb-1 left-2/4 top-2/4 hidden md:block trepanel-carousel"
      >
        <carousel
            :items-to-show="1"
            :transition="500"
            :autoplay="5000"
            :wrap-around="homeBannersDesktop && homeBannersDesktop.length > 0"
        >
          <slide
              v-for="(slide, index) in homeBannersDesktop"
              :key="index"
          >
            <HomeBannerImage
                v-if="slide.image"
                class="w-full cursor-pointer"
                alt="homeSlider image"
                :src="showJpg ? slide.image : slide.webp_image"
                :banner-type="`desktop`"
                :loading-strategy="index === 0 && isDesktop ? 'eager' : 'lazy'"
                :fetch-strategy="index === 0 ? 'high' : 'auto'"
            />
          </slide>
          <template #addons="{ slidesCount }">
            <pagination v-if="slidesCount > 1" />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import type { PromotionalBanner } from '~/composables/usePromotionalBanners/types';
import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination } from 'vue3-carousel';
// import type { GtmSupport } from '@gtm-support/vue-gtm';
import type { ConfigType } from '~/config/types';
// const { triggerGA4Event } = useGoogleTagManager();
// const { handleDown, handleUp, navigateToLink } = useBannersEvents();
const { isDesktop } = useDevice();
// const gtm: GtmSupport | undefined = useGtm();
// const { $IOSVersion } = useNuxtApp();
const showJpg = computed(() => {
  return false;
});

interface PropertyData {
  homeBannersDesktop: any[] | undefined;
}

defineProps<PropertyData>();
const {
  public: { configSite }
} = useRuntimeConfig();

const classes = ref({
  'bath-mountain': {
    div: 'md:pb-[23%]',
    zoomClass: ''
  },
  trepanel: {
    div: 'md:pb-[30.5%]',
    zoomClass: '2xl:max-w-[1912px] mx-auto'
  },
  'tile-mountain': {
    div: 'md:pb-[22%]',
    zoomClass: '2xl:max-w-[1912px] mx-auto'
  }
});
</script>
