<template>
  <NuxtLink
      :to="tile.Url"
      @click="cmsBlockClick(tile.Url, tile.Title)"
      class="focus-visible:outline-offset-0 focus-visible:outline-0 group"
  >
    <div class="flex flex-col relative">
      <div class="relative pb-[86%]">
        <NuxtImg
            class="absolute inset-0 w-full h-full object-cover mp:rounded-sm"
            :src="tile.Image.url"
            :alt="tile.Image.alt"
            :loading="loadingPrefix"
            quality="100"
            :height="imagesSizes?.height ?? ''"
            :width="imagesSizes?.width ?? ''"
        />
      </div>
      <div class="w-full left-0 bottom-0">
        <p
            class="font-gillSansBold text-center bg-black text-base lg:text-[20.885px] text-white xl:!pt-[32px] xl:!pb-[26px] 2md:py-[20px] tab:py-4 mp:py-4 group-hover:bg-[#E4AB2C] antialiased group-hover:text-black active:bg-[#E4AB2C] active:text-black"
        >
          {{ tile.Title }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts" setup>
import type { FamiliarPropertyData } from '~/components/Home/types';

// const { cmsBlockClick } = useGoogleTagManager();
const { isDesktop, isTablet } = useDevice();

const familiarImagesSizes = ref({ width: 455, height: 394 });
const imagesSizes = computed(() => {
  if (isTablet) {
    return (familiarImagesSizes.value = { width: 232, height: 232 });
  }
  return familiarImagesSizes.value;
});
const props = defineProps<FamiliarPropertyData>();
const loadingPrefix = computed<'lazy' | 'eager'>(() => {
  const maxIndex = isDesktop ? 2 : 0;
  return props.index && props.index <= maxIndex ? 'eager' : 'lazy';
});
</script>
