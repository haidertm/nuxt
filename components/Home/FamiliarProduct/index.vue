<template>
  <div class="px-4 mp:px-2 2xl:max-w-[1912px] mx-auto">
    <h1
      class="font-gillSansBold 2lg:text-[32px] md:text-[26px] flex justify-center px-0 pt-[47px] pb-[33px] mp:pt-[19px] mp:pb-[13px] mp:text-base"
    >
      Unlock Your Dream Home....
    </h1>
    <div
      class="grid grid-cols-1 tablet-range:grid-cols-1 md:grid-cols-2 2md:grid-cols-4 mx-0 flex-wrap mp:gap-y-2 tab:gap-4 2md:!gap-4 tablet-range:justify-center tablet-range:gap-0"
    >
      <div
        class="w-full flex-1 tablet-range:p-[10px] px-4 md:p-0 mp:px-0"
        v-for="(tile, index) in FamiliarBrandsData"
        :key="'tile_' + index"
      >
        <TrepanelHomeFamiliarProductTile :index="tile.id" :tile="tile" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const FamiliarBrandsData = computed(() => {
  return [
    {
      id: 1,
      Title: 'Standard Panels',
      Url: '/wall-panels/standard-slat',
      Background: null,
      Image: {
        url: '/images/content/tre_panel/familiar-brands/standard.webp',
        alt: 'Standard Wall Panels',
      },
    },
    {
      id: 2,
      Title: 'Multi - Width Panels',
      Url: '/wall-panels/multi-width-slat',
      Background: '#E4AB2C',
      Image: {
        url: '/images/content/tre_panel/familiar-brands/multi-width.webp',
        alt: 'Multi Width Wall Panels',
      },
    },
    {
      id: 3,
      Title: 'Curved Panels',
      Url: 'wall-panels/curved-slat',
      Background: null,
      Image: {
        url: '/images/content/tre_panel/familiar-brands/curved.webp',
        alt: 'Curved Wall Panels',
      },
    },
    {
      id: 4,
      Title: 'Wide Slat Panels',
      Url: 'wall-panels/wide-slat',
      Background: null,
      Image: {
        url: '/images/content/tre_panel/familiar-brands/wideSlat.webp',
        alt: 'Wide Slat Wall Panels',
      },
    },
  ];
});
</script>
