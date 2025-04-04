import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { Button, Col, Row, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>
];

function Header({ onPress, collapsed, handleCollapsed }) {
  useEffect(() => window.scrollTo(0, 0));

  const isLogged = localStorage.getItem("isLogged");
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role"); // Ajouté pour récupérer le rôle de l'utilisateur
  const redirectToHome = () => {
		window.location.href = "http://127.0.0.1:8000";
	};
  const redirectToHR = () => {
		window.location.href = "http://127.0.0.1:3000";
	};


  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    let themeClass = isDarkMode ? "dark-theme" : "light-theme";
    if (role === "Professionnel") {
      themeClass += " professional-sidenav-bg";
    }
    if (role === "Particulier") {
      themeClass += " particular-sidenav-bg";
    }
    document.body.className = themeClass;
  }, [isDarkMode, role]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={4}>
          <div className={styles.sidebarTogglerPC}>
            {isLogged &&
              React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: `${styles.trigger}`,
                  onClick: () => handleCollapsed(!collapsed)
                }
              )}
          </div>
        </Col>
        <Col span={24} md={20} className={styles.headerControl}>
          <DarkModeSwitch
            style={{ margin: "1rem" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
          {isLogged && (
            <Typography.Title level={5} style={{ margin: 0 }} className="me-3">
              <UserOutlined style={{ fontSize: "16px" }} /> {user}
            </Typography.Title>
          )}
          {isLogged && (
              <div>
                         {/* ... */}
                            <Button
                               type="primary"
                               className={styles.footButton} // Ajoutez la classe CSS appropriée pour le style du bouton
                               onClick={redirectToHome}
                            >
                              Module Gestion des soins
                            </Button>
                        {/* ... */}
                        </div>
          )}
          {isLogged && (
              <div>
                         {/* ... */}
                            <Button
                               type="primary"
                               className={styles.footButton1} // Ajoutez la classe CSS appropriée pour le style du bouton
                               onClick={redirectToHR}
                            >
                              Module Gestion des RH
                            </Button>
                        {/* ... */}
                        </div>
          )}
          {isLogged ? (
            <Link to="/auth/logout" className={styles.logoutLink}>
              <LogoutOutlined className="text-danger" />
              <span className="logout-text font-weight-bold">
                Se déconnecter
              </span>
            </Link>
          ) : (
            <Link to="/auth/login" className="btn-sign-in text-dark">
              <span></span>
            </Link>
          )}
          {isLogged && (
            <Button
              type="link"
              className={styles.sidebarTogglerMobile}
              onClick={() => onPress()}
              style={{ boxShadow: "none" }}
            >
              <MenuOutlined
                className={`${styles.hamburgerMenuIcon} hamburger-menu-icon`}
              />
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Header;
