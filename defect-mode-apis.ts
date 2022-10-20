import { callApi, getPrefixIncludedApiUrl } from "../apis";
import {
  DefectModeState,
  DefectModeData,
  SearchRequest,
  AddNewItem,
  AddNewFromTable,
} from "../types/defect-mode-page-state";
import querystring from "querystring";

export const fetchTableData = async (
  token: string,
  product: string,
  chipSize: string
): Promise<DefectModeData[]> => {
  const query =
    "?" +
    querystring.stringify({
      product,
      chipSize,
    });

  const response = await callApi("defect-mode" + query, token);
  if (!response.ok) {
    throw new Error("Could not fetch defect-mode table data");
  }
  const json = await response.json();
  const tableRows: DefectModeData[] = json.defectModeItems.map(
    (entry: DefectModeData) => ({
      id: entry.id,
      vol: entry.vol,
      day: entry.day,
      openo: entry.openo,
      testno: entry.testno,
      clusterno: entry.clusterno,
      mapImage: entry.mapImage,
      semImage1: entry.semImage1,
      defectMode: entry.defectMode,
      memo: entry.memo,
      product: entry.product,
      chipSize: entry.chipSize,
      createdBy: entry.createdBy,
      updatedBy: entry.updatedBy,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      trend: entry.trend,
      itemID: entry.itemID
    })
  );

  return tableRows;
};

export const searchRequest = async (
  token: string,
  searchRequest: SearchRequest
): Promise<AddNewItem> => {
  const query =
    "?" +
    querystring.stringify({
      product: searchRequest.product,
      chipSize: searchRequest.chipSize,
      day: searchRequest.day,
      vol: searchRequest.vol,
      openo: searchRequest.openo,
      testno: searchRequest.testno,
      clusterno: searchRequest.clusterno,
    });
  const response = await callApi("tabledata/search" + query, token);

  if (!response.ok) {
    throw new Error("Search data not found");
  }
  const json = await response.json();

  return {
    id: json.id,
    seq: json.seq,
    openo: json.openo,
    testno: json.testno,
    clusterno: json.clusterno,
    mapImage: json.mapImage,
    semImage1: json.semImage1,
    product: json.product,
    chipSize: json.chipSize,
    vol: json.vol,
    day: json.day,
    reportId: json.reportId,
    trend: json.trend,
    itemID: json.itemID,
  };
};

export const insertNewItemsRequest = async (
  token: string,
  newItems: AddNewItem[],
  defectMode: string,
  memo: string
): Promise<null> => {
  const response = await fetch(getPrefixIncludedApiUrl("defect-mode"), {
    headers: {
      Authorization: "Bearer " + String(token),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      newItems,
      defectMode,
      memo,
    }),
  });
  console.log("newItems",newItems)
  console.log("defect-mode response",response)
  if (!response.ok) {
    throw new Error("Insert Error");
  }
  const json = await response.json();

  return null;
};

export const editDefectModeItem = async (
  token: string,
  id: number,
  defectMode: string,
  memo: string
): Promise<null> => {
  const response = await fetch(
    getPrefixIncludedApiUrl(`defect-mode/edit/${id}`),
    {
      headers: {
        Authorization: "Bearer " + String(token),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        defectMode,
        memo,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Insert Error");
  }
  const json = await response.json();

  return null;
};

export const deleteDefectModeItem = async (
  token: string,
  id: number
): Promise<null> => {
  const response = await fetch(
    getPrefixIncludedApiUrl(`defect-mode/delete/${id}`),
    {
      headers: {
        Authorization: "Bearer " + String(token),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Insert Error");
  }
  const json = await response.json();

  return null;
};

export const fetchTableDataFromTable = async (
  token: string,
  selectedRowId: number[]
): Promise<AddNewFromTable[]> => {
  // const wafer_ids = ["EE0022975.06", "EE0022981.06"];
  // const wafer_ids: string[] = [];
  // const q = querystring.stringify({
  //   dataId: [16274, 16275, 16276],
  // });
  const q = querystring.stringify({
    dataId: selectedRowId,
  });
  
  const query = "?" + q;
  const response = await callApi("defect-mode/add" + query, token);
  if (!response.ok) {
    throw new Error("TEST");
  }
  const json = await response.json();
  return json.data;
};

export const insertNewItemsRequestFromTable = async (
  token: string,
  rows: AddNewFromTable[],
): Promise<null> => {
  const response = await fetch(getPrefixIncludedApiUrl("defect-mode/add"), {
    headers: {
      Authorization: "Bearer " + String(token),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      rows,
    }),
  });
  console.log("APIS",rows)
  console.log("defect-mode/add response",response)
  if (!response.ok) {
    throw new Error("Insert Error");
  }
  const json = await response.json();

  return null;
};