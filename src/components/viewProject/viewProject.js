import React, { useState, useEffect, useRef, useCallback } from "react";
import DataTable from "../dataTable/dataTable";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import EditIcon from "../../assets/images/EditIcon.svg";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import toast, { Toaster } from "react-hot-toast";
import SearchSvg from "../../assets/images/search.svg";

import AlertDialog from "../alertDialog/alertDialog";
import { FaSearch } from "react-icons/fa";
import MapsAPi from "../../lib/api/api";

const ViewProject = ({
  setViewProjects,
  setOpen,
  setEditView,
  setProjectId,
  projectsArray,
  projectId,
  setNewProject,
  editView,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsData, setProjectsData] = useState(projectsArray);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const rowPerScroll = 50;
  const [nextRow, setNextRows] = useState(rowPerScroll);
  const tableEl = useRef();

  const columns = [
    {
      name: "projectName",
      label: "Project Name",
      options: {
        sort: true,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        sort: true,
      },
    },
    {
      name: "country",
      label: "Country",
      options: {
        sort: true,
      },
    },
    {
      name: "projectType",
      label: "Project Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "pictures",
      label: "Pictures",
      options: {
        sort: true,
      },
    },
    {
      name: "edit",
      label: "",
      options: {
        sort: false,
      },
    },
    {
      name: "delete",
      label: "",
      options: {
        sort: false,
      },
    },
  ];
  const deleteProject = async (id) => {
    await MapsAPi.deleteProject(id)
      .then((res) => {
        if (res) {
          setProjectsData(projectsData?.filter((item) => item.id !== id));
          setNewProject(true);
          toast.success("Project Deleted successfully");
        } else {
          toast.error(e.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  useEffect(() => {
    document?.getElementById("table-view")?.blur();
  }, []);

  useEffect(() => {
    if ((projectsArray && !projectId) || editView) {
      setProjectsData(projectsArray);
    }
  }, [projectsArray]);

  const data = projectsData
    ?.slice(0, nextRow)
    ?.flat()
    ?.map((item, idx) => ({
      projectName: <div key={idx}>{item?.name}</div>,
      country: <div key={idx}>{item?.country}</div>,
      city: <div>{item.city}</div>,
      pictures: <div>{item?.images}</div>,
      projectType: <div>{item?.project_type}</div>,

      edit: (
        <div className="">
          <div
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
              setEditView(true);
              setViewProjects(false);
              setProjectId(item?.id);
            }}
            className="view-project-icon"
          >
            <img src={EditIcon} alt="img" />
          </div>
        </div>
      ),

      delete: (
        <div
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            setProjectId(item?.id);
            setOpenAlert(true);
          }}
          className="view-project-icon"
        >
          <img src={DeleteIcon} alt="img" />
        </div>
      ),
    }));

  const options = {
    searchOpen: false,
    search: false,
    download: false,
    searchable: false,
    filter: false,
    empty: false,
    viewColumns: false,
    print: false,
    caseSensitive: false,
    responsive: "standard",
    customSort: (data, colIndex, order, meta) => {
      return data.sort((a, b) => {
        return (
          (a.data[colIndex]?.props?.children < b.data[colIndex]?.props?.children
            ? -1
            : 1) * (order === "asc" ? 1 : -1)
        );
      });
    },
    rowsPerPage: projectsData?.flat()?.length,
    searchPlaceholder: "Search Projects",
  };

  const handleCloseDialog = () => {
    setOpenAlert(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList =
      projectsArray &&
      projectsArray.filter((item) => {
        return (
          item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item?.city.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item?.country.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item?.images == query ||
          item?.project_type.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });

    setProjectsData(searchList);
  };

  const loadMore = useCallback(() => {
    const loadItems = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          setNextRows((prev) => prev + rowPerScroll);
          resolve();
        }, 1000)
      );
    };
    loadItems();
  }, [nextRow]);

  const scrollListener = useCallback(() => {
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    // if you want to change distanceBottom every time new data is loaded
    // don't use the if statement
    if (!distanceBottom) {
      // calculate distanceBottom that works for you
      setDistanceBottom(Math.round(bottom * 0.2));
    }
    if (tableEl.current.scrollTop > bottom - distanceBottom) {
      if (projectsData?.flat()?.length > nextRow) {
        loadMore();
      }
    }
  }, [distanceBottom, loadMore]);

  useEffect(() => {
    const tableRef = tableEl.current;
    tableRef.addEventListener("scroll", scrollListener);
    return () => {
      tableRef.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div className="view-project-modal ">
      {(!openAlert || openAlert) && (
        <>
          <div className="">
            <h2 class="modal-title">Project List</h2>
            {/* <div className="tablesearchbar ">
          <FilterBy />
        </div> */}
          </div>
          <div className="sidebar-search-component view-project-search">
            <input
              type="search"
              placeholder="Search by Projects"
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            />
            <span>
              <img src={SearchSvg} alt="" />{" "}
            </span>
          </div>
        </>
      )}
      <div
        className="table-view-projects custom-scrollbar "
        id="table-view"
        ref={tableEl}
      >
        <DataTable
          options={options}
          data={data}
          columns={columns}
          id="new_id"
        />
      </div>

      {openAlert && (
        <div className="ondeletemodal">
          <AlertDialog
            open={openAlert}
            handleClose={handleCloseDialog}
            onDecline={() => {
              setOpenAlert(false);
            }}
            onAccept={() => {
              setOpenAlert(false);
              deleteProject(projectId);
            }}
            content={"Are you sure you want to delete it?"}
          ></AlertDialog>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default ViewProject;
