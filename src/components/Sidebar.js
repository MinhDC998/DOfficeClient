
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSave, faList, faFileAlt, faCalendar, faSignOutAlt, faTable, faTimes, faBriefcase, faBox, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

import { useSelector } from "react-redux";

export default (props = {}) => {
  
  const { user,role } = useSelector(state => state.authentication);

  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const signOut = () => {
    Cookie.remove('authToken');
    window.location.href = '/';
  }

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button onClick={signOut} variant="secondary" size="xs" className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="D Office" link={Routes.Presentation.path} image={ReactHero} />

              {/* <NavItem title="Overview" link={Routes.DashboardOverview.path} icon={faChartPie} /> */}
              <NavItem title="User" link={Routes.User.path} icon={faUser} />
              <NavItem title="Văn bản đến" link={Routes.ComingDispatchManagement.path} icon={faFileAlt} />
              <NavItem title="Văn bản đi" link={Routes.OutGoingDispatchManagement.path} icon={faFileAlt} />
              {/* <NavItem title="Quản lý công việc" link={Routes.WorkManagement.path} icon={faTable} /> */}
              <CollapsableNavItem eventKey="tables/" title="Quản lý công việc" icon={faTable}>

                <NavItem title="Tất cả công việc" link={Routes.WorkManagement.path} icon={faTable} />
                <NavItem title="Công việc của tôi" link={'/work/user/' + user.id} icon={faBriefcase} />
                <NavItem title="Công việc lưu trữ" link={Routes.StoredWorks.path} icon={faBoxOpen} />

                <Dropdown.Divider className="my-1 border-white" />
                <NavItem title="Tác vụ" link={Routes.TaskManagement.path} icon={faList} />
                <NavItem title="Tác vụ của tôi" link={'/task/user/' + user.id} icon={faBriefcase} />

              </CollapsableNavItem>

              {/* <NavItem title="Lịch" link={Routes.Calendar.path} icon={faCalendar} /> */}
              <CollapsableNavItem eventKey="Lịch/" title="Lịch" icon={faCalendar}>
                <NavItem title="Lịch làm việc" link={Routes.Calendar.path} icon={faCalendar} />
                <NavItem title="Lịch họp" link={Routes.MeetingCalendar.path} icon={faCalendar} />

                <Dropdown.Divider className="my-1 border-white" />
                <NavItem title="Danh sách họp" link={Routes.MeetingManager.path} icon={faList} />

                <NavItem title="Lời mời" icon={faList} link={Routes.MeetingIntivation.path} />
              </CollapsableNavItem>







              {/*<CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>*/}
              {/*  <NavItem title="Văn bản đi" link={Routes.OutGoingDispatchManagement.path} icon={faUser} />*/}
              {/*</CollapsableNavItem>*/}



              {/* 
              <CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem> */}




            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
