<template>
  <div class="container 2md:my-20 md:my-10 flex mp:flex-col mp:p-0 mp:mt-4 mp:mb-0">
    <div class="overflow-hidden">
      <NuxtImg
        src="/images/content/tre_panel/home/home-video-desktop-img.webp"
        width="1050px"
        height="500px"
        class="4xs:hidden"
        loading="lazy"
        alt="shopNow"
      />
      <NuxtImg
        src="/images/content/tre_panel/home/home-video-mobile-img.webp"
        width="100vw"
        height="260px"
        class="4xs:!block hidden w-[100vw]"
        loading="lazy"
        alt="shopNow"
      />
    </div>
    <div class="bg-[#F4F4F5] flex flex-col justify-center 2lg:w-[28.5%] 2md:w-2/6 md:w-3/5 px-5 mp:py-7 mp:px-3.5">
      <h2 class="font-gillSansRegular 2md:text-[28px] md:text-[18px] font-normal mp:text-2xl">
        {{ computedData.heading }}
      </h2>
      <p
        class="font-gillSansRegular 2md:text-base md:text-sm font-normal md:py-2 2md:py-6 mp:py-4"
        v-text="computedData.content"
      />
      <uiSfButton
        :tag="NuxtLink"
        to="/wall-panels/"
        class="font-gillSansBold 2md:text-sm md:text-xs mp:text-xs flex 2lg:!w-[190px] 2md:!w-[150px] md:!w-[120px] md:!h-[45px] mp:!h-[40px] 2md:!h-[50px] !justify-center !items-center gap-4 md:py-2 2md:py-4 !bg-[#E4AB2C] !text-black mp:max-w-[170px]"
      >
        {{ computedData.btnTitle }}
      </uiSfButton>
    </div>
  </div>
</template>
<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink');

const computedData = computed(() => {
  return {
    heading: 'Acoustic Wood Panels',
    content:
      'Trepanel represent a beautiful range of minimalistic wood panels for your bedroom, kitchen, hallway, office and dining room.',
    btnTitle: 'SHOP NOW',
    imgUrl: '/images/style-and-advice/style-and-advice-image.webp',
  };
});
</script>
