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

const AnnouncementService = {
  getAnnoucements,
  createAnnouncement,
  updateAnnouncement,
};

export default AnnouncementService;
