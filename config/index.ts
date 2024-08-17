import type { Tconfig, EnvironmentType, UrlMapType } from './types';
import { getDomain } from '../utils/paths';

const urlMap: UrlMapType = {
  dev: 'https://dev.trepanel.ae/',
  stage: 'https://staging.trepanel.ae/',
  prod: 'https://www.trepanel.ae/'
};

const config: Tconfig = {
  appName: 'Trepanel',
  slug: 'trepanel',
  enableReview: true,
  appHead: {
    viewport: 'width=device-width,initial-scale=1,maximum-scale=1',
    htmlAttrs: {
      lang: 'en'
    },
    script: [],
    meta: [
      { name: 'theme-color', content: '#000000' },
      {
        name: 'robots',
        content: process.env.NUXT_PUBLIC_INSTANCE === 'prod' ? 'index, follow' : 'noindex, nofollow'
      },
      {
        name: 'google-site-verification',
        content: 'owV5qNKiIM0WulSVe5GRGxfAGXmVB_wC-im9KdpDkt8'
      }
    ],
    link: [
      { rel: 'icon', href: `/favicon/${process.env.NUXT_PUBLIC_CONFIG_SITE}.ico` },
      { rel: 'apple-touch-icon', href: `/favicon/${process.env.NUXT_PUBLIC_CONFIG_SITE}-180x180.png` }
    ]
  },
  siteUrl: urlMap[process.env.NUXT_PUBLIC_INSTANCE as EnvironmentType],
  enforceHtml: false,
  isFullToCutConverter: false,
  countryCode: 'AE',
  monitoring: {
    logRocket: {
      enable: process.env.NUXT_LOGROCKET_ENABLE === 'true',
      id: process.env.NUXT_LOGROCKET_ID || '',
      dev: true,
      enablePinia: process.env.NUXT_LOGROCKET_ENABLE_PINIA === 'true',
      config: {
        console: {
          isEnabled: true
        },
        network: {
          isEnabled: true
        }
      }
    }
  },
  currency: {
    code: 'AED',
    symbol: 'AED'
  },
  sample: {
    button: {
      price: '20'
    }
  },
  contact: {
    deliveryContact: '+97143430793',
    whatsapp: '0502835959',
    landline: '043430793',
    email: 'info@trepanel.ae'
  },
  category: {
    sidebar: {
      facets: [
        'style',
        'filtered_colours',
        'felt_colour',
        'size_group',
        'material_type',
        'slat_width',
        'calculated_sqm_price',
        'wood_panel_color_title',
        'finish',
        'filter_type',
        'filter_colour',
        'shape',
        'size_group',
        'filter_material',
        'special_features',
        'rectified',
        'price'
      ],
      excludeFacets: [
        'category_id',
        'category_uid',
        'front_end_sku',
        'calculated_sqm_price_sale',
        'es_is_in_stock',
        'product_stock_status',
        'es_is_discounted',
        'primary_range'
      ]
    }
  },
  pageContext: {
    title: 'Trepanel'
  },
  pages: {
    search: {
      name: 'Search Page',
      title: 'Trepanel | Wood Wall Panels | Shipping Across UAE',
      defaultCategory: '/wall-panels'
    },
    home: {
      name: 'Home Page',
      title: 'Trepanel | Wood Wall Panels | Shipping Across UAE',
      meta: {
        tags: {
          description:
            'Here at Trepanel we offer extensive range of premium wall and floor panels. Enjoy competitive prices, free samples, & fast delivery for all your interior needs.',
          title: 'Trepanel | Wood Wall Panels | Shipping Across UAE',
          type: 'website'
        }
      },
      content: [
        {
          fields: {
            component: 'UspBar'
          }
        },
        {
          fields: {
            component: 'HeroBanner'
          }
        },
        {
          fields: {
            component: 'FamiliarProducts'
          }
        },
        {
          fields: {
            component: 'ShopByRoomSlider'
          }
        },
        {
          fields: {
            component: 'HomeVideoSection'
          }
        }
      ]
    },
    cart: {
      title: 'Shopping Cart',
      showAdhesive: {
        enabled: false
      }
    },
    'contact-us': {
      title: 'Contact Us | Get in Touch | Trepanel®'
    },
    delivery: {
      title: 'Delivery Information | Fast Shipping | Trepanel®'
    },
    faq: {
      title: 'FAQ | Trepanel'
    },
    'discount-and-vouchers': {
      title: 'Discount And Vouchers'
    },
    returns: {
      title: 'Returns Policy | Easy Returns | Trepanel®'
    },
    'tiles-terms-glossary': {
      title: 'Tiles Terms And Glossary'
    },
    'sample-service': {
      title: 'Sample Service'
    },
    'about-us': {
      title: 'About Us | Trepanel'
    },
    installation: {
      title: 'Installation Guide | Easy Steps | Trepanel®'
    },
    'tile-mountain-press-releases': {
      title: 'Press Centre Archives - Trepanel'
    },
    terms_of_use: {
      title: 'Terms Of Use'
    },
    terms_and_condition: {
      title: 'Terms and Conditions | Purchase Guidelines | Trepanel®'
    },
    privacy_policy: {
      title: 'Privacy Policy | Data Protection | Trepanel®'
    },
    site_map: {
      title: 'Site Map'
    },
    'trustpilot-reviews': {
      title: 'Trustpilot Reviews'
    },
    login: {
      title: 'Customer Login | Access Your Account | Trepanel®'
    },
    videogallery: {
      title: 'Video Gallery'
    },
    create: {
      title: 'Create Account | Join Us Today | Trepanel®'
    },
    'create-password': {
      title: 'Create Password | Join Us Today | Trepanel®'
    },
    forgetpassword: {
      title: 'Forgot Password | Account Recovery | Trepanel®'
    },
    'my-account': {
      title: 'My Account'
    },
    'reset-password': {
      title: 'Trepanel'
    },
    'reset-password-success': {
      title: 'Reset Password Success | Trepanel'
    },
    'set-new-password': {
      title: 'Set New Password | Trepanel'
    },
    'shipping-details': {
      title: 'My Account'
    },
    orders: {
      title: 'My Account'
    },
    quotations: {
      title: 'My Account'
    },
    checkout: {
      title: 'Checkout'
    },
    product: {
      title: 'Product',
      visualizer: {
        enabled: false,
        link: 'https://tilemountain.visualiseitnow.com/?sku='
      }
    },
    offline: {
      title: 'OFFLINE | Trepanel'
    }
  },
  socialUrls: {
    socialUrlsForSchema: [
      'https://www.facebook.com/profile.php?id=61560684358469',
      'https://www.pinterest.co.uk/trepanelae/',
      'https://www.youtube.com/@TrepanelAE-zp8xg',
      'https://www.instagram.com/trepanel_uae/',
      'https://www.tiktok.com/@trepanel_uae',
      'https://x.com/trepanel_uae'
    ]
  },
  gtm: {
    id: process.env.NUXT_PUBLIC_GTM_ID ?? 'GTM-MNSPQW9X',
    defer: true,
    compatibility: false,
    enabled: false,
    debug: false,
    loadScript: true,
    trackOnNextTick: true,
    devtools: false,
    enableRouterSync: true,
    oneTrustConscent: false
  },
  elasticSuite: {
    beaconUrl: `${process.env.NUXT_PUBLIC_MAGENTO_BASE_URL}/elasticsuite/tracker/hit/image/h.png`,
    telemetryUrl: 'https://t.elasticsuite.io/track',
    endpointUrl: `/elasticSuiteTracker`,
    telemetryEnabled: '',
    sessionConfig: {
      visit_cookie_name: 'STUID',
      visit_cookie_lifetime: '3600',
      visitor_cookie_lifetime: '365',
      visitor_cookie_name: 'STVID',
      domain: getDomain(process.env.NUXT_PUBLIC_MAGENTO_BASE_URL ?? 'm2.trepanel.co.uk'),
      path: '\\/'
    }
  },
  cdnUrl: 'https://cdn.tm8.co.uk',
  instagramImageUrl: 'https://media.reviews.co.uk/instagram-image?src=',
  checkout: {
    ifNoOneIsIn: [
      'None',
      'Leave with a neighbour',
      'Leave in a secure porch',
      'Leave in the shed',
      'Leave in garage',
      'Leave with porter/caretaker',
      'Leave in conservatory',
      'Leave in greenhouse'
    ]
  },
  delivery: {
    progressBarConfig: {
      enable: true,
      minTotal: 10,
      maxTotal: 1000,
      maxText: 'You\'ve qualified for FREE Delivery',
      message: 'Spend  AED@remainingAmount more for Free Delivery*'
    }
  },
  payment: {
    applepayExpressButton: {
      prod: false,
      stage: true,
      dev: true
    },
    paypalExpressCheckout: {
      status: false
    }
  }
};

export default config;
