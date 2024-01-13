"use client";
// @mui
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";
// ----------------------------------------------------------------------
// STYLED COMPONENTS
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "unset",
    height: 48,
    color: "gray",
    textAlign: "center",
    fontWeight: 650,
    backgroundImage: "unset",
    textTransform: "capitalize",
    fontSize: 14,
    whiteSpace: "nowrap",
    borderBottom: "none",
    cursor: "pointer",
    zIndex: "1",
    padding: "0px 15px",
  },
  [`&.${tableCellClasses.root}`]: {
    boxShadow: "unset !important",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "left",
    borderBottom: "none",
    whiteSpace: "pre-wrap",
    padding: "10px 15px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "#fff",
  // hide last border
  "&:last-child th": {
    border: 0,
    borderRadius: 0,
  },
  "&:first-child th": {
    background: "#D3D3D3",
    border: 0,
    borderRadius: 2,
  },
  "&:first-of-type": {
    background: "#fff",
  },
}));

// ----------------------------------------------------------------------
// styles

export const styles = {
  tableContainer: (tableContainerSX: any, theme: any) => ({
    "&::-webkit-scrollbar": {
      width: 10,
      height: 10,
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#7b73fa",
      borderRadius: 2,
    },
    mt: theme.palette.mode === "dark" ? 0.5 : 0,
    backgroundColor: "#7b73fa",
    ...tableContainerSX,
  }),
  cell: {
    display: "flex",
    justifyContent: "flex-start",
  },
  currentPageBox: {
    display: "flex",
    my: "15px",
    px: "25px",
    alignItems: "center",
    justifyContent: "end",
  },
  currentPage: (theme: any) => ({
    color: theme.palette.grey[600],
    fontSize: "12px",
    fontFamily: theme.typography.fontFamily,
  }),
  error: (theme: Theme) => ({
    background: "#7b73fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  }),
  pagination: (theme: any) => ({
    ".Mui-selected": {
      backgroundColor: `"#7b73fa !important`,
      color: "#FFFFFF",
    },
  }),
};
