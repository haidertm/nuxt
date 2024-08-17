<template>
  <div class="flex gap-[6px] md:gap-2.5 lg:gap-4 mp:w-full justify-between">
    <a
        v-for="(social, index) in socialMediaLinks"
        :key="index"
        :href="social.url"
        :aria-label="social.ariaLabel"
        target="_blank"
        rel="noopener"
        class="text-white focus-visible:outline-offset-0 focus-visible:outline-0"
    >
      <div
          :class="[
          'flex justify-center items-center bg-white rounded-full social-icon h-10 w-10 md:h-[30px] md:w-[30px] lg:h-[42px] lg:w-[42px] xl:h-10 xl:w-10 mp:w-11 mp:h-11 group',
          social.url.includes('twitter.com') ? 'border border-solid border-white' : '',
        ]"
          :style="{ '--hover-bg-color': social.hoverColor }"
      >
        <span class="flex">
          <NuxtImg
              :src="social.imgSrc"
              :alt="social.altText"
              class="w-6 h-6 tab:w-4 tab:h-4 mp:w-[18px] mp:h-[18px] group-hover:filter group-hover:invert group-hover:brightness-200 trepanel-social-media"
              width="55"
              height="32"
              loading="lazy"
          />
        </span>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
const socialMediaLinks = [
  {
    url: 'https://www.facebook.com/profile.php?id=61560684358469',
    ariaLabel: 'Facebook',
    imgSrc: '/images/trepanel/socialMedia/facebook.svg',
    altText: 'facebook',
    hoverColor: '#1877F2'
  },
  {
    url: 'https://x.com/trepanel_uae',
    ariaLabel: 'Twitter',
    imgSrc: '/images/trepanel/socialMedia/twitter.svg',
    altText: 'X',
    hoverColor: '#000000'
  },
  {
    url: 'https://www.instagram.com/trepanel_uae/',
    ariaLabel: 'Instagram',
    imgSrc: '/images/trepanel/socialMedia/instagram.svg',
    altText: 'instagram',
    hoverColor: '#E1306C'
  },
  {
    url: 'https://www.youtube.com/@TrepanelAE-zp8xg',
    ariaLabel: 'Youtube',
    imgSrc: '/images/trepanel/socialMedia/youtube.svg',
    altText: 'youtube',
    hoverColor: '#CD201F'
  },
  {
    url: 'https://www.tiktok.com/@trepanel_uae',
    ariaLabel: 'Tiktok',
    imgSrc: '/images/trepanel/socialMedia/tiktok.svg',
    altText: 'tiktok',
    hoverColor: '#FF5656'
  },
  {
    url: 'https://www.pinterest.co.uk/trepanelae/',
    ariaLabel: 'Pinterest',
    imgSrc: '/images/trepanel/socialMedia/pinterest.svg',
    altText: 'pinterest',
    hoverColor: '#BD081C'
  }
];
</script>
