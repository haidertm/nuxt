<template>
  <header ref="referenceRef" class="relative bg-white mp:border-b border-[#E4E4E7]">
    <div
        class="container md:h-[78px] lg:h-[100px] flex justify-between items-center gap-0 md:gap-5 2md:gap-10 flex-wrap md:flex-nowrap md:z-10 py-2 md:py-0 mp:px-2 2md:px-4"
    >
      <div class="flex gap-2.5 md:gap-0 items-center">
        <SFButton
            variant="tertiary"
            square
            aria-label="Close menu"
            class="block !p-0 md:hidden bg-white hover:text-transparent active:bg-transparent active:text-transparent focus-visible:outline-0"
            @click="
            hideSearch();
            openMenu();
            isOpen = !isOpen;
          "
        >
          <IconsMenu />
        </SFButton>
        <NuxtLink :to="paths.home" aria-label="Sf Homepage" class="flex items-center">
          <IconsLogo class="1tab:max-w-[175px] mp:w-[160px] mp:h-9 small:w-[144px]" />
        </NuxtLink>
      </div>
      <HeaderSearch class="hidden md:max-w-[290px] 2md:max-w-[480px] 1tab:max-w-[350px] flex-[100%] md:flex" />
      <HeaderTopHeaderNav />
      <div
          id="search-mobile"
          class="absolute z-[999] top-[73%] left-0 items-center justify-between w-full flex-[100%] hidden"
      >
        <HeaderSearch class="flex flex-[100%] my-2" />
      </div>
    </div>
    <HeaderMegaNav
        v-if="mainMenu"
        :is-open="isOpen"
        :navigation="mainMenu"
        @back-to-top="isBackToTop = $event"
        @toggle-open="isOpen = $event"
    />

    <!--    back to top scroll button-->
    <HeaderBackToTop v-if="isBackToTop" />
    <!--    whatsapp chat button -->
    <HeaderWhatsappIcon />
  </header>
</template>

<script lang="ts" setup>
import { useDisclosure, useDropdown, useTrapFocus } from '@storefront-ui/vue';

const NuxtLink = resolveComponent('NuxtLink');
import type { Menu } from '~/mocks/menus/type';
import { useZindexEmits } from '~/composables/useZindexEmits';

const { isMenuOpen, openMenu } = useZindexEmits();

const { close, isOpen } = useDisclosure();
const isModalOpened = useState<boolean>('isModalOpened');
// const { homePageTracking, cmsPageTracking } = useSmileSuiteTracking();

const props = defineProps<{
  mainMenu: Menu[];
}>();

watch(isMenuOpen, (newValue) => {
  if (!newValue) {
    close();
  }
});

const { referenceRef } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: []
});

const hideSearch = () => {
  document.querySelector('#search-mobile')?.classList.remove('mp:flex');
};
const drawerReference = ref();
const megaMenuReference = ref();
const isBackToTop = ref(false);

const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container'
} as const;
useTrapFocus(
    computed(() => megaMenuReference.value?.[0]),
    trapFocusOptions
);
useTrapFocus(drawerReference, trapFocusOptions);

watch(isOpen, (currentValue) => {
  if (import.meta.client) {
    isModalOpened.value = !!currentValue;
  }
});
// const route = useRoute();
onMounted(() => {
  console.log('mainMenu', props.mainMenu);
  // if (route && route.fullPath === '/') {
  //   homePageTracking();
  // } else if (route && route.fullPath.includes('/i/')) {
  //   cmsPageTracking();
  // }
});
// watch(
//     () => route.fullPath,
//     async () => {
//       if (route && route.fullPath === '/') {
//         homePageTracking();
//       } else if (route && route.fullPath.includes('/i/')) {
//         cmsPageTracking();
//       }
//     }
// );
</script>
