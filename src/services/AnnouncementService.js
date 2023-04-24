import http from "./http-common";

const ANNOUNCEMENT_BASE = "/announcements";

const getAnnoucements = () => {
  return http.get(ANNOUNCEMENT_BASE);
};

const createAnnouncement = (announcementData) => {
  return http.post(ANNOUNCEMENT_BASE, announcementData);
};

const updateAnnouncement = (announcementData) => {
  return http.put(ANNOUNCEMENT_BASE, announcementData);
};

const getAnnoucementsById = (announceId) => {
  return http.get(ANNOUNCEMENT_BASE + `/${announceId}`);
};

const deleteAnnouncement = (announceId) => {
  return http.delete(ANNOUNCEMENT_BASE + `/${announceId}`);
};

const orderAnnoucements = (announceIds) => {
  return http.put(ANNOUNCEMENT_BASE + "/order", announceIds);
};

const AnnouncementService = {
  getAnnoucements,
  createAnnouncement,
  updateAnnouncement,
  getAnnoucementsById,
  deleteAnnouncement,
  orderAnnoucements,
};

export default AnnouncementService;
