<template>
  <nav class="container 2md:pl-4 md:pr-0 relative" ref="floatingRef">
    <div class="flex justify-between" @mouseenter="handleMenuHover" tabindex="0" @blur="toggleIpadMenu(false, $event)">
      <div class="group/menu py-4 text-white text-lg flex gap-[15px]">
        <div
            class="flex gap-[50px] font-gillSansBold tab:text-[13px] cursor-pointer"
            @click="toggleIpadMenu(true, $event)"
        >
          <nuxt-link to="/wall-panels"> Browse All Panels</nuxt-link>
          <IconsArrow />
        </div>
        <div
            class="hidden 2lg:hidden group-hover/menu:flex absolute top-[99%] z-50 left-0 right-0 mac:px-[15px] px-2"
            ref="MegaMenu"
            @mouseleave="closeMenu"
        >
          <div
              class="flex justify-between tab:justify-around w-full border-2 border-[#E4E4E7] border-t-0 items-stretch bg-white py-4 2xl:py-[26px]"
          >
            <div
                v-for="(menuNode, index) in desktopNavigation"
                :key="index"
                :class="menuNode.title === 'By Room' ? '' : 'border-r border-[#E2E0E0]'"
            >
              <HeaderMegaNavDesktopMegaMenu :menu="menuNode" />
            </div>
          </div>
        </div>
      </div>
      <ul class="flex items-center justify-end gap-4">
        <li
            class="text-white tab:text-[13px] text-center text-lg cursor-pointer pt-4 pb-2.5 px-2 font-gillSansBold md:h-full md:p-0 md:hover:bg-[#E4AB2C] md:active:bg-[#E4AB2C] md:rounded-sm md:px-4 md:pt-1 1tab:py-2.5 tab:p-2"
        >
          <router-link to="/i/installation" class="h-full flex items-center antialiased"> Installation</router-link>
        </li>
        <li
            class="text-white tab:text-[13px] text-center text-lg cursor-pointer pt-4 pb-2.5 px-2 font-gillSansBold md:h-full md:p-0 md:hover:bg-[#E4AB2C] md:active:bg-[#E4AB2C] md:rounded-sm md:px-4 md:pt-1 1tab:py-2.5 tab:p-2"
        >
          <router-link to="/i/contact-us" class="h-full flex items-center antialiased"> Contact Us</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import type { NavItemInterface } from '~/composables/useNavigation/types';

const props = defineProps({
  navigation: {
    type: Array as () => NavItemInterface[],
    required: true
  }
});
const route = useRoute();
const MegaMenu = ref<HTMLElement | null>(null);

const desktopNavigation = computed(() => props.navigation?.[0]?.children);

import { useDisclosure } from '@storefront-ui/vue';

const { close } = useDisclosure();
const activeNode = ref<number | null>(null);

const closeMenu = () => {
  activeNode.value = null; // Reset activeNode
  close();
};

const singleMenu = ref<NavItemInterface | null>(null);

const handleMenuHover = () => {
  if (desktopNavigation.value && desktopNavigation.value.length > 0) {
    activeNode.value = 0;
    singleMenu.value = desktopNavigation.value[0];
  }
};

const toggleIpadMenu = (isOpen: boolean, event: any) => {
  if (isOpen) {
    MegaMenu.value?.classList.remove('hidden');
  } else {
    const megaMenu = MegaMenu.value;
    if (megaMenu && !megaMenu.contains(event.relatedTarget)) {
      MegaMenu.value?.classList.add('hidden');
    }
  }
};

watch(
    () => route.fullPath,
    async () => {
      MegaMenu.value?.classList.add('hidden');
      if (desktopNavigation.value && desktopNavigation.value.length > 0) {
        activeNode.value = 0;
        singleMenu.value = desktopNavigation.value[0];
      }
    }
);
</script>
