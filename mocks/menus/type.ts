export type Menu = {
  title: string;
  titleMobile?: string;
  _path: string;
  children?: Menu[];
  slug?: string | null;
  hasMegaMenu?: boolean;
  backgroundColor?: string;
  banner?: {
    image: string;
    imageMobile?: string;
    title: string;
    link: string;
  };
  bannerDesktop?: {
    image: string;
  };
};
