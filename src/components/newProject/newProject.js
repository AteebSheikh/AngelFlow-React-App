import React, { useState, useEffect, useRef } from "react";
import InputField from "../inputField";
import "../style.scss";
import TextField from "../textArea";
import SelectField from "../selectField";
import Autocomplete from "react-google-autocomplete";
import Button from "react-bootstrap/Button";
import MapsAPi from "../../lib/api/api";
import toast, { Toaster } from "react-hot-toast";
import ValidationMessage from "../ValidationMessages/validationMessages";
import MyUploader from "../imageUploader";
import UploadImage from "../../assets/images/upload_image.svg";
import CrossIcon from "../../assets/images/crossicon.svg";
import { requestOptions } from "../../configs";
import { GetProjects } from "../../hooks/projects";
const NewProject = ({
  editView,
  projectId,
  setProjectId,
  setOpen,
  setNewProject,
  mapDetail,
}) => {
  const { types, tags, curators, getFilters } = GetProjects();
  const focusDiv = useRef();
  const [isValidate, setIsValidate] = useState(null);
  const [images, setImages] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [curatorValue, setCuratorValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [ImageIds, setImagesId] = useState([]);
  const [newImageFile, setNewImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState({
    project_name: "",
    description: "",
    address1: "",
    project_type_id: "",
    tags: "",
    client_id: 1,
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    curators: "",
    map_id: 2,
    images: [],
  });

  let getTags = [];
  const filteredTags = tags?.filter((item) => item?.count > 0);

  const typeOptions = types?.map((item) => ({
    value: item?.name,
    label: item?.name,
    id: item?.id,
  }));
  const tagsOptions = filteredTags?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));

  const curatorOptions = curators?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));
  const onChange = (e) => {
    let { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLocaitonId = (place) => {
    if (place) {
      const country = place?.address_components.filter((item) => {
        return item?.types?.includes("country");
      });
      const state = place?.address_components.filter((item) => {
        return item?.types?.includes("administrative_area_level_1");
      });
      const city = place?.address_components.filter((item) => {
        return item?.types?.includes("locality");
      });
      setInputValue((prev) => ({
        ...prev,
        address1: place?.formatted_address,
        latitude: place?.geometry?.location.lat(),
        longitude: place?.geometry?.location.lng(),
        country: country?.[0]?.long_name,
        state: state?.[0]?.long_name,
        city: city?.[0]?.long_name,
      }));
    }
  };

  const handleSelect = (e, name) => {
    let { value, label } = e;
    if (name === "tags") {
      if (e.length > 0) {
        const tags = e?.map((item) => {
          return item?.value ?? item?.name;
        });

        const tagsString = tags.join(",");
        setTagValue(tagsString);
        setInputValue({ ...inputValue, [name]: e });

        // const tagsString = tags.join(",");
        // setInputValue({ ...inputValue, [name]: tagsString ?? value });
      } else {
        setInputValue({ ...inputValue, [name]: e });
      }
    } else {
      if (name === "type") {
        setTypeValue(e?.id);
      }
      if (name === "curators") setCuratorValue(value);
      setInputValue({ ...inputValue, [name]: { name: label, label: value } });
    }
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files?.map((f) => f.meta));
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "preparing") {
      setImages((prev) => [...prev, file]);
    }

    if (status === "removed") {
      setImages(images?.filter((item) => item?.name !== file?.name));
    }
  };

  const imageFiles = [];

  const getProjectsById = async (projectId) => {
    await fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/projects/${projectId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        const res = JSON.parse(result);
        const curators = [
          {
            name: res?.data?.curators,
            label: res?.data?.curators,
          },
        ];
        const type = [
          {
            name: res?.data?.project_type,
            label: res?.data?.project_type,
          },
        ];

        setProjectId(res?.data?.id);
        setInputValue({
          ...inputValue,
          images: [],
          curators: res?.data?.curators != "" ? curators : [],
          project_name: res?.data?.project_name,
          description: res?.data?.description?.replace(/\n\s*\n/g, ""),
          address1: res?.data?.address1,
          city: res?.data?.city,
          state: res?.data?.state,
          country: res?.data?.country,
          latitude: res?.data?.latitude,
          longitude: res?.data?.longitude,
          tags: getTags ?? [],
          type: res?.data?.project_type != "" ? type : [],
        });

        const tagsObject = res?.data?.tags?.split(",");
        if (tagsObject) {
          for (let i = 0; i < tagsObject?.length; i++) {
            let obj = {
              value: tagsObject[i],
              label: tagsObject[i],
            };
            getTags.push(obj);
          }
        }
        const imageURLs = res?.data?.images ?? [];
        setImagesId(res?.data.images?.map((item) => item?.id));
        for await (let imageURL of imageURLs) {
          if (imageURL?.image_url) {
            const formatedImage = `${process.env.REACT_APP_Base_Url}${imageURL.image_url}`;
            if (formatedImage) imageFiles.push(formatedImage);
          }
        }
        setInputValue((prev) => ({
          ...prev,
          images: imageFiles,
        }));
      })
      .catch((error) => console.log("error", error));
  };

  const handleDelete = () => {
    setInputValue({ ...inputValue, curators: "" });
    setCuratorValue("");
  };
  const createProject = () => {
    let formData = new FormData();

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }
    }
    formData.append("project_name", inputValue?.project_name);
    formData.append("description", inputValue?.description);
    formData.append("address1", inputValue?.address1);
    formData.append("project_type_id", typeValue);
    formData.append("tags", tagValue);
    formData.append("client_id", 1);
    formData.append("city", inputValue?.city);
    formData.append("state", inputValue?.state);
    formData.append("country", inputValue?.country);
    formData.append("latitude", inputValue?.latitude);
    formData.append("longitude", inputValue?.longitude);
    formData.append("curators", curatorValue);
    formData.append("map_id", mapDetail?.id);

    setIsValidate(false);
    if (
      inputValue?.project_name &&
      inputValue?.description &&
      inputValue?.address1 &&
      inputValue?.type &&
      inputValue?.tags
    ) {
      setDisable(true);
      MapsAPi.createProject(formData)
        .then((res) => {
          // setImagesOb(false);
          setIsValidate(true);
          if (res.success === true) {
            setNewProject(true);
            toast.success("New Project has been created successfully");
            setOpen(false);
          }
          if (res.success === false) {
            setDisable(false);
            toast.error(res?.message);
          }
        })
        .catch((e) => {
          setIsValidate(false);
          toast.error(e.message);
        });
    }
  };

  const updateProject = () => {
    let formData = new FormData();
    if (newImageFile) {
      for (let i = 0; i < newImageFile?.length; i++) {
        formData.append("images[]", newImageFile[i]);
      }
    }

    if (inputValue?.tags) {
      const tags = inputValue?.tags?.map((item) => {
        return item.value;
      });
      const tagsString = tags.join(",");
      setTagValue(tagsString);
    }
    formData.append("project_name", inputValue?.project_name);
    formData.append("description", inputValue?.description);
    formData.append("address1", inputValue?.address1);
    if (typeValue !== "") formData.append("project_type_id", typeValue);
    if (tagValue !== "") {
      formData.append("tags", tagValue);
    }
    formData.append("client_id", 1);
    if (inputValue?.city || inputValue?.state) {
      formData.append("city", inputValue?.city);
      formData.append("state", inputValue?.state);
      formData.append("country", inputValue?.country);
      formData.append("latitude", inputValue?.latitude);
      formData.append("longitude", inputValue?.longitude);
    }
    formData.append("curators", curatorValue);
    formData.append("map_id", mapDetail?.id);
    setIsValidate(false);
    if (
      inputValue?.project_name &&
      inputValue?.description &&
      inputValue?.address1 &&
      inputValue?.type &&
      inputValue?.tags?.length > 0
    ) {
      setDisable(true);
      MapsAPi.updateProject(projectId, formData)
        .then((res) => {
          // setImagesOb(false);
          setIsValidate(true);
          if (res.success === true) {
            setNewProject(true);
            toast.success("Project updated successfully");
            setOpen(false);
          } else {
            setDisable(false);
            toast.error(res?.message);
          }
        })
        .catch((e) => {
          setIsValidate(false);
          toast.error(e.message);
        });
    }
  };

  const uploadMultipleFiles = (e) => {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const base64 = URL.createObjectURL(e.target.files?.[i]);
      setNewImages((prev) => [...prev, { image: base64 }]);
      setNewImageFiles((prev) => [...prev, e.target.files?.[i]]);
    }
  };

  const handleImage = (idx) => {
    const imageID = ImageIds[idx];
    deleteImageById(imageID);
    const imageslist = inputValue?.images.splice(idx, 1);
    const imageIdList = ImageIds.splice(idx, 1);
    setInputValue({ ...inputValue, images: inputValue?.images });
  };
  const handleNewImages = (idx) => {
    const newImageslist = newImages.splice(idx, 1);
    const newImagesObj = newImageFile?.splice(idx, 1);

    setLoading(true);
    setTimeout(() => {
      setNewImages(newImages ?? []);
      setLoading(false);
    }, 1000);
    setNewImageFiles(newImageFile);
  };
  const deleteImageById = async (id) => {
    await MapsAPi.deleteImageById(id)
      .then((res) => {
        if (res?.success === true) {
          setNewProject(true);
          toast.success(res?.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  useEffect(() => {
    getFilters("types");
    getFilters("tags");
    getFilters("curators");
  }, [mapDetail]);

  useEffect(() => {
    if (focusDiv.current) focusDiv.current.focus();
  }, [focusDiv]);
  const inputElement = useRef();
  useEffect(() => {
    if (curatorValue !== "" || inputValue?.curators) {
      const childWidth =
        inputElement?.current?.children[1]?.children[2]?.children[0]
          ?.children[0].offsetWidth;

      document.documentElement.style.setProperty(
        "--curator",
        childWidth - 17 + "px"
      );
    }
  }, [curatorValue, inputValue?.curators]);
  useEffect(() => {
    if (editView === true) getProjectsById(projectId);
    else {
      setInputValue({});
    }
  }, [editView]);
  return (
    <div className="w-100">
      <h2 className="modal-title">
        {editView ? "Edit Project " : "Create Project"}
      </h2>
      <InputField
        label={"Project Name"}
        type="text"
        name="project_name"
        value={inputValue?.project_name}
        onChange={onChange}
        maxlength="80"
      />
      {!inputValue?.project_name && (
        <ValidationMessage
          isValidate={isValidate}
          inputEmail={inputValue?.project_name}
          message={!inputValue?.project_name ? "Enter the project name" : ""}
        />
      )}
      <div className="form-group">
        <TextField
          label={"Project Summary"}
          placeholder=""
          rows="6"
          values={inputValue?.description}
          name="description"
          onChange={(e) => {
            setInputValue({ ...inputValue, description: e });
          }}
          value={inputValue?.description}
        />
        {!inputValue?.description && (
          <ValidationMessage
            isValidate={isValidate}
            inputEmail={inputValue?.description}
            message={!inputValue?.description ? "Enter the description" : ""}
          />
        )}
      </div>{" "}
      <div className="form-group">
        <label>Address</label>
        <Autocomplete
          style={{
            color: "black",
            fontSize: "14px",
            zIndex: 9999,
            width: "100%",
            background: "#f4f4f4",
            borderRadius: "6px",
            border: "1px solid #f4f4f4",
            height: "50px",
            lineHeight: "50px",
            padding: "12px 15px",
            fontWeight: 400,
            fontSize: "14px",
            color: "#161616",
          }}
          options={{
            types: ["geocode", "establishment"],
          }}
          placeholder=""
          apiKey={"AIzaSyCiSwHoCr13O6AVKbUSFQ5gjzy7DIlY7Ac"}
          onPlaceSelected={handleLocaitonId}
          defaultValue={inputValue?.address1}
        />
        {!inputValue?.address1 && (
          <ValidationMessage
            isValidate={isValidate}
            inputEmail={inputValue?.address1}
            message={!inputValue?.address1 ? "Enter the Address" : ""}
          />
        )}
      </div>
      <div className="form-group select_types">
        <SelectField
          options={typeOptions}
          title={`${mapDetail?.type_name ?? "Type"}`}
          className="type-selectField"
          handleChange={(e) => handleSelect(e, "type")}
          value={inputValue?.type}
          isSearchable={false}
          defaultValue={inputValue?.type}
        />
        {!inputValue?.type && (
          <ValidationMessage
            isValidate={isValidate}
            inputEmail={inputValue?.type}
            message={!inputValue?.type ? "Enter the type" : ""}
          />
        )}
      </div>
      <div
        className={
          editView ? "tags-view form-group " : "form-group create-tags-view"
        }
      >
        <SelectField
          options={tagsOptions}
          title="Tags"
          isMulti
          className="tag-selectField"
          isSearchable={true}
          defaultValue={getTags ?? []}
          handleChange={(e) => handleSelect(e, "tags")}
        />
        {(inputValue?.tags?.length === 0 || !inputValue?.tags) && (
          <ValidationMessage
            isValidate={isValidate}
            inputEmail={inputValue?.tags}
            message={
              inputValue?.tags?.length === 0 || !inputValue?.tags
                ? "Enter the tags"
                : ""
            }
          />
        )}
      </div>
      <div
        className={
          editView
            ? "curator-view form-group curator-select "
            : "form-group curator-select"
        }
        ref={inputElement}
      >
        <SelectField
          options={curatorOptions}
          title={`${mapDetail?.curator_name ?? "Curator"}`}
          value={inputValue?.curators}
          className="curator-selectField"
          isSearchable={true}
          handleChange={(e) => handleSelect(e, "curators")}
          handleDelete={handleDelete}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      </div>
      <div className="form-group">
        {editView ? (
          <>
            <div className=" images-main ">
              {inputValue?.images?.map((item, idx) => (
                <div className="image-files" key={idx}>
                  <img
                    src={CrossIcon}
                    alt=""
                    className="close_icon"
                    onClick={() => handleImage(idx)}
                  />
                  <img className="initial-image-files" src={item} />
                </div>
              ))}
              {loading &&
                newImages?.map((item, idx) => (
                  <div className="image-files" key={idx}>
                    <img
                      src={CrossIcon}
                      alt=""
                      className="close_icon"
                      onClick={() => handleNewImages(idx)}
                    />
                    <img className="initial-image-files" src={item?.image} />
                  </div>
                ))}
              {!loading &&
                newImages?.map((item, idx) => (
                  <div className="image-files" key={idx}>
                    <img
                      src={CrossIcon}
                      alt=""
                      className="close_icon"
                      onClick={() => handleNewImages(idx)}
                    />
                    <img className="initial-image-files" src={item?.image} />
                  </div>
                ))}
            </div>
            <div className="form-group upload_files_inner_main">
              <label>
                <div className="d-flex gap-2 upload_files_inner">
                  <div>
                    <img src={UploadImage} alt="img" />
                  </div>
                  <div>
                    <p>Upload Images</p>
                  </div>
                </div>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={uploadMultipleFiles}
                  multiple="multiple"
                  accept="image/*"
                />
              </label>
            </div>
          </>
        ) : (
          <>
            <MyUploader
              handleSubmit={handleSubmit}
              handleChangeStatus={handleChangeStatus}
            />
          </>
        )}
      </div>
      <div className="project-buttons d-flex gap-3 text-center ">
        <button
          onClick={() => setOpen(false)}
          type="button"
          class="new-project-button cancelbtn bg-transparent btn btn-primary"
        >
          Cancel
        </button>

        {editView ? (
          <Button
            className="new-project-button"
            onClick={(e) => {
              e.preventDefault();
              updateProject();
            }}
            disabled={disable ? true : false}
          >
            Update Project
          </Button>
        ) : (
          <Button
            className="new-project-buttons"
            disabled={disable ? true : false}
            onClick={(e) => {
              e.preventDefault();
              createProject();
            }}
          >
            Create Project
          </Button>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};
export default NewProject;
