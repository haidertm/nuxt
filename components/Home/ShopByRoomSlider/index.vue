<template>
  <div class="px-4 mp:px-2 2xl:max-w-[1912px] mx-auto">
    <span
      class="md:mt-[45px] md:mb-[35px] block mp:mt-[19px] mp:mb-[13px] text-[28px] mp:text-lg not-italic antialiased font-gillSansBold leading-[normal] text-[#000] text-center mp:text-start mt-[45px] mb-[35px] mp:mt-[19px] mp:mb-[13px]"
    >
      Shop By Room
    </span>

    <SfScrollable
      class="items-center snap-x snap-mandatory w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mp:gap-3 gap-[15px]"
      drag
      wrapper-class="ShopRoomSlider"
    >
      <div v-for="(panel, index) in ShopRoomData" :key="index" class="shrink-0 cursor-pointer">
        <NuxtLink :to="panel.Url">
          <div class="flex flex-col flex-auto shrink-0 py-0">
            <div class="w-full">
              <NuxtImg
                :src="panel.Image.url"
                :alt="panel.alt"
                class="object-cover aspect-square w-full h-full md:w-[300px] rounded-t-[5px]"
                loading="lazy"
                :width="isMobile ? 130 : 300"
                :height="isMobile ? 130 : 300"
              />
            </div>
            <p
              class="mt-5 mp:mt-1 text-[26px] mp:text-base font-gillSansRegular not-italic font-normal leading-[normal] text-[#000] text-center"
            >
              {{ panel.Title }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </SfScrollable>
  </div>
</template>
<script lang="ts" setup>
import { SfScrollable } from '@storefront-ui/vue';

const { isMobile } = useDevice();
const ShopRoomData = computed(() => {
  return [
    {
      id: 1,
      Title: 'Bedroom',
      alt: 'bedroom design',
      Url: '/wall-panels/bedroom',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/Bedroom.webp',
      },
    },
    {
      id: 2,
      Title: 'Living Room',
      alt: 'living room design',
      Url: '/wall-panels/living-room',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/LivingRoom.webp',
      },
    },
    {
      id: 3,
      Title: 'Kitchen',
      alt: 'Kitchen design',
      Url: '/wall-panels/kitchen',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/Kitchen.webp',
      },
    },
    {
      id: 4,
      Title: 'Hallway',
      alt: 'Hallway design',
      Url: '/wall-panels/hallway',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/Hallway.webp',
      },
    },
    {
      id: 5,
      Title: 'Office',
      alt: 'Office design',
      Url: '/wall-panels/office',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/Office.webp',
      },
    },
    {
      id: 6,
      Title: 'Dining Room',
      alt: 'dining room design',
      Url: '/wall-panels/dinning-room',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/DiningRoom.webp',
      },
    },
    {
      id: 7,
      Title: 'Media Wall',
      alt: 'media wall design',
      Url: '/wall-panels/media-wall',
      Image: {
        url: '/images/content/trepanel/ShopByRoomSlider/media-wall.webp',
      },
    },
  ];
});
</script>
