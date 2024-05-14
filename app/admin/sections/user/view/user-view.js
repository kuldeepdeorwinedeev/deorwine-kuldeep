"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Iconify from "@/app/admin/components/iconify/iconify";
import Scrollbar from "@/app/admin/components/scrollbar";
import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import { emptyRows, applyFilter, getComparator } from "../utils.js";
import { fetchUsers } from "@/app/admin/api-data/user.data";
import Link from "next/link";
import { useQuery, QueryClient } from "react-query";
import UserTableToolbar from "../user-table-toolbar";

export default function UserPage() {
  const queryClient = new QueryClient();
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery("users", fetchUsers, {
    initialData: () => {
      if (typeof window === "undefined") {
        return fetchUsers();
      }
    },
  });

  useEffect(() => {
    if (usersData) {
      queryClient.setQueryData("users", usersData);
    }
  }, [usersData, queryClient]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersData.map((user) => user.user_id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, user_id) => {
    const selectedIndex = selected.indexOf(user_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: usersData || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // Check if dataFiltered[0] is an array before calling slice
  const data = Array.isArray(dataFiltered[0])
    ? dataFiltered[0].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  const notFound = !dataFiltered.length && !!filterName;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h4">Users</Typography>
        <Link href="/admin/add-user">
          {" "}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Link>
      </Stack>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          {usersData && (
            <TablePagination
              page={page}
              component="div"
              count={usersData.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={usersData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "company", label: "Company" },
                  { id: "role", label: "Role" },
                  { id: "isVerified", label: "Verified", align: "center" },
                  { id: "status", label: "Status" },
                  { id: "" },
                ]}
              />

              <TableBody>
                {data.map((row) => (
                  <UserTableRow
                    key={row.user_id}
                    name={row.username}
                    role={row.role}
                    status={row.status}
                    company={row.company}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.verified}
                    selected={selected.indexOf(row.user_id) !== -1}
                    handleClick={(event) => handleClick(event, row.user_id)}
                    user_id={row.user_id}
                  />
                ))}
                <TableEmptyRows
                  height={5}
                  emptyRows={emptyRows(page, rowsPerPage, usersData.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
