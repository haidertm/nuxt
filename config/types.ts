export type esConfiguration = {
  beaconUrl: string;
  telemetryUrl: string;
  endpointUrl: string;
  telemetryEnabled: string;
  sessionConfig: {
    visit_cookie_name: string;
    visit_cookie_lifetime: string;
    visitor_cookie_lifetime: string;
    visitor_cookie_name: string;
    domain: string;
    path: string;
  };
};

type appHead = {
  title?: string;
  viewport?: string;
  meta: {
    name: string;
    content: string;
  }[];
  link: {
    rel: string;
    href: string;
  }[];
  script: {
    type: string;
    src: string;
    async: boolean;
  }[];
  noscript?: {
    innerHTML: string;
  }[];
  style?: {
    cssText: string;
  }[];
  htmlAttrs: {
    lang: string;
  };
  bodyAttrs?: {
    class: string;
  };
};

export type PageContent = {
  fields: {
    component: string;
    [key: string]: unknown;
  };
};

export type Page = {
  title?: string;
  name?: string;
  meta?: {
    tags?: {
      description: string;
      title: string;
      type: string;
    };
  };
  content?: PageContent[] | undefined;
  [key: string]: unknown;
};

export type Pages = {
  [key: string]: Page;
};

type MonitoringConfig = {
  logRocket: {
    id: string;
    dev: boolean;
    enable: boolean;
    enablePinia: boolean;
    config: {
      console: {
        isEnabled: boolean;
      };
      network: {
        isEnabled: boolean;
      };
    };
  };
};

export type Tconfig = {
  enableReview: boolean;
  appName: string;
  slug: string;
  countryCode: string;
  monitoring?: MonitoringConfig;
  appHead: appHead;
  logRocketId?: string;
  currency?: { code?: string; symbol?: string };
  sample: {
    button: {
      price: string;
    };
  };
  contact?: {
    deliveryContact?: string;
    whatsapp?: string;
    landline?: string;
    email?: string;
  };
  siteUrl: string;
  enforceHtml: boolean;
  isFullToCutConverter: boolean;
  cdnUrl?: string;
  category: {
    sidebar: {
      facets: string[];
      excludeFacets: string[];
    };
  };
  pageContext: {
    title: string;
  };
  pages: Pages;
  socialUrls?: {
    socialUrlsForSchema: string[];
  };
  gtm: {
    id: string;
    enabled: boolean;
    debug: boolean;
    compatibility: boolean;
    defer?: boolean;
    loadScript: boolean;
    trackOnNextTick: boolean;
    devtools: boolean;
    enableRouterSync: boolean;
    oneTrustConscent: boolean;
    source?: string;
  };
  elasticSuite: esConfiguration;
  instagramImageUrl?: string;
  checkout: {
    ifNoOneIsIn: string[];
  };
  delivery?: {
    progressBarConfig?: {
      enable: boolean;
      minTotal: number;
      maxTotal: number;
      maxText: string;
      message: string;
    };
  };
  payment?: {
    applepayExpressButton?: {
      prod: boolean;
      stage: boolean;
      dev: boolean;
    };
    paypalExpressCheckout?: {
      status: boolean;
    };
  };
};

export type EnvironmentType = 'dev' | 'stage' | 'prod';
export type ImageLoadingType = 'lazy' | 'eager';
export type ConfigType = 'tile-mountain' | 'bath-mountain' | 'trepanel';
export type UrlMapType = Record<EnvironmentType, string>;
