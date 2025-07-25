import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import uploadIconGray from "../assets/images/uplod-icon-gray.svg";
import uploadIcon from "../assets/images/upload-icon.svg";

const MyUploader = ({ initialFiles, handleSubmit, handleChangeStatus }) => {
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  return (
    <div className="imageUploader">
      <Dropzone
        inputContent={
          <div className="dropText">
            <img src={uploadIconGray} alt="" />
            <p className="mb-0">Upload Images</p>
          </div>
        }
        inputWithFilesContent={
          <div className="dropText">
            <img src={uploadIcon} alt="" />
            <p className="mb-0">Upload Images</p>
          </div>
        }
        initialFiles={initialFiles}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*"
      />
    </div>
  );
};
export default MyUploader;
