import React from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../../store";
import { Action } from "../../../actions";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import { Divider, Paper, Grid, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import { DetailTable } from './detail-table'
import { AddBox } from './add-box'
import {AddEditTable} from './add-edit-box'

import { SearchRequest, AddNewItem, AddNewFromTable } from "../../../types/defect-mode-page-state";

const mapState = (state: State) => ({
  pageLocation: state.locationState,
  defectModeItems: state.defectModePage.defectModeItems,
  newItems: state.defectModePage.newItems,
  rows: state.defectModePage.rows,
  selectedRows: state.fullAnalysisPage.selectedRowId

});

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  searchAndAdd: (
     reqPayload : SearchRequest
    ) => {
    dispatch({
      payload: { searchRequest: reqPayload },
      type: "DEFECT_MODE_SEARCH_REQUEST",
    });
  },
  resetNewItems: (
   ) => {
   dispatch({
     type: "DEFECT_MODE_RESET_NEW_ITEMS",
   });
 },
 insertNewDefectModeItems: (newItems: AddNewItem[], defectMode: string, memo: string) => {
    dispatch({
      payload: {
        newItems: newItems,
        defectMode: defectMode,
        memo: memo
      },
      type: "DEFECT_MODE_INSERT_NEW_ITEMS",
    });
  },
  insertDefectModeItems: (rows: AddNewFromTable[]) => {
    dispatch({
      payload: {
        rows: rows,
      },
      type: "INSERT_NEW_ITEMS",
    });
  },
  editDefectModeItem: (id: number, defectMode: string, memo: string) => {
    dispatch({
      payload: {
        id,
        defectMode,
        memo
      },
      type: "EDIT_DEFECT_MODE_ITEM",
    });
  },
  deleteDefectModeItem: (id: number) => {
    dispatch({
      payload: {
        id
      },
      type: "DELETE_DEFECT_MODE_ITEM",
    });
  },
  deleteAddedItemFromList: (id: number) => {
    dispatch({
      payload: {
        id
      },
      type: "DELETE_ADDED_ITEM_FROM_LIST",
    });
  },
  onRemoveSelectedId: (removeId: number) => {
    dispatch({
      payload: { rowId:removeId, status:false},
      type: "FULL_ANALYSIS_PAGE_TABLE_SELECTED_ROW_UPDATE",
    });
    dispatch({
      payload: { rowId:removeId},
      type: "DEFECT_MODE_REMOVE_ROW",
    });
  },
  showNewRows:(selectedRows: number[]) =>{
    dispatch({
      payload: {
        selectedRows:selectedRows
      },
      type: "DEFECT_MODE_SHOW_NEW_ROWS",
    });
  }


});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux { }
const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    // width: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
    background: "#F1F1F1"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'scroll',
    '& .Component-paperModal-50': {
      padding: '500px 32px 24px',
    },
  },
  
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const Page = withStyles(styles)<
  React.FunctionComponent<Props & WithStyles<typeof styles>>
>(
  ({
    classes,
    pageLocation,
    defectModeItems,
    newItems,
    searchAndAdd,
    resetNewItems,
    insertNewDefectModeItems,
    insertDefectModeItems,
    editDefectModeItem,
    deleteDefectModeItem,
    deleteAddedItemFromList,
    onRemoveSelectedId,
    rows,
    selectedRows,
    showNewRows
  }) => {
    const handleAddClick = React.useCallback(
      (vol: string, openo: string, testno: string, clusterno: string, day: string) => {
        if(pageLocation.name !== "manage"){
          return
        }

          searchAndAdd({
            vol: vol,
            openo: openo,
            testno: testno,
            clusterno: clusterno,
            product: pageLocation.params.product,
            chipSize: pageLocation.params.chipSize, 
            day: day
        })
      },
      [defectModeItems]
    );

    const handleRequestClick = (newItems: AddNewItem[],defectMode: string, memo:string) => {
      // check there is no redundance
      insertNewDefectModeItems(newItems, defectMode, memo) 
    }

    const handleRegisterRequestClick = (rows: AddNewFromTable[]) => {
      // check there is no redundance
      insertDefectModeItems(rows) 
    }

    const handleResetClick = React.useCallback(() => {
      resetNewItems()
    }, []);

    const handleEditSave = (id: number, defectMode: string, memo:string) => {
      // check there is no redundance
      editDefectModeItem(id, defectMode, memo) 
    }
    
    const handleDelete = (id: number) => {
      deleteDefectModeItem(id) 
    }

    const handleRemoveAddedItemClick = (id: number) => {
      deleteAddedItemFromList(id) 
    }

    const handleRemoveSelectedId = (id: number) => {
      onRemoveSelectedId(id)
    }

    const [open, setOpen] = React.useState(false);  
    const handleShowRow = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        showNewRows(selectedRows)
       
      },
      [selectedRows]
      
    );
    const handleClose = () => {
      setOpen(false);
    };  

    return (
      <div className={classes.root}>
        <Paper>
          <Grid className={classes.paper}>
            <Button onClick={handleShowRow}>
              新規
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paperModal}>
                  <Grid className={classes.paper}>
                  <AddBox 
                    newItems={newItems}
                    onAddClick={handleAddClick}
                    onRequest={handleRequestClick}
                    onReset={handleResetClick}
                    onDelete={handleRemoveAddedItemClick}
                  />
                  </Grid>
                  <Grid className={classes.paper}>
                  <AddEditTable 
                    rows ={rows}
                    onRequest={handleRegisterRequestClick}
                    onRemoveSelectedId={handleRemoveSelectedId}
                  />
                  </Grid>
                </div>
              </Fade>
            </Modal>

            </Grid>
          <Grid className={classes.paper}>
            <DetailTable 
              rows={defectModeItems}
              onRowEditSave={handleEditSave}
              onRowDelete ={handleDelete}
            />
          </Grid>
           
          <Grid className={classes.paper}>
          </Grid>
       
        </Paper>
      </div>
    );
  }
);

export const ConnectedDefectModePage = connector(Page);
