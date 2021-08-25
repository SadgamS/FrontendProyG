import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
} from "@coreui/react";

import usersData from "./UsersData";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol xl={12}>
        <CButton className="m-2" color="success">
         Añadir usuario
        </CButton>
        <CCard>
          <CCardHeader>
            <h5 className="mt-2 font-weight-bold">Usuarios</h5>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                "id",
                { key: "name", _classes: "font-weight-bold", label:"Nombre" },
                "registered",
                "role",
                "status",
              ]}
              hover
              striped
              itemsPerPage={7}
              activePage={page}
              clickableRows
              pagination
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
