<template>
  <section :class="classes[configSite as ConfigType]?.backgroundColor">
    <template v-if="currentComponents && pageContent">
      <component
          v-for="(component, index) in pageContent"
          :key="`${component.fields.component}-${index}`"
          :is="currentComponents[component.fields.component]"
      />
    </template>
  </section>

  <!-- Modal -->
  <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
  >
    <SfModal
        v-model="isOpen"
        class="max-w-[90%] !w-[300px] !shadow-[0_0px_35px_-5px_rgba(0,0,0,70%)] !bottom-[41%] z-10"
        tag="section"
        role="alertdialog"
        aria-labelledby="promoModalTitle"
        aria-describedby="promoModalDesc"
    >
      <header>
        <p id="promoModalTitle" class="text-lg text-center text-[#4A4A4A]">
          <span v-if="logoutState">You are logged out</span>
          <span v-else-if="signUpState"> You are logged in </span>
        </p>
      </header>
      <footer class="flex justify-end gap-4 mt-4">
        <uiSfButton
            class="m-auto w-full !bg-[#ABAAB2] !font-bold text-sm text-white py-4 block !rounded focus-visible:outline-none"
            @click="handleClose"
        >Ok
        </uiSfButton>
      </footer>
    </SfModal>
  </transition>
  <section>
    <div itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" :content="$config.appName" />
      <meta itemprop="url" :content="$config.siteUrl" />
      <meta v-for="socialLink in socialLinksSchema" :key="socialLink" itemprop="sameAs" :content="socialLink" />
      <a :href="baseUrl + '_ipx/s_151x68/images/tm-logo.svg'" itemprop="logo" aria-label="Logo" />
    </div>
    <div itemscope itemtype="http://schema.org/WebSite">
      <meta itemprop="name" :content="$config.appName" />
      <meta itemprop="url" :content="$config.siteUrl" />
      <form itemprop="potentialAction" itemscope itemtype="https://schema.org/SearchAction" style="display: none">
        <meta itemprop="target" :content="$config.siteUrl + `/search/?q={search_term_string}`" />
        <input itemprop="query-input" type="text" name="search_term_string" required />
        <input type="submit" />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ConfigType, Page, PageContent } from '~/config/types';
import { SfModal } from '@storefront-ui/vue';

const {
  public: { configSite, $config, apiBaseUrl: baseUrl }
} = useRuntimeConfig();

const currentSite: ConfigType = configSite as ConfigType;

const socialLinksSchema = computed(() => $config.socialUrls.socialUrlsForSchema);
const CookieCartCount = useCookie<number | undefined>('cartCount');

// Use type assertion to inform TypeScript about the expected structure
const homePage = $config.pages['home'] as Page;
const pageContent: PageContent[] | undefined = homePage.content;
const HeroDefault = markRaw(defineAsyncComponent(() => import('~/components/Home/Hero/Index.vue')));
const HomeVideoSectionTrepanel = markRaw(
    defineAsyncComponent(() => import('~/components/Home/HomeVideoSection.vue'))
);
const ShopByRoomSliderTP = markRaw(
    defineAsyncComponent(() => import('~/components/Home/ShopByRoomSlider/index.vue'))
);

// Define the types for your components
type ComponentType = ReturnType<typeof markRaw>;

const componentsMap = computed(() => ({
  trepanel: {
    UspBar: markRaw(defineAsyncComponent(() => import('~/components/USPBar/index.vue'))),
    HeroBanner: HeroDefault,
    FamiliarProducts: markRaw(
        defineAsyncComponent(() => import('~/components/Home/FamiliarProduct/index.vue'))
    ),
    ShopByRoomSlider: ShopByRoomSliderTP,
    HomeVideoSection: HomeVideoSectionTrepanel
  }
}));

const currentComponents = computed(() => {
  return componentsMap.value['trepanel'];
});

const signUpState = useState('signUpState');
const logoutState = useState('logoutState');

const isOpen = computed(() => {
  let returnValue = false;
  if (signUpState.value || logoutState.value) returnValue = true;
  return returnValue;
});

const handleClose = () => {
  clearNuxtState(['signUpState', 'logoutState']);
  CookieCartCount.value = undefined;
};

const metaTags = [
  {
    id: 'description',
    name: 'description',
    content: homePage.meta?.tags?.description
  },
  { property: 'og:url', content: $config.siteUrl },
  { property: 'og:title', content: homePage.meta?.tags?.title },
  { property: 'og:type', content: homePage.meta?.tags?.type },
  {
    property: 'og:description',
    content: homePage.meta?.tags?.description
  }
];

const linkTags = [{ rel: 'canonical', href: $config.siteUrl }];
useHead({
  meta: metaTags,
  link: linkTags
});
const defaultClasses = {
  backgroundColor: 'md:bg-silver-light '
};
const classes = ref({
  trepanel: {
    backgroundColor: 'bg-white'
  },
  'tile-mountain': defaultClasses,
  'bath-mountain': defaultClasses
});
</script>
