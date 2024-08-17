/* eslint-disable max-lines */
import type { Menu as MenuType } from './type';
/* eslint-disable max-lines */
const Menu: MenuType[] = [
  {
    title: 'Main',
    _path: '/trepanel/navigation/main',
    children: [
      {
        title: 'By Style',
        titleMobile: 'Panels By Style',
        _path: '/trepanel/navigation/main/001_panels-by-style',
        children: [
          {
            title: 'Standard Slat Panels',
            _path: '/trepanel/navigation/main/001_panels-by-style/001-standard-slat',
            slug: '/wall-panels/standard-slat',
          },
          {
            title: 'Multi-Width Slat Panels',
            _path: '/trepanel/navigation/main/001_panels-by-style/002-multi-width-slat',
            slug: '/wall-panels/multi-width-slat',
          },
          {
            title: 'Curved Slat Panels',
            _path: '/trepanel/navigation/main/001_panels-by-style/003-curved-slat',
            slug: '/wall-panels/curved-slat',
          },
          {
            title: 'Wide Slat Panels',
            _path: '/trepanel/navigation/main/002_panels-by-size/003_wide-slat',
            slug: '/wall-panels/wide-slat',
          },
          {
            title: 'Square Slat Panels',
            _path: '/trepanel/navigation/main/001_panels-by-style/004_square',
            slug: '/wall-panels/square',
          },
        ],
        slug: '/panels-by-style.html',
        hasMegaMenu: true,
        banner: {
          image: '/images/content/tre_panel/navigation/main/by style.webp',
          imageMobile: '/images/content/tre_panel/navigation/main/style mobile.webp',
          title: 'Panels By Style',
          link: '/panels-by-style.html',
        },
      },
      {
        title: 'By Colour',
        titleMobile: 'Panels By Colour',
        _path: '/trepanel/navigation/main/003_panel-by-colour',
        children: [
          {
            title: 'Light Wood',
            _path: '/trepanel/navigation/main/003_panel-by-colour/001_light-wood',
            slug: '/wall-panels/light-wood',
          },
          {
            title: 'Natural Wood',
            _path: '/trepanel/navigation/main/003_panel-by-colour/002_natural-wood',
            slug: '/wall-panels/natural-wood',
          },
          {
            title: 'Dark Wood',
            _path: '/trepanel/navigation/main/003_panel-by-colour/003_dark-wood',
            slug: '/wall-panels/dark-wood',
          },
          {
            title: 'Grey',
            _path: '/trepanel/navigation/main/003_panel-by-colour/004_grey',
            slug: '/wall-panels/grey',
          },
          {
            title: 'Black',
            _path: '/trepanel/navigation/main/003_panel-by-colour/005_black',
            slug: '/wall-panels/black',
          },
          {
            title: 'Plain Colours',
            _path: '/trepanel/navigation/main/003_panel-by-colour/006_plain-colour',
            slug: '/wall-panels/plain-colour',
          },
        ],
        slug: '/panel-by-colour.html',
        hasMegaMenu: true,
        banner: {
          image: '/images/content/tre_panel/navigation/main/by color.webp',
          imageMobile: '/images/content/tre_panel/navigation/main/by color mobile.webp',
          title: 'Panels By Colour',
          link: '/panel-by-colour.html',
        },
      },
      {
        title: 'By Room',
        titleMobile: 'Panels By Room',
        _path: '/trepanel/navigation/main/004_panels-by-room',
        children: [
          {
            title: 'Bedroom',
            _path: '/trepanel/navigation/main/001_all-tiles-collection/003_by_color/001_bedroom',
            slug: '/wall-panels/bedroom',
          },
          {
            title: 'Living Room',
            _path: '/trepanel/navigation/main/004_panels-by-room/002_living-room',
            slug: '/wall-panels/living-room',
          },
          {
            title: 'Kitchen',
            _path: '/trepanel/navigation/main/004_panels-by-room/003_kitchen',
            slug: '/wall-panels/kitchen',
          },
          {
            title: 'Hallway',
            _path: '/trepanel/navigation/main/004_panels-by-room/004_hallway',
            slug: '/wall-panels/hallway',
          },
          {
            title: 'Office',
            _path: '/trepanel/navigation/main/004_panels-by-room/005_office',
            slug: '/wall-panels/office',
          },
          {
            title: 'Dining Room',
            _path: '/trepanel/navigation/main/004_panels-by-room/006_dinning-room',
            slug: '/wall-panels/dinning-room',
          },
          {
            title: 'Media Wall',
            _path: '/trepanel/navigation/main/004_panels-by-room/007_media-wall',
            slug: '/wall-panels/media-wall',
          },
        ],
        slug: '/panels-by-room.html',
        hasMegaMenu: true,
        banner: {
          image: '/images/content/tre_panel/navigation/main/by room.webp',
          imageMobile: '/images/content/tre_panel/navigation/main/room mobile.webp',
          title: 'Panels By Room',
          link: '/panels-by-room.html',
        },
        bannerDesktop: {
          image: '/images/content/tre_panel/navigation/main/MenuImg.webp',
        },
      },
    ],
  },
];
export default Menu;
