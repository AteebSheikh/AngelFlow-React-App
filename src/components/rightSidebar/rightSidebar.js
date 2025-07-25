import React, { useState, useEffect } from "react";
import ZoomOut from "../../assets/images/zoomout.png";
import DummyImage from "../../assets/images/dummy-image.jpg";
import CrossSvg from "../../assets/images/cross";
import Slider from "react-slick";
import MyModal from "../modal/modal";
import ProjectDetailModal from "../projectDetailModal/projectDetailModal";
import CrossIcon from "../../assets/images/crossicon.svg";
import { requestOptions } from "../../configs";

const RightSidebar = ({
  setRightSidebar,
  projectId,
  imageModal,
  setImageModal,
  setPinCenter,
  mapDetails,
}) => {
  const [projectDetail, setProjectDetail] = useState();
  const [tags, setTags] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  const getProjectsById = async (projectId) => {
    await fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/projects/${projectId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        const res = JSON.parse(result);
        setProjectDetail(res?.data);
        setProjectDescription(
          res?.data?.description?.replace(/\n\s*\n/g, "<br>")
        );
      })
      .catch((error) => console.log("error", error));
  };

  const images = projectDetail?.images?.map((item) => ({
    original: `${process.env.REACT_APP_Base_Url}${item?.image_url}/1000/600/`,
    thumbnail: `${process.env.REACT_APP_Base_Url}${item?.image_url}/250/150/`,
  }));

  const selectedImages = projectDetail?.images?.filter((item, idx) => {
    return idx != selectedImageIndex + 1;
  });

  const imageArray =
    selectedImage && selectedImages
      ? [...selectedImage, ...selectedImages]
      : [];

  const NewImages = imageArray?.map((item) => ({
    original: `${process.env.REACT_APP_Base_Url}${item?.image_url}/1000/600/`,
    thumbnail: `${process.env.REACT_APP_Base_Url}${item?.image_url}/250/150/`,
  }));

  const tagsList = projectDetail?.tags?.split(",");

  const onModalClose = () => {
    setImageModal(false);
  };

  useEffect(() => {
    if (projectId) {
      getProjectsById(projectId);
    }
  }, [projectId]);

  return (
    <>
      <div className="Right_Sidebar ">
        <div className="Head_Bar">
          <div className="cross-icon-sidebar">
            <img
              src={CrossIcon}
              alt=""
              className="close_icon"
              onClick={() => {
                setPinCenter(true);
                setRightSidebar(false);
              }}
            />
            {/* <CrossSvg
              
            /> */}
          </div>
          <h5>{projectDetail?.project_name}</h5>
          <p>{projectDetail?.address1}</p>
        </div>
        <div className="scroll_sidebar custom-scrollbar">
          <div className="Image_Gallery w-100 d-flex gap-2">
            <div
              className="Leftimage_Gallery w-75"
              onClick={
                projectDetail?.images?.[0]?.image_url
                  ? () => {
                      setImageModal(true);
                      setDefaultImage(true);
                    }
                  : {}
              }
            >
              <img
                src={
                  projectDetail?.images?.[0]?.image_url
                    ? `${process.env.REACT_APP_Base_Url}${projectDetail?.images?.[0]?.image_url}`
                    : DummyImage
                }
                alt="img"
                className="w-100"
              />
              {projectDetail?.images?.length > 0 ? (
                <div className="Zoomout_Icon">
                  <img src={ZoomOut} alt="img" />
                </div>
              ) : (
                <></>
              )}
            </div>

            <Slider {...settings} className="w-25 slider">
              {projectDetail?.images?.slice(1)?.map((item, idx) => (
                <img
                  key={idx}
                  src={`${process.env.REACT_APP_Base_Url}${item?.image_url}`}
                  alt="img"
                  onClick={() => {
                    setDefaultImage(false);
                    setImageModal(true);
                    setSelectedImageIndex(idx);
                    setSelectedImage([{ image_url: item?.image_url }]);
                  }}
                />
              ))}
            </Slider>
          </div>

          <div className="Tags_wrapper ">
            <div className="inner_tags">
              <p>Tags</p>
            </div>
            <div className="inner_tags_value d-flex">
              {tagsList?.map((item, idx) => {
                return <span>{item}</span>;
              })}
            </div>

            {/* <a href="#">Museum</a>
        <a href="#">University</a>
        <a href="#">5 More</a> */}
          </div>
          <div className="Project_Created d-flex">
            {/* <div className="Project_Type">
            <span>Project Curator</span>
            <p>
              {projectDetail?.curators !== "" ? projectDetail?.curators : "-"}
            </p>
          </div> */}
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
      </div>
      <MyModal
        className="image-modal "
        open={imageModal}
        onClose={onModalClose}
        modalName="ImageModal"
      >
        <ProjectDetailModal
          mapDetails={mapDetails}
          images={
            !defaultImage && NewImages?.length > 0 ? NewImages : images ?? []
          }
          projectDetail={projectDetail}
          setImageModal={setImageModal}
        />
      </MyModal>
    </>
  );
};

export default RightSidebar;
