import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilAccountLogout, cilUserPlus } from "@coreui/icons";
import useUser from "src/hooks/useUser";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const {logout} = useUser();

  const handleClick = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logoetv" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CHeaderNavLink to="#">
          <CIcon content={cilUserPlus} alt="Perfil" />
          &nbsp;Perfil de usuario
        </CHeaderNavLink>
        <CHeaderNavLink onClick={handleClick}>
          <CIcon content={cilAccountLogout} alt="Salir" />
          &nbsp;Cerrar Sesión
        </CHeaderNavLink>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          {/* <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-account-logout" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/perfil"
          >
            <CIcon content={cilUserPlus} alt="Perfil" />
            &nbsp;Perfil de usuario
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon content={cilAccountLogout} alt="Salir" />
            &nbsp;Cerrar Sesión
          </CLink> */}
          Bienvenido 
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
