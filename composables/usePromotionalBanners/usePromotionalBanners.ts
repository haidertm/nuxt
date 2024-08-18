// import { useSdk } from '~/sdk';
import type {
  UsePromotionalBannersReturnReturn,
  FetchPromotionalBanners,
  UsePromotionalBannersState
} from '~/composables/usePromotionalBanners/types';
import PromotionalBannersQuery from '~/composables/usePromotionalBanners/customQuery/promotionalBannersQuery';
import { queryFormatter } from '~/utils';

export const usePromotionalBanners: UsePromotionalBannersReturnReturn = () => {
  const state = useState<UsePromotionalBannersState>('promotionalBanners', () => ({
    data: null,
    loading: false
  }));
  const fetchPromotionalBanners: FetchPromotionalBanners = async () => {
    state.value.loading = true;
    if (state.value.data) {
      return;
    }
    try {
      const { data, error } = await useAsyncData('fetchPromotionalBanners', () =>
        $fetch('/graphql/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: queryFormatter(PromotionalBannersQuery)
        })
      );
      // useHandleError(error.value);
      state.value.data = data.value?.data;
      state.value.loading = false;
      return data.value?.data;
    } catch {
      return state.value.data;
    }
  };
  return {
    fetchPromotionalBanners,
    ...toRefs(state.value)
  };
};
