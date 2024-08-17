<template>
  <div>
    <!-- Mobile drawer -->
    <div
        v-if="isOpen"
        @click="emitToggleOpen(false)"
        class="md:hidden absolute h-screen inset-0 bg-neutral-500 bg-opacity-50 top-[89%] z-50"
    />
    <transition
        :enter-from-class="mobileMenuDrawer.enterFromClass"
        :enter-to-class="mobileMenuDrawer.enterToClass"
        :leave-from-class="mobileMenuDrawer.leaveFromClass"
        :leave-to-class="mobileMenuDrawer.leaveToClass"
    >
      <SfDrawer
          ref="drawerReference"
          v-if="isOpen"
          :model-value="true"
          :placement="placement"
          class="duration-300 ease-in-out translate-x md:hidden top-[89%] !absolute focus-visible:outline-0 right-[50px] min-h-min max-w-[308px] bg-white overflow-y-auto z-50 border-t-black border-t border-solid !bottom-auto"
      >
        <nav>
          <ul v-if="activeMenu" class="max-h-[525px] overflow-y-auto">
            <template v-for="node in activeMenu.children" :key="node._path">
              <li
                  class="font-gillSansRegular"
                  :style="node.backgroundColor ? { backgroundColor: node.backgroundColor } : ''"
                  @click="toggleSubmenu(node._path)"
              >
                <SFListItem
                    size="lg"
                    class="hover:!bg-transparent py-3"
                    :class="{ ' bg-black': openSubmenus[node._path] }"
                >
                  <div class="flex items-center px-4">
                    <div
                        class="flex items-center flex-auto"
                        @click="node.slug ? closeMenu() : toggleSubmenu(node._path)"
                    >
                      <div class="w-full" v-if="node.slug">
                        <span
                            class="text-left text-[#000]"
                            :class="[
                            { 'text-white': node.backgroundColor },
                            node.children ? 'font-gillSansBold text-sm' : 'font-gillSansRegular text-base',
                            { '!text-white': openSubmenus[node._path] },
                          ]"
                        >{{ node.titleMobile }}</span
                        >
                      </div>
                    </div>
                    <IconsChevronDown
                        v-if="node.children?.length ?? 0 > 0"
                        :class="[openSubmenus[node._path] ? 'transform rotate-180 fill-white' : 'fill-black']"
                    />
                  </div>
                </SFListItem>
                <ul :class="['collapsible', { open: openSubmenus[node._path] }]" v-if="node.children?.length">
                  <div v-if="node?.banner?.imageMobile">
                    <NuxtImg
                        :src="node.banner.imageMobile"
                        width="308"
                        height="170"
                        :alt="node.banner.title"
                        class="w-full"
                        loading="lazy"
                    />
                  </div>
                  <li
                      v-for="(child, index) in node.children ?? []"
                      :key="child._path"
                      :class="[
                      'px-4 py-3 border-b-zinc-300 border-solid',
                      index === (node.children ? node.children.length - 1 : 0)
                        ? 'border-b-2 !border-black'
                        : 'border-b',
                    ]"
                      @click="toggleSubmenu(node._path)"
                  >
                    <NuxtLink
                        v-if="child.slug"
                        :to="child.slug"
                        class="text-base inline-block w-full font-gillSansRegular font-normal"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <UiDivider class="!bg-silver-dark" />
            </template>
          </ul>
          <ul v-if="isRootActiveMenu">
            <router-link to="/i/installation">
              <li class="flex text-base bg-[#F4F4F5] border border-[#FFF] px-4 py-[9px] font-gillSansRegular">
                <nuxt-img width="18" height="19" src="/images/content/tre_panel/icons/installation.svg" />
                <span class="pl-6"> Installation </span>
              </li>
            </router-link>
            <router-link to="/i/contact-us">
              <li
                  class="flex text-base bg-[#F4F4F5] border border-[#FFF] px-4 py-[9px] font-gillSansRegular px-4 py-[9px]"
              >
                <nuxt-img width="18" height="19" src="/images/content/tre_panel/icons/contactus.svg" />
                <span class="pl-6"> Contact Us</span>
              </li>
            </router-link>
          </ul>
        </nav>
      </SfDrawer>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { SfDrawer, SfDrawerPlacement, useDisclosure } from '@storefront-ui/vue';
import { findNode } from '~/composables/useNavigation/utils';
import type { NavItemInterface } from '~/composables/useNavigation/types';

const menuState = useState<string[]>('menuState');
const {
  public: { configSite }
} = useRuntimeConfig();
const placement = ref<SfDrawerPlacement>(SfDrawerPlacement.left);
const props = defineProps({
  navigation: {
    type: Array as () => NavItemInterface[],
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
});
const route = useRoute();

const emit = defineEmits(['toggle-open']);

const mobileMenuDrawer = computed(() => {
  const placementClasses = {
    enterFromClass: 'translate-x-full',
    enterToClass: 'translate-x-0',
    leaveFromClass: 'translate-x-0',
    leaveToClass: 'translate-x-full'
  };
  if (placement.value === 'left') {
    placementClasses.enterFromClass = '-translate-x-full';
    placementClasses.leaveToClass = '-translate-x-full';
  }
  return placementClasses;
});
const { close } = useDisclosure();

const emitToggleOpen = (bool: boolean = false) => {
  emit('toggle-open', bool);
};

const activeNode = ref<string[]>([]);
const openSubmenus = ref<Record<string, boolean>>({});

const toggleSubmenu = (key: string) => {
  Object.keys(openSubmenus.value).forEach((submenuKey) => {
    if (submenuKey !== key) {
      openSubmenus.value[submenuKey] = false;
    }
  });
  openSubmenus.value[key] = !openSubmenus.value[key];
};
const activeMenu = computed(() => {
  return findNode(activeNode.value, props.navigation);
});

const closeMenu = () => {
  close();
  document.body.classList.remove('mp:overflow-hidden');
};
const isRootActiveMenu = computed(() => {
  if (!activeMenu) return false;
  return (activeMenu.value as NavItemInterface)._path === `/${configSite}/navigation/main`;
});
onMounted(() => {
  if (menuState.value) {
    activeNode.value = menuState.value;
  } else {
    menuState.value = activeNode.value;
  }
});

watch(
    () => route.fullPath,
    async () => {
      emitToggleOpen(false);
    }
);
</script>
