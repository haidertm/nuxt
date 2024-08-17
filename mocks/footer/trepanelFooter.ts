import type { Footer as FooterType } from './types';

const phoneNumber = '03348123456';
const email = 'something@gmail.com';
export const TREPANEL_FOOTER: FooterType[] = [
  {
    id: 1,
    order: 1,
    title: 'Customer Info',
    menuAttached: false,
    items: [
      {
        id: 1,
        path: '/customer/account/login',
        title: 'Login/Register',
        menuAttached: false
      },
      {
        id: 2,
        path: '/i/delivery',
        title: 'Delivery Information',
        menuAttached: false
      },
      {
        id: 4,
        path: '/i/terms_and_condition',
        title: 'Terms and Conditions',
        menuAttached: false
      },
      {
        id: 5,
        path: '/i/privacy_policy',
        title: 'Privacy Policy',
        menuAttached: false
      },
      {
        id: 6,
        path: '/i/returns',
        title: 'Returns and Refunds',
        menuAttached: false
      }
    ]
  },
  {
    id: 2,
    order: 2,
    title: 'Browse Panels',
    menuAttached: false,
    items: [
      {
        id: 1,
        path: '/wall-panels/standard-slat',
        title: 'Standard Panels',
        menuAttached: false
      },
      {
        id: 2,
        path: '/wall-panels/multi-width-slat',
        title: 'Multi-Width Panels',
        menuAttached: false
      },
      {
        id: 3,
        path: '/wall-panels/curved-slat',
        title: 'Curved Panels',
        menuAttached: false
      },
      {
        id: 4,
        path: '/wall-panels/wide-slat',
        title: 'Wide Slat Panels',
        menuAttached: false
      }
    ]
  },
  {
    id: 3,
    order: 3,
    title: 'Contact Us',
    menuAttached: false,
    items: [
      {
        id: 0,
        path: '',
        title: 'M31, The Curve Building, 4th Street, Al Quoz 3 (Visits only by appointment)',
        src: '/images/trepanel/location-footer.svg',
        alt: 'location',
        menuAttached: false
      },
      {
        id: 1,
        path: 'mailto:' + email,
        title: email,
        src: '/images/trepanel/email-footer.svg',
        alt: 'email',
        menuAttached: false
      },
      {
        id: 2,
        path: 'tel:' + phoneNumber,
        title: phoneNumber,
        src: '/images/trepanel/Phone.svg',
        alt: 'Number',
        menuAttached: false
      }
    ]
  },
  {
    id: 4,
    order: 4,
    title: 'Follow Us',
    menuAttached: true,
    items: [
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      },
      {
        id: 0,
        path: '',
        title: '',
        menuAttached: false
      }
    ]
  }
];
