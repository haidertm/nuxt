// import { useSdk } from '~/sdk';
import { clearNuxtState } from 'nuxt/app';
export declare type CustomHeaders = Record<string, string>;
import type { revokeTokenType, revokeCustomerTokenReturnType } from './types';
// import type { Maybe } from '@vue-storefront/unified-data-model';

export const revokeToken: revokeTokenType = async () => {
  const logoutStatus = ref(false);
  const logoutError = ref('');
  const cookieCartCount = useCookie<number>('cartCount');
  const stateJwt = useState<string>('jwt');
  const cookieCartPrice = useCookie<number>('cartPrice');
  const tokenCookie = useCookie<string | undefined>('jwtCookie', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'none',
    secure: true
  });
  const cookieCartId = useCookie<string | undefined>('cartId');
  const userDetailsCookies = useCookie('userDetailsCookie');
  const customHeaders: CustomHeaders = { Authorization: `Bearer ${stateJwt.value}` };
  try {
    tokenCookie.value = undefined;
    cookieCartCount.value = 0;
    cookieCartPrice.value = 0;
    userDetailsCookies.value = undefined;
    cookieCartId.value = undefined;
    clearNuxtState(['userDetails', 'jwt', 'signUpState', 'useCart']);
    // const { data, error } = await useAsyncData(() => useSdk().magento.revokeCustomerToken({ customHeaders }));
    // useHandleError(error.value);
    // if (data.value?.errors) {
    //   logoutError.value = data.value.errors[0].message;
    //   logoutStatus.value = false;
    // } else {
    //   logoutStatus.value = true;
    //   if (!tokenCookie.value && !stateJwt.value) navigateTo('/');
    // }
  } catch (error) {
    logoutError.value = error as string;
    logoutStatus.value = false;
  }

  return {
    logoutStatus,
    logoutError
  };
};

export const useRevokeCustomerToken: revokeCustomerTokenReturnType = () => {
  return {
    revokeToken
  };
};
