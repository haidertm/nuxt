export interface USPBarPropsData {
  isHomepage: boolean;
}

export interface FamiliarPropertyData {
  tile: {
    id: number;
    Title: string;
    Url: string;
    Background: null | string;
    Image: {
      url: string;
      alt?: string;
    };
  };
  index: number;
}
