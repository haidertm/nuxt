import type {
  FetchSearchBox,
  SearchProduct,
  SuggestionArray,
  Suggestions,
  UseSearchBoxReturn,
  UseSearchBoxState,
  SearchRestApiResult,
} from '~/composables/useSearchBox/types';

const mapArray = (dataArray: any) => {
  return dataArray
    ?.filter((item: SearchRestApiResult) => item.type === 'product')
    ?.map((item: SearchRestApiResult) => ({
      sku: item.sku || '',
      thumbnail: item.thumbnail || '',
      url: item.url || '',
      option_text_product_price_type: item.option_text_product_price_type ? item.option_text_product_price_type[0] : '',
      calculated_sqm_price: item.calculated_sqm_price[0] || '',
      name: item.name ? item.name[0] : '',
      url_path: item.url_path ? item.url_path[0] : '',
      url_rewrites: [item.url_path ? item.url_path[0] : ''],
    }));
};

export const useSearchBox: UseSearchBoxReturn = () => {
  const state = useState<UseSearchBoxState>('searchbox', () => ({
    data: null,
    SuggestionTerms: [],
    loading: false,
  }));

  /**
   * @description Function for fetching search products.
   * @example
   * getProducts();
   */
  const fetchSearchBox: FetchSearchBox = async (search: string, suggestion: boolean) => {
    state.value.loading = true;
    const existingData = state.value.SuggestionTerms?.find((item) => item.suggestedTerm === search);
    if (!suggestion && existingData) {
      state.value.data = existingData.data;
      return existingData.data;
    }
    const { data, error } = await useAsyncData('autocomplete', () =>
      $fetch('/autoComplete', {
        method: 'GET',
        params: {
          q: search,
        },
      }),
    );
    // useHandleError(error.value);
    const dataArray: any = data?.value;
    const suggestions: Suggestions[] = dataArray
      ?.filter((item: SearchRestApiResult) => item.type === 'term')
      ?.map((item: SearchRestApiResult) => ({
        count: item.num_results || 0,
        term: item.title || '',
        url: item.redirect_url || item.url || '',
      }));
    const items: SearchProduct[] = await mapArray(dataArray);
    const searchedData: SuggestionArray = {
      products: items,
      suggestions: suggestion ? suggestions : [],
    };
    state.value.data = searchedData;
    if (!existingData) {
      state.value.SuggestionTerms.push({ data: searchedData, suggestedTerm: search });
    }
    state.value.loading = false;
    return searchedData;
  };

  return {
    fetchSearchBox,
    ...toRefs(state.value),
  };
};
