export interface DataInterface {
  birthdate: string;
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean | null;
    filter_locked: boolean | null;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: string;
  };
  href: string;
  id: string;
  images: string[] | [];
  product: string;
  type: string;
  uri: string;
}

export interface InitialStateInterface {
  data: DataInterface;
  status: {
    isFetching: boolean;
  };
}
