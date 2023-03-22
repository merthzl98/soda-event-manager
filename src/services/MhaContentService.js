import http from "./http-common";

const MHA_BASE = "/mhacontents";

const getMhaContents = () => {
  return http.get(MHA_BASE);
};

const createMhaContent = (mhaData) => {
  return http.post(MHA_BASE, mhaData);
};

const updateMhaContent = (mhaData) => {
  return http.put(MHA_BASE, mhaData);
};

const getMhaContentsById = (id) => {
  return http.get(MHA_BASE + `/${id}`);
};

const deleteMhaContents = (id) => {
  return http.delete(MHA_BASE + `/${id}`);
};

const MhaContentService = {
  getMhaContents,
  createMhaContent,
  updateMhaContent,
  getMhaContentsById,
  deleteMhaContents,
};

export default MhaContentService;
