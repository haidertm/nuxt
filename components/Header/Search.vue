<template>
  <form ref="referenceRef" role="search" class="md:relative" @submit.prevent="submit">
    <div class="flex flex-[100%]">
      <TMInput
          ref="inputReference"
          v-model="inputModel"
          name="Search"
          class="text-xs md:text-sm mp:text-base xl:!text-lg md:!bg-[#F4F4F5] mp:bg-[#E4E4E7] md:text-[#979595] mp:!text-[#4F4F4F] font-gillSansRegular placeholder:text-[#979595] mp:placeholder:text-[#000] mp:pt-[4px]"
          :wrapper-class="[
          'mp:h-[45px]  w-full rounded-none pr-2 mp:pl-2 md:!bg-[#F7F6F6] mp:bg-[#E4E4E7] h-10 xl:!h-[50px] hover- !ring-0 focus-visible:outline-none active:!ring-0 hover:!ring-0 focus-within:!ring-0 focus-within:!ring-transparent border mp:!border-l-0 mp:border-r-0 border-[#D4D4D8] mp:border-[#161D49] active:border-y focus-within:border-y',
        ]"
          aria-label="Search"
          placeholder="What are you looking for?"
          @focus="open"
          @keydown="handleInputKeyDown"
          autocomplete="off"
          @click="closeMenu"
      >
        <template #suffix>
          <button
              type="submit"
              aria-label="Search for a specific phrase on the page"
              class="bg-transparent hover:bg-transparent hover:text-white active:bg-transparent"
          >
            <IconsSearchIcon class="text-[#71717A] mp:hidden" />
            <IconsSearch class="text-[#71717A] md:hidden" />
          </button>
        </template>
      </TMInput>
    </div>
    <div
        v-if="isOpen && inputModel.length > 2"
        ref="floatingRef"
        :style="style"
        class="!left-0 right-0 z-[999] bg-[#F3F3F3]"
    >
      <div
          v-if="isLoadingSnippets"
          class="flex items-center justify-center w-full sm:h-20 py-2 sm:border sm:border-solid sm:border-neutral-100 sm:drop-shadow-md"
      >
        <SfLoaderCircular />
      </div>
      <div
          v-else-if="snippets && snippets.length > 0"
          ref="dropdownListReference"
          class="pb-1 md:pb-2 bg-[#F4F4F5] mp:bg-[#E4E4E7] sm:h-auto md:border md:border-[#000] sm:drop-shadow-md md:p-4"
      >
        <div
            v-if="originalSuggestions.length > 0"
            class="flex flex-col border-b md:border-b-[#D4D4D8] mp:border-b-[#A1A1AA] mp:p-4 mp:pl-2 mp:pb-0"
        >
          <nuxt-link
              class="text-base font-gillSansRegular text-[#000] capitalize pb-2"
              v-for="suggestion in originalSuggestions"
              :key="suggestion.name"
              :to="`${suggestion.url}`"
          >{{ suggestion.name }}
          </nuxt-link>
        </div>
        <div>
          <div
              v-if="suggestionToggle"
              class="flex items-center justify-center w-full h-screen sm:h-20 py-2 sm:border sm:border-solid sm:rounded-md sm:border-neutral-100 sm:drop-shadow-md"
          >
            <SfLoaderCircular />
          </div>
          <ul class="pt-3 md:pt-4 mp:pl-[18px] mp:pr-[25px] mp:pt-[22px] mp:pb-0;" v-else>
            <li v-for="{ product } in snippets" :key="product?.sku" class="cursor-pointer">
              <div
                  @click="handleClick(product)"
                  class="grid grid-cols-[80px_1fr] items-center gap-5 no-underline mb-[18px] py-0"
              >
                <div class="img-box">
                  <img width="80" height="80" :src="getProductImage(product?.thumbnail)" alt="product thumbnail" />
                </div>
                <div class="text-box">
                  <h6
                      class="text-sm leading-[normal] font-gillSansBold text-[#4A4A4A] pb-[11px] lg:w-[240px] 4xs:w-[175px] smallest:w-full 1tab:w-full"
                  >
                    {{ product?.name }}
                  </h6>
                  <span class="text-sm text-[#CF5355] font-gillSansRegular">
                    {{ currency.symbol }} {{ product?.calculated_sqm_price }} /
                    {{ product?.option_text_product_price_type }}</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { offset } from '@floating-ui/vue';
import { watchDebounced } from '@vueuse/shared';
import { unrefElement } from '@vueuse/core';
import { SfLoaderCircular, useDisclosure, useDropdown, useTrapFocus } from '@storefront-ui/vue';
import TMInput from '~/components/SF/Input.vue';
import type { SearchProduct, Suggestions } from '~/composables/useSearchBox/types';

const { $ProductRoute } = useNuxtApp();
const currency = 'AED';
const {
  public: {
    magentoBaseUrl: m2BaseUrl
  }
} = useRuntimeConfig();
const baseUrl = m2BaseUrl?.endsWith('/') ? m2BaseUrl : m2BaseUrl + '/';
const NuxtLink = resolveComponent('NuxtLink');
const inputModel = ref('');
const inputReference = ref();
const dropdownListReference = ref();
const isLoadingSnippets = ref(false);
// const { fetchSearchBox, data: SearchProductsCatalog } = useSearchBox();
const snippets = ref<{ highlight: string; product?: SearchProduct }[]>([]);
const originalSuggestions = ref<{ name: string; url: string; items: Suggestions[] }[]>([]);
const { isOpen, close, open } = useDisclosure();
const suggestionToggle = ref(false);
const WithAggregation = ref(false);
// const { triggerGA4Event } = useGoogleTagManager();
import { useZindexEmits } from '~/composables/useZindexEmits/useZindexEmits';

