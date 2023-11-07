import { W3blockAPI } from '../../enums/W3blockAPI';

export enum FilterTableType {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
}

export enum FormatTypeColumn {
  TEXT = 'text',
  MONEY = 'money',
  LOCALTIME = 'localTime',
  MAPPING = 'mapping',
  HASH = 'hash',
  THUMBNAIL = 'thumbnail',
}

export enum FormatFilterType {
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  SEARCH = 'search',
  LOCALDATE = 'localDate',
  NUMBER = 'number',
}

export interface TableStylesClasses {
  root?: string;
  header?: string;
  line?: string;
}

export interface DataSource {
  type?: FilterTableType;
  url: string;
  itemsPath?: string;
  urlContext: W3blockAPI;
}

export interface XlsReportsDto {
  url: string;
  observerUrl: string;
  urlContext: W3blockAPI;
}
export interface FormatApiData {
  type: FormatTypeColumn;
  currencySymbolKey?: string;
  mapping?: any;
}

export interface FilterParameters {
  itemsPath: string;
  key: string;
  label: string;
  subLabel?: string;
}

export interface Actions {
  label?: string;
  conditions?: any;
  action: {
    type: 'navigate' | 'function';
    id?: string;
    data: any;
    replacedQuery?: Array<string>;
  };
}

export interface ColumnsTable {
  format: FormatApiData;
  key: string;
  sortable: boolean;
  sortableTamplate?: string;
  header: {
    label: string;
    filter?: {
      type: FilterTableType;
      format: FormatFilterType;
      filterClass?: string;
      placement?: 'internal' | 'external';
      values?: {
        label: string;
        value: string;
      }[];
      filterTemplate?: string;
      replacedFilterTemplate?: string;
      data?: {
        url: string;
        parameters?: FilterParameters;
        filterUrlContext?: W3blockAPI;
      };
    };
  };
}

export interface ConfigGenericTable {
  dataSource?: DataSource;
  columns: Array<ColumnsTable>;
  xlsReports?: XlsReportsDto;
  tableStyles?: TableStylesClasses;
  actions?: Array<Actions>;
  lineActions?: Actions;
  externalFilterClasses?: {
    root?: string;
  };
}
