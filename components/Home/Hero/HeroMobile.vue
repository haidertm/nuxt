<template>
  <div
      class="banner-carousel__mobile relative"
      :class="classes[configSite as ConfigType]['div']"
      v-if="homeBannersMobile && homeBannersMobile.length > 0"
      @pointerdown="handleDown"
      @pointerup="handleUp"
      @pointercancel="handleUp"
  >
    <!--    For Mobile -->
    <div class="w-full h-full absolute -translate-x-2/4 -translate-y-2/4 -mb-1 left-2/4 top-2/4 hidden mp:block">
      <carousel :items-to-show="1" :autoplay="3000" :wrap-around="homeBannersMobile && homeBannersMobile.length > 1">
        <slide
            v-for="(slide, index) in homeBannersMobile"
            :key="index"
        >
          <HomeBannerImage
              class="w-full cursor-pointer"
              :src="showJpg ? slide.image : slide.webp_image"
              :banner-type="`mobile`"
              :loading-strategy="index === 0 && isMobile ? 'eager' : 'lazy'"
              :fetch-strategy="index === 0 ? 'high' : 'auto'"
          />
        </slide>
        <template #addons="{ slidesCount }">
          <navigation v-if="slidesCount > 1" class="md:!hidden" />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConfigType } from '~/config/types';
import { useBannersEvents } from '~/composables/useBannersEvents';

const { handleDown, handleUp, navigateToLink } = useBannersEvents();
const { isMobile } = useDevice();

// const gtm: GtmSupport | undefined = useGtm();

interface PropertyData {
  homeBannersMobile: any[] | undefined;
}

defineProps<PropertyData>();
const { $IOSVersion } = useNuxtApp();

const showJpg = computed(() => {
  return false
});


const {
  public: { configSite }
} = useRuntimeConfig();

const defaultClasses = {
  div: ' mp:pb-[100%]'
};
const classes = ref({
  'bath-mountain': {
    div: 'mp:pb-[41.5%]'
  },
  trepanel: {
    div: 'mp:pb-[103.5%]'
  },
  'tile-mountain': defaultClasses
});
</script>
