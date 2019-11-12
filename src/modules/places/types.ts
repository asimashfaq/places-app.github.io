import { Action } from "redux";

export interface Meta {
  code: number;
  requestId: string;
}

export interface Filter {
  name: string;
  key: string;
}

export interface SuggestedFilters {
  header: string;
  filters: Filter[];
}

export interface Ne {
  lat: number;
  lng: number;
}

export interface Sw {
  lat: number;
  lng: number;
}

export interface SuggestedBounds {
  ne: Ne;
  sw: Sw;
}

export interface Item2 {
  summary: string;
  type: string;
  reasonName: string;
}

export interface Reasons {
  count: number;
  items: Item2[];
}

export interface Contact {}

export interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
  labeledLatLngs?: LabeledLatLng[];
  distance: number;
  cc: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
  postalCode?: string;
  crossStreet?: string;
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}

export interface Stats {
  tipCount: number;
  usersCount: number;
  checkinsCount: number;
  visitsCount: number;
}

export interface BeenHere {
  count: number;
  lastCheckinExpiredAt: number;
  marked: boolean;
  unconfirmedCount: number;
}

export interface Photos {
  count: number;
  groups: any[];
}

export interface HereNow {
  count: number;
  summary: string;
  groups: any[];
}

export interface Venue {
  id: string;
  name: string;
  contact: Contact;
  location: Location;
  categories: Category[];
  verified: boolean;
  stats: Stats;
  beenHere: BeenHere;
  photos: Photos;
  hereNow: HereNow;
}

export interface Item {
  reasons: Reasons;
  venue: Venue;
  referralId: string;
}

export interface Group {
  type: string;
  name: string;
  items: Item[];
}
export interface Warning {
  text: string;
}
export interface Response {
  suggestedFilters: SuggestedFilters;
  headerLocation: string;
  headerFullLocation: string;
  headerLocationGranularity: string;
  query: string;
  totalResults: number;
  suggestedBounds: SuggestedBounds;
  groups: Group[];
  warning?: Warning;
}

export interface IObject {
  meta: Meta;
  response: Response;
}

export interface IPagingProps {
  offset: number;
  totalResults: number;
  pageChangedHandler: (page: string) => void;
  cntOnPage: number;
}

export interface ISearchSuccessAction extends Action<"SEARCH_SUCCESS"> {
  data: IObject;
}

export interface ISearchAction extends Action<"SEARCH"> {
  query: string;
  lat: number;
  lng: number;
}

export interface ISearchFailAction extends Action<"SEARCH_FAIL"> {
  error: { message: string };
}

export type TAction = ISearchSuccessAction | ISearchAction | ISearchFailAction;

export interface IPlacesListState {
  isLoading?: boolean;
  error?: { message: string } | null;
  data?: IObject;
  photo?: any;
}
