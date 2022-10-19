import React from "react";
import {useSelector} from 'react-redux'
import { AddNewFromTable } from "../../../types/defect-mode-page-state";
import { getImageApiUrl } from "../../../apis";

import {
  Typography,
  TextField,
  Paper,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Toolbar,
  Collapse,
  IconButton,
  MenuItem,
  TableSortLabel,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import CancelIcon from "@material-ui/icons/Cancel";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import { stableSort, getComparator, Order } from "../../../utils/table-sort";
import {  Add, Delete, Cancel, Save } from "@material-ui/icons";

const styles = (theme: Theme) => ({
  paper: {
    width: "100%",
    overflow: "hidden",
  },
  tableContainer: {
    // maxHeight: 600,
  },
  table: {
    minWidth: 650,
    size: "small",
  },
  item: {
    "&.MuiGrid-spacing-xs-2": {
      margin: "1px",
    },
  },
  typography: {
    fontWeight: 600,
  },
});

interface Props {
  rows: AddNewFromTable[];
  onRemoveSelectedId: (id: number) => void;
  onRequest: (rows: AddNewFromTable[]) => void;
}
export const AddEditTable = withStyles(styles)<
  React.FunctionComponent<Props & WithStyles<typeof styles>>
>(
  ({
    classes,
    rows, 
    onRequest,
    onRemoveSelectedId
  }) => {
   
    const initialTableState = {
      id: 0,
      itemID: 0,
      seq: 0,
      openo: "",
      testno: "",
      clusterno: "",
      mapImage: "",
      semImage1: "",
      defectMode: "",
      trend:"",
      note:"",
      product: "",
      chipSize: "",
      vol: "",
      day: "",
      reportId: "",
    }
    
    // const [insertTable, setInsertTable] = React.useState(initialDefectMode);
    const transaction = useSelector((state) => initialTableState)
    const [localTransaction, setLocalTransaction] = React.useState(null)
    
    React.useEffect(() => {
      if (!localTransaction && transaction) {
        setLocalTransaction(transaction);
      }
    }, [transaction, localTransaction])

    const initialDefectMode = ''
    const initialNote = ''

    const [open, setOpen] = React.useState(true);
    const [defectMode, setDefectMode] = React.useState<Array<AddNewFromTable>>(rows);
    const [note, setNote] = React.useState(initialNote);
    
    const handleRemove = (event: React.MouseEvent<HTMLElement>, id: number) => {
      onRemoveSelectedId(id);
    }
 
    const handleDefectModeChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefectMode(event.target.value);
      },
      [defectMode]
    );

    const handleNoteChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const updatedId = event.target.id
        
        let temp = copy defectMode to temp
        
        for objectRow in temp:
            if objectRow.id == updatedId:
                objectRow.note = value
        
        setDefectMode(temp)
        
        // setNote(event.target.value);
      },
      [defectMode]
    );

    const handleRequest = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
       onRequest(defectMode)
      },
      [rows]
    );

    console.log(defectMode)
    console.log(note)
    return (
      <Paper className={classes.paper}>
        <Toolbar style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            className={classes.typography}
          >
            新規2
          </Typography>
        </Toolbar>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              aria-label="sticky table"
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                <TableCell key="day" style={{ width: 50 }}>
                      DAY
                    </TableCell>
                    <TableCell key="vol" style={{ width: 50 }}>
                      VOL
                    </TableCell>
                    <TableCell key="seq" style={{ width: 50 }}>
                      SEQ
                    </TableCell>
                    <TableCell key="openo" align="right" style={{ width: 200 }}>
                      OPE_NO
                    </TableCell>
                    <TableCell key="testno" style={{ width: 50 }}>
                      TESTNO
                    </TableCell>
                    <TableCell key="clusterno" style={{ width: 50 }}>
                      CLUSTERNO
                    </TableCell>
                    <TableCell key="mapImage" style={{ width: 150 }}>
                      MAP
                    </TableCell>
                    <TableCell key="semImage1" style={{ width: 150 }}>
                      SEM1
                    </TableCell>
                    <TableCell key="trend" style={{ width: 150 }}>
                      TREND
                    </TableCell>
                    <TableCell key="defectMode" style={{ width: 150 }}>
                      欠陥モード
                    </TableCell>
                    <TableCell key="note" style={{ width: 150 }}>
                      NOTE
                    </TableCell>
                    <TableCell key="delete" style={{ minWidth: 50 }}>
                      削除
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {defectMode.map((row) => {
                    return (
                      <TableRow>
                        <TableCell key="day">{row.day}</TableCell>
                        <TableCell key="vol">{row.vol}</TableCell>
                        <TableCell key="seq">{row.seq}</TableCell>
                        <TableCell key="openo" align="right">
                          {row.openo}
                        </TableCell>
                        <TableCell key="testno" align="right">
                          {row.testno}
                        </TableCell>
                        <TableCell key="clusterno" align="right">
                          {row.clusterno}
                        </TableCell>
                        <TableCell key="mapImage" align="right">
                          <img
                            alt="Map or Graph image"
                            src={getImageApiUrl(row.mapImage)}
                            style={{
                              maxHeight: 128,
                              maxWidth: 180,
                            }}
                          />
                        </TableCell>
                        <TableCell key="semImage1" align="right">
                          <img
                            alt="Map or Graph image"
                            src={getImageApiUrl(row.semImage1)}
                            style={{
                              maxHeight: 128,
                              maxWidth: 180,
                            }}
                          />
                        </TableCell>
                        <TableCell key="trend" align="right">
                          <img
                            alt="Map or Graph image"
                            src={getImageApiUrl(row.trend)}
                            style={{
                              maxHeight: 128,
                              maxWidth: 180,
                            }}
                          />
                        </TableCell>

                        <TableCell key="defectMode" align="right">   

                          <TableCell>
                            {rows.map((newRow) => {
                              if (newRow === row) {
                                return (
                                  <div style={{ paddingBottom: "0.5rem" }}>              
                                    <TextField
                                      id = "defectMode"
                                      variant="outlined"
                                      size="small"
                                      value={row.defectMode}
                                      onChange={handleDefectModeChange}
                                    />
                                  </div>
                                );
                              } else {
                                return false;
                              }
                            })}
                          </TableCell>
                
                        </TableCell>

                        <TableCell key="note" align="right">   
                        
                        <TableCell>
                  
                                <div style={{ paddingBottom: "0.5rem" }}>
                                  <TextField
                                    id = "note"
                                    key = row.id
                                    variant="outlined"
                                    style={{ right: "0.875rem" }}
                                    size="small"
                                    value={row.note}
                                    onChange={handleNoteChange}
                                  />
                                </div>
                        
                        </TableCell>
                     
                        </TableCell>
                        <TableCell key="delete">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(e) => handleRemove(e, row.id)}
                          >
                            <Delete />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}                
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.item}
          >
          </Grid>

          <Grid xs={12}>
          <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRequest}
                startIcon={<Save />}
              >
                Request
              </Button>
              <Button
                variant="contained"
                // onClick={handleCancel}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>            
        </Collapse>
      </Paper>
    );
  }
);