const { closeMenu } = useZindexEmits();

const router = useRouter();
const { query } = useRoute();
const QueryParameter = query.q as string;
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom',
  middleware: [offset(0)]
});
const getProductImage = (url: any) => {
  return baseUrl + url;
};
const { focusables: focusableElements } = useTrapFocus(dropdownListReference as Ref<HTMLElement>, {
  trapTabs: false,
  arrowKeysUpDown: true,
  activeState: isOpen,
  initialFocus: false
});

const focusInput = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};

const reset = () => {
  inputModel.value = '';
  snippets.value = [];
  close();
  focusInput();
};

const redirectUrl = computed(() =>
    originalSuggestions.value.find((item) => item.name.toLowerCase() === inputModel.value.toLowerCase())
);
const submit = () => {
  if (inputModel.value.length < 3) {
    return false;
  }
  triggerGA4Event('search', { search_term: inputModel.value });
  if (snippets.value.length === 1) {
    const product = snippets.value[0]?.product;
    const product_path = product?.url || product?.url_path;
    if (product_path && typeof product_path === 'string' && product?.sku) {
      $ProductRoute(product_path, product.sku);
    }
  } else if (redirectUrl.value?.url) {
    const pattern: RegExp = /^(https?:\/\/)/;
    if (pattern.test(redirectUrl.value?.url)) {
      let parsedUrl = new URL(redirectUrl.value?.url);
      let FinalUrl = parsedUrl.pathname.slice(1) + parsedUrl.search;
      if (!FinalUrl?.startsWith('/')) {
        FinalUrl = '/' + FinalUrl;
      }
      router.push({ path: FinalUrl ?? '' });
    } else {
      router.push({ path: paths.search, query: { q: inputModel.value } });
    }
  } else {
    router.push({ path: paths.search, query: { q: inputModel.value } });
  }
  reset();
};

const handleInputKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') reset();
  if (event.key === 'ArrowUp') {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[focusableElements.value.length - 1].focus();
    }
  }
  if (event.key === 'ArrowDown') {
    open();
    if (isOpen && focusableElements.value.length > 0) {
      focusableElements.value[0].focus();
    }
  }
};

const escapeRegExp = (phrase: string) => {
  return phrase.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    reset();
  }
});
const mockAutocompleteRequest = async (phrase: string) => {
  const MappedArray: SearchProduct[] = SearchProductsCatalog.value?.products ?? [];
  return MappedArray.filter((product) => product?.name?.toLowerCase()).map((product) => {
    const escapedTerm = escapeRegExp(phrase);
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    let modified_url_path = product?.url_path;
    if (!modified_url_path.startsWith('/') && !modified_url_path.startsWith('https://')) {
      modified_url_path = '/' + modified_url_path;
    }
    product.url_path = modified_url_path;
    const highlight = product?.name.replace(
        regex,
        (match) => `<span class="font-medium text-primary-medium">${match}</span>`
    );
    return { highlight, product };
  });
};
const noProducts = (data: { highlight: string; product: SearchProduct }[]): void => {
  if (!suggestionToggle.value && data.length === 0) {
    originalSuggestions.value = [];
    snippets.value = [];
  } else {
    snippets.value =
        data.length > 0
            ? data
            : [
              {
                highlight: '<span class="font-medium text-primary-medium">No products</span> found',
                product: {
                  sku: '',
                  name: '',
                  url_path: '',
                  url_rewrites: ['']
                }
              }
            ];
  }
  suggestionToggle.value = false;
};
const autoComplete = async (autoCompleteValue = inputModel.value) => {
  if (!autoCompleteValue) return;
  const getSnippets = async () => {
    open();
    isLoadingSnippets.value = !suggestionToggle.value;
    try {
      WithAggregation.value = QueryParameter ? !inputModel.value : false;
      await fetchSearchBox(autoCompleteValue, !suggestionToggle.value);
      const data = await mockAutocompleteRequest(inputModel.value);
      const MappedSuggestionArray: Suggestions[] = SearchProductsCatalog.value?.suggestions ?? [];
      if (MappedSuggestionArray.length > 0) {
        originalSuggestions.value = MappedSuggestionArray.map((suggestion) => {
          let modified_suggestion_url = suggestion.url;
          if (!modified_suggestion_url.startsWith('/') && !modified_suggestion_url.startsWith('https://')) {
            modified_suggestion_url = '/' + modified_suggestion_url;
          }
          const name = suggestion.term;
          const url = modified_suggestion_url;
          return { name, url, items: [{ count: suggestion.count, term: suggestion.term, url: suggestion.url }] };
        });
      }
      noProducts(data);
    } catch (error) {
      close();
      console.error(error);
    }
    isLoadingSnippets.value = false;
  };
  getSnippets();
};
watchDebounced(inputModel, autoComplete, { debounce: 500 });

const handleClick = (product: SearchProduct | undefined): void => {
  if (!product || suggestionToggle.value || !product.url_path) {
    return;
  }
  $ProductRoute(product.url || product.url_path, product.sku);
};
</script>
