import React from "react";
import Logo from "../../assets/images/logo.png";
import PlusImage from "../../assets/images/plus-image.png";
import Navbar from "react-bootstrap/Navbar";
import "../../assets/scss/index.scss";

const Header = ({ mapDetails, userInfoData }) => {
  return (
    <Navbar
      className={
        userInfoData && userInfoData?.name && userInfoData?.role
          ? " py-0"
          : "header-nav py-0"
      }
    >
      <div className="header container-fluid d-flex justify-content-between">
        <a
          href={mapDetails?.company_website}
          target="_blank"
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <div className="align-items-center header_logo_side  py-1">
            <img className="Logo-image" alt="" src={mapDetails?.logo ?? Logo} />
            <p className="website-title m-0">{mapDetails?.company_name}</p>
          </div>
        </a>
        <div className="d-flex align-items-center align-items-stretch main_logout">
          <div className="header-text-section">
            <h4 className="header-text-title">{mapDetails?.title}</h4>
            <h5 className="header-text text-md-center m-0 ">
              {mapDetails?.slogan}
            </h5>
          </div>
          {userInfoData && userInfoData?.name && userInfoData?.role ? (
            <div className="plus-icon-user align-items-center gap-2">
              <img alt="" src={PlusImage} />
              <div className="logout_side">
                Super Admin
                {/* <NavDropdown
                title="Super Admin"
                id="navbarScrollingDropdown"
                className="user-title "
              > */}
                {/* <NavDropdown.Item href="#action4">
                  Profile(System Admin)
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Logout</NavDropdown.Item> */}
                {/* </NavDropdown> */}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
