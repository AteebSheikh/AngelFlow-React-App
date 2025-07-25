import React, { useState } from "react";
import ImageGalleryViewer from "../imageGallery/imageGalleryViewer";
import CrossSvg from "../../assets/images/cross";
import DummyImage from "../../assets/images/dummy-image.jpg";
import CrossIcon from "../../assets/images/crossicon.svg";

const ProjectDetailModal = ({
  images,
  projectDetail,
  setImageModal,
  mapDetails,
}) => {
  const [tags, setTags] = useState(false);
  const tagsList = projectDetail?.tags?.split(",");
  const projectDescription = projectDetail?.description?.replace(
    /\n\s*\n/g,
    "<br>"
  );
  return (
    <div className="d-flex w-100 main-project-details">
      <div className="image-viewer">
        <div className="">
          <ImageGalleryViewer images={images ? images : [DummyImage]} />
        </div>
      </div>
      <div className="project-detail-viewer project-detail-sidebar custom-scrollbar">
        <div className="Head_Bar">
          <div className="cross-icon-sidebar">
            <img
              src={CrossIcon}
              alt=""
              className="close_icon"
              onClick={() => {
                setImageModal(false);
                setRightSidebar(false);
              }}
            />
          </div>
          <h5>{projectDetail?.project_name}</h5>
          <p>{projectDetail?.address1}</p>
        </div>
        <div className="scroll_sidebar custom-scrollbar">
          <div className="Tags_wrapper">
            <div className="inner_tags">
              <p>Tags</p>
            </div>
            <div className="inner_tags_value d-flex">
              {tagsList?.map((item, idx) => {
                return <span>{item}</span>;
              })}
            </div>
          </div>
          <div className="Project_Created d-flex">
            <div className="Project_Type">
              <span>{mapDetails?.type_name ?? "Project Type"}</span>
              <p>{projectDetail?.project_type}</p>
            </div>
          </div>
          <div className="Project_Details">
            <h5>Project Details</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: projectDescription?.replace(
                  /(https?:\/\/[^\s]+)/g,
                  `<a class='link'  target="_blank" href="$1">$1</a>`
                ),
              }}
            />
          </div>
        </div>

        {/* <div className="Project_links">
          <p>Project Links </p>
          <a href="#"> https://newzealandwhitebait.kiwi/</a>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectDetailModal;
