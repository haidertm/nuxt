<template>
  <!-- Banner For Desktop -->
  <!--  <RenderCacheable :max-age="3600" :cache-key="cacheKeyDesktop">-->
  <HomeHeroDesktop :home-banners-desktop="homeBannersDesktop" />
  <!--  </RenderCacheable>-->

  <!-- Banner For Mobile -->
  <!--  <RenderCacheable :max-age="3600" :cache-key="cacheKeyMobile">-->
  <HomeHeroMobile :home-banners-mobile="homeBannersMobile" />
  <!--  </RenderCacheable>-->
</template>

<script setup lang="ts">
import { usePromotionalBanners } from '~/composables/usePromotionalBanners/usePromotionalBanners';

const { data: promotionalBanners, fetchPromotionalBanners } = usePromotionalBanners();
const $config = useRuntimeConfig();
fetchPromotionalBanners();
const isDateInRange = computed(
    () =>
        promotionalBanners.value?.getPromotionalBanners?.filter((banner) => {
          const today = new Date();

          const { start_date, end_date } = banner || null;
          const startDate = new Date(start_date);
          const endDate = new Date(end_date);

          endDate.setHours(23, 59, 59, 999);
          return today >= startDate && today <= endDate;
        })
);
const filterBanners = (viewStatusFilter: string[]) => {
  const bannersInRange = isDateInRange.value;

  return (
      promotionalBanners.value?.getPromotionalBanners?.filter((banner) => {
        const { store_id, status, banner_veiw_status, image, webp_image } = banner || {};
        const storeId = store_id.split(',');
        const viewStatus = (banner_veiw_status || '').toLowerCase();

        return (
            image &&
            webp_image &&
            storeId.includes('1') &&
            status === 1 &&
            bannersInRange?.includes(banner) &&
            viewStatusFilter.includes(viewStatus)
        );
      })
          .sort((a, b) => {
            return a.pm_order - b.pm_order;
          }) || []
  );
};

const homeBannersDesktop = computed(() => filterBanners(['desktop', 'both']));

const homeBannersMobile = computed(() => filterBanners(['mobile', 'both']));
</script>
