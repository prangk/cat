import { FSAAuto } from "flux-standard-action";
import {
  DefectModeData,
  SearchRequest,
  AddNewItem,
  AddNewFromTable,
} from "../types/defect-mode-page-state";

export type DefectModePageReset = FSAAuto<"DEFECT_MODE_PAGE_RESET">;

export type DefectModeLoadTablesFinished = FSAAuto<
  "DEFECT_MODE_LOAD_TABLES_FINISHED",
  {
    defectModeItems: DefectModeData[];
  }
>;

export type DefectModeLoadTables = FSAAuto<
  "DEFECT_MODE_LOAD_TABLES",
  {
    product: string;
    chipSize: string;
  }
>;

export type DefectModeSearchRequest = FSAAuto<
  "DEFECT_MODE_SEARCH_REQUEST",
  {
    searchRequest: SearchRequest;
  }
>;

export type DefectModeAppendNew = FSAAuto<
  "DEFECT_MODE_APPEND_NEW",
  {
    newItem: AddNewItem;
  }
>;

export type DefectModeResetNewItems = FSAAuto<"DEFECT_MODE_RESET_NEW_ITEMS">;

export type DefectModeInsertNewItems = FSAAuto<
  "DEFECT_MODE_INSERT_NEW_ITEMS",
  {
    newItems: AddNewItem[];
    defectMode: string;
    memo: string;
  }
>;

export type InsertNewItems = FSAAuto<
  "INSERT_NEW_ITEMS",
  {
    rows: AddNewFromTable[];
  }
>;

export type DefectModeShowNewItems = FSAAuto<
  "DEFECT_MODE_SHOW_NEW_ROWS",
  {
    selectedRows:number[]
  }
>;

export type DefectModeAppendNewFromTable = FSAAuto<
  "DEFECT_MODE_APPEND_NEW_FROM_TABLE",
  {
    items: AddNewFromTable[];
  }
>;


export type EditDefectModeItem = FSAAuto<
  "EDIT_DEFECT_MODE_ITEM",
  {
    id: number;
    defectMode: string;
    memo: string;
  }
>;

export type DeleteDefectModeItem = FSAAuto<
  "DELETE_DEFECT_MODE_ITEM",
  {
    id: number;
  }
>;

export type DeleteAddedItemFromList = FSAAuto<
  "DELETE_ADDED_ITEM_FROM_LIST",
  {
    id: number;
  }
>;

export type DefectModePageRemoveRow = FSAAuto<
  "DEFECT_MODE_REMOVE_ROW",
  {
    rowId: number;
  }
>;

export type DefectModeAction =
  | DefectModeLoadTables
  | DefectModePageReset
  | DefectModeLoadTablesFinished
  | DefectModeSearchRequest
  | DefectModeAppendNew
  | DefectModeResetNewItems
  | DefectModeInsertNewItems
  | InsertNewItems
  | EditDefectModeItem
  | DeleteDefectModeItem
  | DeleteAddedItemFromList
  | DefectModeAppendNewFromTable
  | DefectModeShowNewItems
  | DefectModePageRemoveRow;
