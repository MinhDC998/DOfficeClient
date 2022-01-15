import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as FilterIcon } from "../icons/filter.svg";
import "./filter.module.scss";

function FilterOption() {
  return (
    <div>
      <NavItem icon={<FilterIcon />}>
        <DropdownMenu />
      </NavItem>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-ite">
      <a href="#" className="icon-butto" onClick={() => setOpen(!open)}>
        <div style={{ height:'40px', width:'40px' }}>{props.icon}</div>
      </a>

      {open && props.children}
    </div>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-ite"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-butto">
          <div style={{ height:'40px', width:'40px' }}>{props.leftIcon}</div>
        </span>
        {props.children}
        {/* <span className="icon-right">{props.rightIcon}</span> */}
      </a>
    );
  }

  return (
    <div className="dropdow" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menuu">
          <DropdownItem goToMenu="categories">Loại tài liệu</DropdownItem>
          <DropdownItem goToMenu="types">Kiểu tài liệu</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "categories"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menuu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Loại tài liệu</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BellIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BellIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BellIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BellIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "types"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Kiểu tài liệu</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Công khai</DropdownItem>
          <DropdownItem leftIcon="🐸">Riêng tư</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default FilterOption;
