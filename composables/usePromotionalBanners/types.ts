export interface PromotionalBanner {
  id: number;
  status: number;
  url: string;
  start_date: string;
  end_date: string;
  pm_order: number;
  banner_veiw_status: string;
  image: string;
  webp_image: string;
  store_id: string;
  description: string;
}
export interface PromotionalBanners {
  getPromotionalBanners: PromotionalBanner[];
}
export interface UsePromotionalBannersState {
  data: PromotionalBanners | null;
  loading: boolean;
}
export interface UsePromotionalBannersReturn {
  fetchPromotionalBanners: () => Promise<PromotionalBanners>;
  data: Readonly<Ref<UsePromotionalBannersState['data']>>;
}

export type UsePromotionalBannersReturnReturn = () => UsePromotionalBannersReturn;
export type FetchPromotionalBanners = () => Promise<PromotionalBanners>;
