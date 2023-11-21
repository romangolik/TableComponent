import React from "react";

import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import Icon from "@components/ui/Icon";

import { Column } from "./types/table";

import notFoundDataImage from "@assets/images/not-found-data.svg";

import "./Table.scss";

interface TableProps<T extends { id: number }> {
  data: T[];
  page: number;
  count: number;
  columns: Column<T>[];
  rowsPerPage: number;
  enableDelete?: boolean;
  onPageChange?: (value: number) => void;
  onDeleteAction?: (value: number) => void;
  onRowsPerPageChange?: (value: number) => void;
}

const CustomTable = <T extends { id: number }>({
  data,
  page,
  count,
  columns,
  rowsPerPage,
  enableDelete = false,
  onPageChange,
  onDeleteAction,
  onRowsPerPageChange,
}: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const columnsCount = columns.length + Number(enableDelete);

  function pageChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) {
    const nextPage = page + 1;

    searchParams.set("page", nextPage.toString());
    setSearchParams(searchParams);

    if (onPageChange) {
      onPageChange(page + 1);
    }
  }

  function rowsPerPageChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    searchParams.set("page", "1");
    searchParams.set("limit", event.target.value);
    setSearchParams(searchParams);

    if (onRowsPerPageChange) {
      onRowsPerPageChange(+event.target.value);
    }
  }

  function deleteHandler(id: number) {
    if (onDeleteAction) {
      onDeleteAction(id);
    }
  }

  return (
    <div className="table">
      <TableContainer>
        <Table stickyHeader>
          <TableHead className="table__head">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className="table__image-cell"
                  style={{ width: column.width, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              {enableDelete && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="table__row">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="table__image-cell">
                    {column.format(item)}
                  </TableCell>
                ))}
                {enableDelete && (
                  <TableCell className="table__delete-cell">
                    <button
                      className="table__delete-button"
                      onClick={() => deleteHandler(item.id)}>
                      <Icon
                        name="cancel"
                        className="table__delete-button-icon"
                      />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnsCount}>
                  <div className="table__not-found-data">
                    <div className="table__not-found-data-content">
                      <img
                        alt="Not found data"
                        className="table__not-found-data-image"
                        src={notFoundDataImage}
                      />
                      <p className="table__not-found-data-text">
                        Дані не знайдено
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 5, 10, 25, 50]}
        component="div"
        page={page - 1}
        count={count}
        rowsPerPage={rowsPerPage}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </div>
  );
};

export default CustomTable;
