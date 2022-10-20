import React from "react";
import { AddNewItem } from "../../../types/defect-mode-page-state";
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
} from "@material-ui/core";
import {  Add, Delete, Cancel, Save } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
    flexGrow: 1,
  },
  container: {
    maxHeight: "100%",
    paddingLeft: "40px",
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
  deleteButton: {
    color: "white",
    background: "#b2102f",
  },
  tableContainer: {
    height: 440,
  },
  typography: {
    fontWeight: 600,
  },
}));
interface Props {
  newItems: AddNewItem[];
  onAddClick: (
    vol: string,
    openo: string,
    testno: string,
    clusterno: string,
    day: string
  ) => void;
  onRequest: (newItems: AddNewItem[],defectMode: string, memo:string, ) => void;
  onReset: () => void;
  onDelete: (id: number) => void;
}

export const AddBox: React.FunctionComponent<Props> = ({
  newItems,
  onAddClick,
  onRequest,
  onReset,
  onDelete
}) => {
  const initialInputState = {
    vol: "",
    openo: "",
    testno: "",
    clusterno: "",
    day: "",
  }
  const initialMemo = '既知'
  const initialDefectMode = ''

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [inputState, setInputState] = React.useState(initialInputState);
  const [memo, setMemo] = React.useState(initialMemo);
  const [defectMode, setDefectMode] = React.useState(initialDefectMode);

  const handleSearch = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (
        inputState.vol === "" ||
        inputState.openo === "" ||
        inputState.testno === "" ||
        inputState.clusterno === "" ||
        inputState.day === ""
      ) {
        return;
      }
      onAddClick(
        inputState.vol,
        inputState.openo,
        inputState.testno,
        inputState.clusterno,
        inputState.day
      );
      // setInputState(initialInputState)
    },
    [inputState]
  );

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputState({
        ...inputState,
        [event.target.id]: event.target.value.replace(/ /g, '_'),
      });
    },
    [inputState]
  );

  const handleDefectModeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDefectMode(event.target.value);
    },
    [defectMode]
  );

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setMemo(event.target.value as string);
  };

  const handleDeleteClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onDelete(parseInt(event.currentTarget.id))
    },
    []
  );
  
  const handleRequest = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
     onRequest(newItems, defectMode, memo)
     setInputState(initialInputState)
     setMemo(initialMemo)
     setDefectMode(initialDefectMode)
    },
    [newItems, defectMode, memo]
  );

  const handleCancel = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
     onReset()
     setInputState(initialInputState)
     setMemo(initialMemo)
     setDefectMode(initialDefectMode)
    },
    []
  );
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            className={classes.typography}
          >
            新規
          </Typography>
        </Toolbar>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid xs={12}>
            <TextField
              required
              id="vol"
              label="VOL"
              value={inputState.vol}
              // style={{ width: 100 }}
              onChange={handleInputChange}
              placeholder="22"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <TextField
              required
              id="openo"
              label="OPE_NO"
              value={inputState.openo}
              placeholder="LI_TUp_PLY.IQ1"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="testno"
              label="TESTNO"
              value={inputState.testno}
              placeholder="1"
              onChange={handleInputChange}
              // style={{ width: 100 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="clusterno"
              label="CLUSTERNO"
              value={inputState.clusterno}
              placeholder="1"
              onChange={handleInputChange}
              // style={{ width: 100 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="day"
              label="DAY"
              value={inputState.day}
              placeholder="28"
              onChange={handleInputChange}
              // style={{ width: 100 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              startIcon={<Add />}
              // className={classes.button}
            >
              Add
            </Button>
          </Grid>
          <Grid xs={12}>
            <TableContainer className={classes.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell style={{ width: 50 }} /> */}
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
                    <TableCell key="delete" style={{ minWidth: 50 }}>
                      削除
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newItems.map((row) => {
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
                        <TableCell key="delete">
                          <div
                            id={row.id.toString()}
                            style={{ cursor: "pointer" }}
                            onClick={handleDeleteClick}
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
          </Grid>
          <Grid xs={12}>
           <Grid item>

              <TextField
                id="defectMode"
                label="欠陥モード"
                value={defectMode}
                style={{ width: 300 }}
                onChange={handleDefectModeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={memo}
                onChange={handleChange}
              >
                <option value={"既知"}>既知</option>
                <option value={"未知"}>未知</option>
              </Select>
            </Grid>
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
                onClick={handleCancel}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
    </div>
  );
};
