import { useState } from "react";
import { useLocation } from "react-router-dom";
import { requestOptions } from "../configs";

export const GetProjects = () => {
  const { pathname } = useLocation();
  const [projects, setProjects] = useState({});
  const [allProjects, setAllProjects] = useState({});
  const [types, setTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [curators, setCurators] = useState(null);
  const [projectsArray, setProjectsArray] = useState(null);
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [countries, setCountries] = useState(null);
  const [booleanValue, setBooleanValue] = useState(false);
  const [count, setCount] = useState(0);
  const [mapDetails, setMapDetails] = useState(null);

  const id = pathname?.split("/")?.pop();
  const mapId = id !== "" ? id : 2;

  const getProjects = () => {
    fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/maps/${mapId}.json`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setProjects(JSON.parse(result));
        setProjectsArray(res?.data?.projects?.map((item) => item));
        setMapDetails(res?.data?.map);
        if (res?.data?.map?.map_template === "v1")
          window.location.replace(
            `${process.env.REACT_APP_Base_Url}/v1/${mapId}`
          );
      })
      .catch((error) => console.log("error", error));
  };

  const getFilters = (filter) => {
    fetch(
      `${process.env.REACT_APP_Base_Url}/api/v1/maps/${mapId}?${filter}=true.json`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        {
          filter === "types"
            ? setTypes(res?.types?.map((item) => item))
            : filter === "tags"
            ? setTags(res?.tags?.map((item) => item))
            : filter === "curators"
            ? setCurators(res?.curators?.map((item) => item))
            : setCountries(res?.countries?.map((item) => item));
        }
      })
      .catch((error) => console.log("error", error));
  };

  return {
    projects,
    types,
    tags,
    curators,
    projectsArray,
    countries,
    allProjectsData,
    getProjects,
    allProjects,
    count,
    setBooleanValue,
    booleanValue,
    mapDetails,
    setProjectsArray,
    getFilters,
  };
};
