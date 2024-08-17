import type { Ref } from 'vue';
import type { Maybe } from '@vue-storefront/unified-data-model';

export interface NavItemInterface {
  hasMegaMenu?: boolean;
  slug?: string | null;
  key?: string;
  _path: string;
  title: string;
  titleMobile?: string;
  banner?: {
    image: string;
    title: string;
    link?: string;
    imageMobile?: string;
  };
  backgroundColor?: string;
  children?: NavItemInterface[];
}

export interface NavigationResponse {
  main?: NavItemInterface[];
  footer?: NavItemInterface[];
}

export interface UseNavigationState {
  data: NavigationResponse | null;
  loading: boolean;
}

export type FetchNavigation = (siteSlug: string) => Promise<Ref<Maybe<NavigationResponse>>>;

export interface UseNavigation {
  data: Readonly<Ref<UseNavigationState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchNavigation: FetchNavigation;
}

export type UseNavigationReturn = () => UseNavigation;
