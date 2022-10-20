import * as React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Grid,
  Toolbar,
  Collapse,
  Box,
  Checkbox,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";

import { stableSort, getComparator, Order } from "../../../utils/table-sort";

import { Save, Edit, Delete, Cancel } from "@material-ui/icons";
import { getImageApiUrl } from "../../../apis";
import { DefectModeData } from "../../../types/defect-mode-page-state";

const styles = (theme: Theme) => ({
  paper: {
    width: "100%",
    overflow: "hidden",
  },
  tableContainer: {
    maxHeight: 1800,
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

function Row(props: {
  row: DefectModeData;
  onSave: (id: number, defectMode: string, note: string) => void;
  onDelete: (id: number) => void;
}) {
  const { row, onSave, onDelete } = props;
  const [edit, setEdit] = React.useState<boolean>(false);

  const [note, setNote] = React.useState(row.note);
  const [defectMode, setDefectMode] = React.useState(row.defectMode);


  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDefectMode(event.target.value);
    },
    [defectMode]
  );
  const handleInputNoteChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNote(event.target.value);
    },
    [note]
  );
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setNote(event.target.value as string);
  };

  // const handleSave = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
  //   setMemo(event.target.value as string);
  // };
  const handleSaveClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onSave(parseInt(event.currentTarget.id), defectMode, note);
    },
    [defectMode, note]
  );

  const handleCancelClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setDefectMode(row.defectMode);
      setNote(row.note)
    },
    [defectMode, note]
  );

  const handleDeleteClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const answer = window.confirm("この欠陥モードを登録リストから削除します。よろしいですか？");
      if (answer) {
        onDelete(parseInt(event.currentTarget.id))
      } else {
        console.log("nothing happened");
      }
    },
    []
  );

  const MemoOptions = () => (
    <FormControl size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={note}
        onChange={handleChange}
      >
        <option value={"既知"}>既知</option>
        <option value={"未知"}>未知</option>
      </Select>
    </FormControl>
  );

  return (
    <React.Fragment>
      <TableRow>
        <TableCell key="itemID">{row.itemID}</TableCell>
        <TableCell key="day">{row.day}</TableCell>
        <TableCell key="vol">{row.vol}</TableCell>
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
          {edit ? (
            <TextField
              required
              id="defectMode"
              label="defectMode"
              value={defectMode}
              // style={{ width: 100 }}
              onChange={handleInputChange}
              placeholder="defectMode"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            row.defectMode
          )}
        </TableCell>

        <TableCell key="note" align="right">
          {edit ? (
            <TextField
              required
              id="note"
              label="note"
              value={note}
              // style={{ width: 100 }}
              onChange={handleInputNoteChange}
              placeholder="note"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            row.defectMode
          )}
        </TableCell>

        <TableCell key="edit">
          <div style={{ cursor: "pointer" }} onClick={() => setEdit(!edit)}>
            {edit ? (
              <div>
                <div
                  id={row.id.toString()}
                  onClick={handleSaveClick}
                // variant="contained"
                // color="primary"
                >
                  <Save />
                </div>
                <div onClick={handleCancelClick}>
                  <Cancel />
                </div>
              </div>
            ) : (
              <Edit />
            )}
          </div>
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
        <TableCell key="createdBy" align="right">
          {row.createdBy}
        </TableCell>
        <TableCell key="updatedAt" align="right">
          {row.updatedAt}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  rows: DefectModeData[];
  onRowEditSave: (id: number, defectMode: string, memo: string) => void;
  onRowDelete: (id: number) => void;
}
export const DetailTable = withStyles(styles)<
  React.FunctionComponent<Props & WithStyles<typeof styles>>
>(
  ({ 
    classes, 
    rows, 
    onRowEditSave, 
    onRowDelete 
  }) => {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof DefectModeData>("vol");
    const createSortHandler =
      (property: keyof DefectModeData) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
      };

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [open, setOpen] = React.useState(true);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };

  return (
    <Paper className={classes.paper}>
      <Toolbar style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          className={classes.typography}
        >
          Detail
        </Typography>
      </Toolbar>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <TableCell style={{ width: 50 }} /> */}
                <TableCell
                  key="itemID"
                  style={{ width: 50 }}
                  sortDirection={orderBy === "itemID" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "itemID"}
                    direction={orderBy === "itemID" ? order : "asc"}
                    onClick={createSortHandler("itemID")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  key="day"
                  style={{ width: 50 }}
                  sortDirection={orderBy === "day" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "day"}
                    direction={orderBy === "day" ? order : "asc"}
                    onClick={createSortHandler("day")}
                  >
                    DAY
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  key="vol"
                  style={{ width: 50 }}
                  sortDirection={orderBy === "vol" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "vol"}
                    direction={orderBy === "vol" ? order : "asc"}
                    onClick={createSortHandler("vol")}
                  >
                    VOL
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  key="openo"
                  align="right"
                  style={{ width: 200 }}
                  sortDirection={orderBy === "openo" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "openo"}
                    direction={orderBy === "openo" ? order : "asc"}
                    onClick={createSortHandler("openo")}
                  >
                    OPE_NO
                  </TableSortLabel>
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
                <TableCell
                  key="defectMode"
                  align="right"
                  style={{ minWidth: 200 }}
                >
                  欠陥モード
                </TableCell>
                <TableCell key="note" style={{ width: 100 }}>
                  NOTE
                </TableCell>
                <TableCell key="edit" style={{ minWidth: 50 }}>
                  編集
                </TableCell>
                <TableCell key="delete" style={{ minWidth: 50 }}>
                  削除
                </TableCell>
                <TableCell key="createdBy" style={{ minWidth: 50 }}>
                  createdBy
                </TableCell>
                <TableCell key="updatedAt" style={{ minWidth: 50 }}>
                  updatedAt
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row) => {
                  return <Row key={row.id} row={row} onSave={onRowEditSave} onDelete={onRowDelete} />;
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
          <Grid item>
            <TextField
              onChange={handleChangeRowsPerPage}
              select={true}
              value={rowsPerPage}
              variant="outlined"
            >
              {[
                {
                  label: "50",
                  value: "50",
                },
                {
                  label: "100",
                  value: "100",
                },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              size="large"
              page={page}
              color="primary"
              variant="outlined"
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
});
