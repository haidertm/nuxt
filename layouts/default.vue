<template>
  <div class="unsupported-device absolute text-base top-0 z-10 md:w-full">
    <UnSupportedDevice />
  </div>
  <!--  <TMHeaderTopPromotionalBar />-->
  <Header :main-menu="mainMenuNavigation" />

  <USPBar v-if="shouldRender" :is-homepage="false" />
  <NuxtLink to="/test">Test Page</NuxtLink>
  <main>
    <slot />
  </main>
  <Footer />
  <!--  <TMUINotification />-->
  <!--  <NuxtLazyHydrate when-idle>-->
  <!--    <SfModal-->
  <!--        v-model="isSearchModalOpen"-->
  <!--        class="w-full h-full z-50"-->
  <!--        tag="section"-->
  <!--        role="dialog"-->
  <!--        aria-labelledby="search-modal-title"-->
  <!--    >-->
  <!--      <header class="mb-4">-->
  <!--        <uiSfButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose">-->
  <!--          <SfIconClose class="text-neutral-500" />-->
  <!--        </uiSfButton>-->
  <!--        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">-->
  <!--          {{ $t('search') }}-->
  <!--        </h3>-->
  <!--      </header>-->
  <!--      <UiSearch :close="searchModalClose" />-->
  <!--    </SfModal>-->
  <!--  </NuxtLazyHydrate>-->
</template>

<script setup lang="ts">
import Footer from '~/components/Footer/index.vue';
import Header from '~/components/Header/index.vue'
import { SfIconClose, SfModal, useDisclosure } from '@storefront-ui/vue';
// import type { DefaultLayoutProps } from '~/layouts/types';
// import type { ConfigType } from '~/config/types';
import type { Menu } from '~/mocks/menus/type';
import mainMenuNavigation from '~/mocks/menus/trepanelMenu';

const configSite = 'trepanel';


const { isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
// const { fetchMagentoCart } = useCart();
// const { fetchPromotionalMessages } = usePromotionalMessages();
const checkTrepanel = configSite === 'trepanel';
const route = useRoute();
// fetchPromotionalMessages();
// await fetchMagentoCart();

const shouldRender = computed(() => {
  const isHomePage = route.path === '/' || route.path === '/index';
  return !isHomePage
});
</script>
