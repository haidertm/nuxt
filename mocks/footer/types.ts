export interface FooterItem {
  id: number;
  path?: string;
  title: string;
  menuAttached: boolean;
  src?: string;
  alt?: string;
  order?: number;
}

export interface Footer extends FooterItem {
  items: FooterItem[];
}
