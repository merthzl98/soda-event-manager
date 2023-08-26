import http from "../http-common";

const MHA_BASE = "/mhacontents";

const getMhaContents = () => {
  return http.get("/fetch-mhacontents");
};

const createMhaContent = (mhaData) => {
  return http.post("/create-mhacontent", mhaData);
};

const updateMhaContent = (mhaData) => {
  return http.put("/update-mhacontent", mhaData);
};

const softUpdateMhaContent = (mhaData) => {
  return http.put("/soft-update-mhacontent", mhaData);
};

const getMhaContentById = (id) => {
  return http.get("/fetch-mhacontent-by-id", { params: { mhaContentId: id } });
};

const deleteMhaContents = (id) => {
  return http.delete("/delete-mhacontent", { params: { mhaContentId: id } });
};

const orderMhaContents = (mhaContentIds) => {
  return http.put("/order-mhacontents", mhaContentIds);
};

const MhaContentService = {
  getMhaContents,
  createMhaContent,
  updateMhaContent,
  softUpdateMhaContent,
  getMhaContentById,
  orderMhaContents,
  deleteMhaContents,
};

export default MhaContentService;
