export interface IItem {
  display: {
    name: string;
    description: string;
    thumbnail: {url: string};
  };
  traits: { traits: any[] };
  rarity?: any;
  editions: { infoList: any[] };
  serial: { number: string };
  royalties: { cutInfos: any[] };
  license?: any;
  medias?: any;
  externalURL: { url: string };
  collectionDisplay: {
    name: string;
    description: string;
    externalURL: object;
    squareImage: object;
    bannerImage: object;
    socials: object[];
  };
  id: string;
}

export interface ICollection {
  items: IItem[];
  remained?: string[];
}

export interface ICollectionsData {
  [key: string]: ICollection;
}
