export const paths = {
  home: '/',
  category: '/category',
  product: '/product/',
  cart: '/cart',
  checkout: '/checkout',
  account: '/my-account',
  orderSuccess: '/order/success',
  orderFailed: '/order/failed',
  accountPersonalData: '/my-account',
  accountBillingDetails: '/my-account/billing-details',
  accountShippingDetails: '/my-account/shipping-details',
  accountMyOrders: '/my-account/orders',
  accountReturns: '/my-account/returns',
  authResetPassword: '/forgetpassword',
  authResetPasswordSuccess: '/reset-password-success',
  authSetNewPassword: '/set-new-password',
  authLogin: '/customer/account/login',
  authSignup: '/customer/account/create',
  search: '/search'
};

/**
 * Prepends a base URL to a given URL if it's not already a complete URL.
 * Optionally appends a format as a query parameter if the URL is an image and a format is specified.
 * @param {string} url - The URL to check.
 * @param {string} baseUrl - The base URL to prepend.
 * @param {object} [options] - Optional parameters.
 * @param {string|false} [options.format=false] - The image format to append as a query string.
 * Formats include 'avif', 'webp', etc. Set to false to disable.
 * @return {string} The processed URL.
 */
export function prependBaseUrl (
  url: string,
  baseUrl: string | undefined,
  options?: {
    format: string | false;
  }
): string {
  // Set default values for options
  const { format = false } = options || {};

  if (!baseUrl) {
    return url;
  }

  let processedUrl = /^https?:\/\//.test(url) ? url : baseUrl + url;

  // Append format as query parameter if the URL is an image and a format is specified
  if (format && /\.(jpg|jpeg|png|gif)$/i.test(processedUrl)) {
    processedUrl += `?format=${format}`;
  }

  return processedUrl;
}

/**
 * Removes the cache segment from a Magento media URL.
 *
 * Magento media URLs often contain a 'cache' segment that looks like '/cache/[hash]/'.
 * This function detects and removes that segment from the URL.
 * If the URL does not contain a cache segment, it is returned unchanged.
 *
 * @param {string} url - The original Magento media URL.
 * @returns {string} The URL with the cache segment removed, or the original URL if no cache segment is present.
 */
export function removeMagentoCacheFromUrl (url: string): string {
  const cachePattern = /\/cache\/[^/]+\/+/;

  if (cachePattern.test(url)) {
    return url.replace(cachePattern, '/');
  }

  return url;
}

export function roundTo (n: number | undefined, digits: number) {
  let negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n && n < 0) {
    negative = true;
    n = n * -1;
  }
  const multiplicator = Math.pow(10, digits);
  n = n ? Number.parseFloat((n * multiplicator).toFixed(11)) : 0;
  n = Number((Math.round(n) / multiplicator).toFixed(2));
  if (negative) {
    n = Number((n * -1).toFixed(2));
  }
  return n;
}

export const newRoundTo = (number: number | string | null | undefined) => {
  return Math.round(Number.parseFloat(number ? number.toString() : '0') * 100) / 100;
};

export const formatPrice = (price: number) => {
  const roundedPrice: number = newRoundTo(price);
  return roundedPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const resetFilters = () => {
  const router = useRouter();
  const route = useRoute();
  const currentParams = Object.fromEntries(new URLSearchParams(route.fullPath.split('?')[1]));
  // Preserve the 'q' parameter if it exists
  const queryParameterQ = currentParams.q ? { q: currentParams.q } : {};
  // Push the new query parameters, including the preserved 'q' parameter if present
  router.push({ path: route.path, query: { ...queryParameterQ } });
};

export const getDomain = (url: string): string => {
  // Remove protocol (http, https)
  let domain = url.replace(/^https?:\/\//, '');

  // Remove trailing slash if present
  domain = domain.replace(/\/$/, '');
  return domain;
};

/** Formats path for product navigation, adding leading slash and enforcing '.html' based on config. */

export function adjustEnforceHtmlExtension (path: string): string {
  const enforceHtml = false;
  // Ensure URL starts with a slash
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // Enforce '.html' extension if needed
  path = enforceHtml && !path.endsWith('.html') ? `${path}.html` : path;

  return path;
}

// product url for schema
export function ProductUrlForSchema (product: any): string {
  const {
    public: { $config }
  } = useRuntimeConfig();
  const product_path = product.value?.url_path ?? product.value?.url_key ?? '';
  let product_url = '';
  // TODO: temporarily hard coding it.
  const site_url = 'https://dev.trepanel.ae/';
  if (!product_path?.startsWith('/') && !product_path?.startsWith('https://')) {
    product_url = site_url + product_path;
  }
  let modified_url = adjustEnforceHtmlExtension(product_url);
  if (modified_url?.startsWith('/')) {
    modified_url = modified_url.replace(/^\/+/, '');
  }
  return modified_url;
}
