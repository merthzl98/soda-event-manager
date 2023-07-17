import http from "../http-common";

const getAnnoucements = () => {
  return http.get("/fetch-announcements");
};

const createAnnouncement = (announcementData) => {
  return http.post("/create-announcement", announcementData);
};

const updateAnnouncement = (announcementData) => {
  return http.put("/update-announcement", announcementData);
};

const getAnnoucementById = (announcementId) => {
  return http.get("/fetch-announcement-by-id", {
    params: { announcementId: announcementId },
  });
};

const deleteAnnouncement = (announcementId) => {
  return http.delete("/delete-announcement", {
    params: { announcementId: announcementId },
  });
};

const orderAnnoucements = (announcementIds) => {
  return http.put("/order-announcements", announcementIds);
};

const AnnouncementService = {
  getAnnoucements,
  createAnnouncement,
  updateAnnouncement,
  getAnnoucementById,
  deleteAnnouncement,
  orderAnnoucements,
};

export default AnnouncementService;
