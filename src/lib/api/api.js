import Service from "../service";

const MapsAPi = {
  getProjects: async () => {
    try {
      return await Service.get(
        `${process.env.REACT_APP_Base_Url}/api/v1/maps/2`
      );
    } catch (error) {
      throw error;
    }
  },

  getAllProjects: async (id, page) => {
    try {
      return await Service.get(
        `${process.env.REACT_APP_Base_Url}/api/v1/projects?map_id=${id}&page=${page}`
      );
    } catch (error) {
      throw error;
    }
  },
  getProjectDetail: async (id) => {
    try {
      return await Service.get(
        `${process.env.REACT_APP_Base_Url}/api/v1/projects/${id}`
      );
    } catch (error) {
      throw error;
    }
  },
  createProject: async (data) => {
    try {
      return await Service.post({
        url: `${process.env.REACT_APP_Base_Url}/api/v1/projects`,
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteProject: async (id) => {
    try {
      return await Service.remove({
        url: `${process.env.REACT_APP_Base_Url}/api/v1/projects/${id}`,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteImageById: (id) => {
    try {
      return Service.remove({
        url: `${process.env.REACT_APP_Base_Url}/api/v1/delete_image/${id}`,
      });
    } catch (err) {
      throw err;
    }
  },
  updateProject: async (id, data) => {
    try {
      return Service.update({
        url: `${process.env.REACT_APP_Base_Url}/api/v1/projects/${id}`,
        data,
      });
    } catch (err) {
      throw err;
    }
  },
};

export default MapsAPi;
