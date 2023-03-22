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

const AnnouncementService = {
  getAnnoucements,
  createAnnouncement,
  updateAnnouncement,
  getAnnoucementsById,
  deleteAnnouncement
};

export default AnnouncementService;
