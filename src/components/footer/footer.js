import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/footer-logo.png";
import Navbar from "react-bootstrap/Navbar";
import "../../assets/scss/index.scss";
import Button from "react-bootstrap/Button";
import MyModal from "../modal/modal";
import NewProject from "../newProject/newProject";
import TermsConditions from "../termsConditions";
import ViewProject from "../viewProject/viewProject";
import { GetProjects } from "../../hooks/projects";
import MapsAPi from "../../lib/api/api";
import toast from "react-hot-toast";

const Footer = ({
  mapDetail,
  setSidebarOpen,
  setFilterBy,
  open,
  setOpen,
  viewProject,
  setViewProjects,
  termsConditions,
  setTermsConditions,
  projectId,
  setProjectId,
  setRightSidebar,
  newProject,
  setNewProject,
  projectsArray,
  types,
  tags,
  curators,
  userInfoData,
}) => {
  const { getProjects } = GetProjects();
  const [editView, setEditView] = useState(false);
  const [page, setPage] = useState(2);
  const onModalClose = () => {
    setOpen(false);
    setTermsConditions(false);
    setViewProjects(false);
  };

  useEffect(() => {
    if (newProject) {
      getProjects();
    }
    setTimeout(() => {
      setNewProject(false);
    }, 200);
  }, [newProject]);

  return (
    <>
      <Navbar fixed="bottom" variant="white" className="footer-nav">
        <div className="container-fluid d-flex justify-content-between px-lg-5 px-md-3">
          <div className="d-flex">
            <div className="footer-textbox ">
              <h4 className="footer-textbox-title">
                Copyright © 2023 Ambquad Solutions Ltd.
              </h4>
              <h5 className="footer-textbox-title">
                All Rights Reserved.{" "}
                <span
                  className="terms-conditions"
                  onClick={() => {
                    setSidebarOpen(false);
                    setFilterBy(false);
                    setRightSidebar(false);
                    setTermsConditions(true);
                  }}
                >
                  Terms and Conditions
                </span>
              </h5>
            </div>
          </div>
          {!userInfoData?.role &&
          !userInfoData?.name &&
          userInfoData?.call_to_action ? (
            <Button className="new-project-button ">
              <a
                className="tags-footer-button"
                target="_blank"
                href={userInfoData?.button_link}
              >
                {userInfoData?.button_name}
              </a>
            </Button>
          ) : userInfoData && !userInfoData?.role && !userInfoData?.name ? (
            <></>
          ) : (
            <div className="align-items-center footer_bottom ">
              <Button
                className="new-project-button"
                onClick={() => {
                  setSidebarOpen(false);
                  setFilterBy(false);
                  setEditView(false);
                  setOpen(true);
                  setRightSidebar(false);
                }}
              >
                Enter New Project
              </Button>
              <Button
                className="view-button"
                onClick={() => {
                  setSidebarOpen(false);
                  setFilterBy(false);
                  setViewProjects(true);
                  setRightSidebar(false);
                }}
              >
                View Projects
              </Button>
            </div>
          )}

          <div className="align-items-center footer-logos">
            <a
              href="https://www.ambquadsolutions.com"
              style={{ cursor: "pointer" }}
            >
              <img alt="" className="footer-logo" src={Logo} />
            </a>
          </div>
        </div>
      </Navbar>
      <MyModal
        className="enter-project "
        open={open}
        onClose={onModalClose}
        modalName="new-project-modal"
      >
        <NewProject
          editView={editView}
          projectId={projectId}
          setProjectId={setProjectId}
          setOpen={setOpen}
          setNewProject={setNewProject}
          mapDetail={mapDetail}
        />
      </MyModal>
      <MyModal
        className="view-project "
        open={viewProject}
        onClose={onModalClose}
        modalName="view-project-modal"
      >
        <ViewProject
          setViewProjects={setViewProjects}
          setOpen={setOpen}
          setEditView={setEditView}
          setProjectId={setProjectId}
          projectId={projectId}
          projectsArray={projectsArray}
          setNewProject={setNewProject}
          editView={editView}
        />
      </MyModal>
      <MyModal
        className="terms-modal custom-scrollbar"
        open={termsConditions}
        onClose={onModalClose}
        modalName="TermsModal"
      >
        <TermsConditions mapDetail={mapDetail} />
      </MyModal>
    </>
  );
};

export default Footer;
