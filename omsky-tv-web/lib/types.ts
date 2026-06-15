export interface Channel {
  id: string;
  name: string;
  alt_names: string[];
  network: string | null;
  owners: string[];
  country: string;
  categories: string[];
  is_nsfw: boolean;
  launched: string | null;
  closed: string | null;
  replaced_by: string | null;
  website: string | null;
  logo?: string;
}

export interface Stream {
  channel: string;
  url: string;
  http_referrer?: string;
  user_agent?: string;
  timeshift?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface StreamWithChannel extends Stream {
  channelData?: Channel;
  isWorking?: boolean;
  lastChecked?: Date;
}

export interface FilterOptions {
  country?: string;
  category?: string;
  search?: string;
}
