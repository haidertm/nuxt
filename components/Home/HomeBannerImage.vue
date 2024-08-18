<template>
  <NuxtImg
      :src="src"
      alt="homeSlider image"
      class="banner-image"
      :width="dimensions.width"
      :height="dimensions.height ?? ''"
      :preload="shouldPreload"
      v-bind="loadingAttribute"
      :fetchpriority="fetchStrategy"
  />
</template>

<script setup lang="ts">
import type { ImageLoadingType } from '~/config/types';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
const defaultDimensionsMap: Record<DeviceType, {
  width: number;
  height: number
}> = {
  desktop: { width: 1900, height: 416 },
  tablet: { width: 1200, height: 416 },
  mobile: { width: 420, height: 420 }
};
const { isMobile } = useDevice();
const isPortrait = ref(false);

const siteDimensionsMap: Record<string, Record<DeviceType, {
  width: number;
  height: number | null
}>> = {
  trepanel: {
    desktop: { width: 1920, height: null },
    tablet: { width: 1200, height: 450 },
    mobile: { width: 420, height: 420 }
  }
};

interface Property {
  src: string;
  bannerType: DeviceType;
  loadingStrategy?: string;
  fetchStrategy?: string;
}

const props = defineProps<Property>();

const configSite = 'trepanel';

const dimensions = computed(() => {
  const updatedDimensions = { ...siteDimensionsMap[configSite] };
  const mobileWidthHeight = isPortrait.value ? 420 : 600;
  updatedDimensions.mobile = { width: mobileWidthHeight, height: mobileWidthHeight };
  return updatedDimensions[props.bannerType];
});

const shouldPreload = computed(() => props.loadingStrategy === 'eager');
const loadingAttribute = computed(() => {
  return props.loadingStrategy === 'lazy'
      ? { loading: 'lazy' as ImageLoadingType }
      : { loading: 'eager' as ImageLoadingType };
});

const checkOrientation = () => {
  isPortrait.value = window.matchMedia('(orientation: portrait)').matches;
  if (isMobile) {
    if (isPortrait.value) {
      dimensions.value.width = 420;
      dimensions.value.height = 420;
    } else {
      dimensions.value.width = 600;
      dimensions.value.height = 600;
    }
  }
};

onMounted(() => {
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation);
});
</script>
