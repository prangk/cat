import { selectToken, selectSelectedRowid } from "../selectors";
import {
  DefectModeLoadTables,
  DefectModePageReset,
  DefectModeLoadTablesFinished,
  DefectModeSearchRequest,
  DefectModeAppendNew,
  DefectModeInsertNewItems,
  InsertNewItems,
  EditDefectModeItem,
  DeleteDefectModeItem,
  DefectModeAppendNewFromTable,
} from "../actions/defect-mode-action";

import {
  fetchTableData,
  searchRequest,
  insertNewItemsRequest,
  editDefectModeItem,
  deleteDefectModeItem,
  fetchTableDataFromTable,
  insertNewItemsRequestFromTable,
} from "../apis/defect-mode-apis";
import { api, silenCall } from "./api-sagas";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { Action } from "../actions";
import { LocationState } from "../types/location-state";
import { State } from "../store";

function* handleLoadTables(action: DefectModeLoadTables) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }

  const product = action.payload.product;
  const chipSize = action.payload.chipSize;

  const res: ResolvedType<ReturnType<typeof fetchTableData>> = yield call(
    api,
    fetchTableData,
    token,
    product,
    chipSize
  );

  yield put<DefectModePageReset>({
    type: "DEFECT_MODE_PAGE_RESET",
  });

  yield put<DefectModeLoadTablesFinished>({
    payload: {
      defectModeItems: res,
    },
    type: "DEFECT_MODE_LOAD_TABLES_FINISHED",
  });
}

function* handleSearchRequest(action: DefectModeSearchRequest) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }
  const res: ResolvedType<ReturnType<typeof searchRequest>> = yield call(
    api,
    searchRequest,
    token,
    action.payload.searchRequest
  );

  yield put<DefectModeAppendNew>({
    payload: {
      newItem: res,
    },
    type: "DEFECT_MODE_APPEND_NEW",
  });

  // response.vol
}

function* handleInsertNewItemsRequest(action: DefectModeInsertNewItems) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }

  const res: ResolvedType<ReturnType<typeof insertNewItemsRequest>> =
    yield call(
      api,
      insertNewItemsRequest,
      token,
      action.payload.newItems,
      action.payload.defectMode,
      action.payload.memo
    );

  const locationState: LocationState = yield select(
    (state: State) => state.locationState
  );
  if (locationState.name !== "manage") {
    return;
  }
  const productId = locationState.params.product;
  const chipSize = locationState.params.chipSize;

  yield put<DefectModeLoadTables>({
    payload: { product: productId, chipSize: chipSize },
    type: "DEFECT_MODE_LOAD_TABLES",
  });
}

function* handleEditItem(action: EditDefectModeItem) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }

  const res: ResolvedType<ReturnType<typeof editDefectModeItem>> = yield call(
    api,
    editDefectModeItem,
    token,
    action.payload.id,
    action.payload.defectMode,
    action.payload.memo
  );

  const locationState: LocationState = yield select(
    (state: State) => state.locationState
  );
  if (locationState.name !== "manage") {
    return;
  }
  const productId = locationState.params.product;
  const chipSize = locationState.params.chipSize;

  yield put<DefectModeLoadTables>({
    payload: { product: productId, chipSize: chipSize },
    type: "DEFECT_MODE_LOAD_TABLES",
  });
}

function* handleDeleteItem(action: DeleteDefectModeItem) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }
  const res: ResolvedType<ReturnType<typeof deleteDefectModeItem>> = yield call(
    api,
    deleteDefectModeItem,
    token,
    action.payload.id
  );

  const locationState: LocationState = yield select(
    (state: State) => state.locationState
  );
  if (locationState.name !== "manage") {
    return;
  }
  const productId = locationState.params.product;
  const chipSize = locationState.params.chipSize;

  yield put<DefectModeLoadTables>({
    payload: { product: productId, chipSize: chipSize },
    type: "DEFECT_MODE_LOAD_TABLES",
  });
}

function* handleAddNewItemsFromTable(action: Action) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }

  const selectedRowId = yield select(selectSelectedRowid);
  const res: ResolvedType<ReturnType<typeof fetchTableDataFromTable>> =
    yield call(api, fetchTableDataFromTable, token, selectedRowId);

    yield put<DefectModePageReset>({
      type: "DEFECT_MODE_PAGE_RESET",
    });
  
  yield put<DefectModeAppendNewFromTable>({
    payload: {
      items: res,
    },
    type: "DEFECT_MODE_APPEND_NEW_FROM_TABLE",
  });
}

function* handleInsertItemsRequest(action: InsertNewItems) {
  const token = yield select(selectToken);
  if (!token) {
    yield put<Action>({
      type: "AUTHENTICATION_SIGNIN_REQUIRED",
    });
    return;
  }
  
  const res: ResolvedType<ReturnType<typeof insertNewItemsRequestFromTable>> =
    yield call(
      api,
      insertNewItemsRequestFromTable,
      token,
      action.payload.rows
    );

  const locationState: LocationState = yield select(
    (state: State) => state.locationState
  );
  if (locationState.name !== "manage") {
    return;
  }
  const productId = locationState.params.product;
  const chipSize = locationState.params.chipSize;

  yield put<DefectModeLoadTables>({
    payload: { product: productId, chipSize: chipSize },
    type: "DEFECT_MODE_LOAD_TABLES",
  });
}

export function* takeDefectModeActions() {
  yield takeEvery("DEFECT_MODE_LOAD_TABLES", silenCall(handleLoadTables));
  yield takeEvery("DEFECT_MODE_SEARCH_REQUEST", silenCall(handleSearchRequest));
  yield takeEvery(
    "DEFECT_MODE_INSERT_NEW_ITEMS",
    silenCall(handleInsertNewItemsRequest)
  );
  yield takeEvery("INSERT_NEW_ITEMS",silenCall(handleInsertItemsRequest));
  yield takeEvery("EDIT_DEFECT_MODE_ITEM", silenCall(handleEditItem));
  yield takeEvery("DELETE_DEFECT_MODE_ITEM", silenCall(handleDeleteItem));
  yield takeEvery("DEFECT_MODE_SHOW_NEW_ROWS", silenCall(handleAddNewItemsFromTable));
  
}
