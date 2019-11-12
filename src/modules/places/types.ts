import { Action } from "redux";

export interface IMeta {
  code: number;
  requestId: string;
}

export interface IFilter {
  name: string;
  key: string;
}

export interface ISuggestedFilters {
  header: string;
  filters: IFilter[];
}

export interface INe {
  lat: number;
  lng: number;
}

export interface ISw {
  lat: number;
  lng: number;
}

export interface ISuggestedBounds {
  ne: INe;
  sw: ISw;
}

export interface IItem2 {
  summary: string;
  type: string;
  reasonName: string;
}

export interface IReasons {
  count: number;
  items: IItem2[];
}

// tslint:disable-next-line: no-empty-interface
export interface IContact {}

export interface ILabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

export interface ILocation {
  address: string;
  lat: number;
  lng: number;
  labeledLatLngs?: ILabeledLatLng[];
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

export interface IIcon {
  prefix: string;
  suffix: string;
}

export interface ICategory {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: IIcon;
  primary: boolean;
}

export interface IStats {
  tipCount: number;
  usersCount: number;
  checkinsCount: number;
  visitsCount: number;
}

export interface IBeenHere {
  count: number;
  lastCheckinExpiredAt: number;
  marked: boolean;
  unconfirmedCount: number;
}

export interface IPhotos {
  count: number;
  groups: any[];
}

export interface IHereNow {
  count: number;
  summary: string;
  groups: any[];
}

export interface IVenue {
  id: string;
  name: string;
  contact: IContact;
  location: ILocation;
  categories: ICategory[];
  verified: boolean;
  stats: IStats;
  beenHere: IBeenHere;
  photos: IPhotos;
  hereNow: IHereNow;
}

export interface IItem {
  reasons: IReasons;
  venue: IVenue;
  referralId: string;
}

export interface IGroup {
  type: string;
  name: string;
  items: IItem[];
}
export interface IWarning {
  text: string;
}
export interface IResponse {
  suggestedFilters: ISuggestedFilters;
  headerLocation: string;
  headerFullLocation: string;
  headerLocationGranularity: string;
  query: string;
  totalResults: number;
  suggestedBounds: ISuggestedBounds;
  groups: IGroup[];
  warning?: IWarning;
}

export interface IObject {
  meta: IMeta;
  response: IResponse;
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
