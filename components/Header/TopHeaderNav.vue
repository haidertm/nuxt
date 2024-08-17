<template>
  <nav
      class="flex flex-nowrap justify-end items-center 4xs:!gap-x-2 sm:gap-x-3 smallest:gap-x-0 2md:gap-x-10 1tab:gap-[24px]"
  >
    <div class="hidden md:block">
      <NuxtLink class="flex items-center gap-3" :href="'tel:' + phoneNumber">
        <div class="flex-none w-8 h-8 1tab:w-6 1tab:h-6">
          <IconsPhoneRegularIcon width="32" height="32" />
        </div>
        <div class="flex flex-col">
          <span class="text-sm lg:text-base xl:text-lg font-gillSansBold whitespace-nowrap hidden md:block"
          >Need Help?</span
          >
          <span class="text-sm lg:text-base xl:text-lg font-gillSansRegular">{{ phoneNumber }}</span>
        </div>
      </NuxtLink>
    </div>
    <template v-for="actionItem in actionItems" :key="actionItem.ariaLabel">
      <SFButton
          :aria-label="actionItem.ariaLabel"
          class="flex-none 1tab:w-6 1tab:h-6 text-primary-medium group !p-0 bg-transparent hover:bg-transparent active:bg-transparent relative"
          :class="{
          'block md:hidden': actionItem.type === 'phone',
          'block md:hidden cursor-pointer': actionItem.type === 'search',
          'cursor-pointer': actionItem.type === 'cart',
        }"
          variant="tertiary"
          square
          :tag="actionItem.role === 'button' ? '' : actionItem.role"
          :to="handleRedirect(actionItem?.to)"
          @click="
          handleCheckLogin(actionItem.type);
        "
      >
        <template #prefix>
          <Component :is="actionItem.icon" aria-hidden="true" class="cursor-pointer mp:h-[24px] smallest:w-full" />
        </template>
        <template v-if="actionItem.type === 'cart'">
          <div
              v-if="CartLineItemsCount > 0"
              class="absolute -top-0.5 left-4 mp:w-2.5 mp:h-2.5 rounded-full bg-[#E4AB2C] flex items-center justify-center md:-top-2 md:left-[20px] md:w-[22px] md:h-[22px]"
          >
            <p class="text-[#000] md:pt-[2px] mp:pt-[1.5px] font-gillSansRegular text-[8px] md:text-[12px] font-bold">
              {{ CartLineItemsCount }}
            </p>
          </div>
        </template>
<!--        <template v-if="actionItem.type === 'login'">-->
<!--          <SFDropdown-->
<!--              v-model="isLoggedIn"-->
<!--              class="absolute hidden group-hover:block z-50 md:w-full top-4 left-[21%] -translate-x-[21%] md:left-2/4 md:-translate-x-1/2"-->
<!--          >-->
<!--            <ul class="text-start bg-white box-shadow mt-1 mp:pt-1">-->
<!--              <li class="py-1.5 px-2 md:px-3">-->
<!--                <NuxtLink to="/my-account" class="text-[#393939] text-xs font-medium whitespace-nowrap">-->
<!--                  Account Information-->
<!--                </NuxtLink>-->
<!--              </li>-->
<!--              <li class="py-1.5 px-2 md:px-3">-->
<!--                <NuxtLink to="/my-account/shipping-details" class="text-[#393939] text-xs font-medium">-->
<!--                  Address Book-->
<!--                </NuxtLink>-->
<!--              </li>-->
<!--              <li class="py-1.5 px-2 md:px-3">-->
<!--                <NuxtLink to="/my-account/orders" class="text-[#393939] text-xs font-medium">My Orders</NuxtLink>-->
<!--              </li>-->
<!--              <li class="py-1.5 px-2 md:px-3">-->
<!--                <NuxtLink to="/my-account/quotations" class="text-[#393939] text-xs font-medium"> Quotations</NuxtLink>-->
<!--              </li>-->
<!--              <li class="py-1.5 px-2 md:px-3 border-t-[1px] border-silver-dark" @click="handleLogout">-->
<!--                <span class="text-[#393939] text-xs font-medium cursor-pointer">Log out</span>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </SFDropdown>-->
<!--        </template>-->
      </SFButton>
    </template>
  </nav>
</template>

<script setup lang="ts">
// import type { CustomerToken } from '@vue-storefront/magento-types';
import { useGlobalEmits } from '~/composables/useGlobalEmits';
import { useRevokeCustomerToken } from '~/composables/useRevokeCustomerToken';

const $config = useRuntimeConfig();
const phoneNumber = $config?.public.$config?.contact.landline ?? '';
// const { cartTotalQuantity: cartQuantity, cartGrandTotal, cartItemsSimple } = useCart();
const { callEmit } = useGlobalEmits();
const errorMessage = ref<string | unknown>('');
const { revokeToken } = useRevokeCustomerToken();
const token = useState<string>('jwt');
const logoutState = useState<boolean | undefined>('logoutState', () => false);
const isClickedLogout = ref<boolean>(false);
const handleRedirect = (to: string | undefined): string | undefined => (to === '' ? undefined : to);
// const { cartIconClick } = useGoogleTagManager();

const handleLogout = async (): Promise<void> => {
  isClickedLogout.value = true;
  const { logoutError, logoutStatus } = await revokeToken();
  if (logoutStatus.value) {
    logoutState.value = true;
    isClickedLogout.value = false;
  } else {
    errorMessage.value = logoutError.value;
    isClickedLogout.value = false;
  }
};

const NuxtLink = resolveComponent('NuxtLink');
const router = useRouter();
const CartLineItemsCount = computed(() => 0);
const actionItems = [
  {
    icon: resolveComponent('TrepanelIconsSearch'),
    label: '',
    ariaLabel: 'Phone Icon',
    role: 'button',
    to: '',
    type: 'search'
  },
  {
    icon: resolveComponent('TrepanelIconsPhoneRegularIcon'),
    label: '',
    ariaLabel: 'Phone Icon',
    role: NuxtLink,
    to: '/i/contact-us',
    type: 'phone'
  },
  {
    icon: resolveComponent('TrepanelIconsUser'),
    label: 'Log in',
    ariaLabel: 'Log in',
    role: 'button',
    to: undefined,
    type: 'login'
  },
  {
    icon: resolveComponent('TrepanelIconsCart'),
    label: '',
    ariaLabel: '0 Shopping Cart Button',
    role: 'button',
    to: undefined,
    type: 'cart'
  }
];
const cartTotal = computed(() => {
  return undefined;
});
const allItemsAreCutSize = computed(() => {
  return []?.every((item) => {
    return false; // Return false if additionalData is null or undefined
  });
});
const CartIconRouting = () => {
  if (Number(cartTotal.value) === 0 && allItemsAreCutSize.value) {
    callEmit({
      value: true,
      type: 'sample-modal-open'
    });
  } else if (allItemsAreCutSize.value) {
    router.push('/checkout');
  } else {
    router.push('/cart');
  }
};
const isLoggedIn = ref(!!token.value);

const handleCheckLogin = (actionType: string | null): void => {
  switch (actionType) {
    case 'login': {
      if (!isClickedLogout.value) {
        isLoggedIn ? navigateTo('/my-account') : navigateTo('/customer/account/login');
      }

      break;
    }
    case 'cart': {
      CartLineItemsCount.value === 0 ? '' : CartIconRouting();

      break;
    }
    case 'search': {
      document.querySelector('#search-mobile')?.classList.toggle('mp:flex');

      break;
    }
      // No default
  }
};
</script>
