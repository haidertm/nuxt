import type { Ref } from 'vue';

export interface SearchProduct {
  url?: string;
  name: string;
  calculated_sqm_price?: string;
  option_text_product_price_type?: string;
  thumbnail?: string;
  sku: string;
  url_path: string;
  url_rewrites: string[];
}
export interface Suggestions {
  term: string;
  count: number;
  url: string;
}

export interface SuggestionArray {
  products: SearchProduct[];
  suggestions: Suggestions[];
}
export interface UseSearchBoxState {
  data: SuggestionArray | null | undefined;
  SuggestionTerms: {
    data: SuggestionArray | null | undefined;
    suggestedTerm?: string;
  }[];
  loading: boolean;
}
export interface SearchRestApiResult {
  thumbnail: string;
  calculated_sqm_price: string;
  option_text_product_price_type?: string;
  title?: string;
  num_results?: number;
  type?: string;
  url?: string;
  redirect_url?: string;
  name?: string[];
  sku?: string;
  url_path?: string;
  url_rewrites?: string[];
}
export type FetchSearchBox = (search: string, suggestion: boolean) => Promise<SuggestionArray | null | undefined>;
export interface UseSearchBox {
  data: Readonly<Ref<UseSearchBoxState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchSearchBox: FetchSearchBox;
}

export type UseSearchBoxReturn = () => UseSearchBox;
