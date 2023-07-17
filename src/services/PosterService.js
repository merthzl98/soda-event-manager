import http from "./http-common";

const POSTER_BASE = "/posters";

const deletePoster = (posterId) => {
  return http.delete(POSTER_BASE + `/${posterId}`);
};

const uploadPoster = (type, posterData) => {
  return http.post(POSTER_BASE + `/${type}/upload`, posterData, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const PosterService = { uploadPoster, deletePoster };

export default PosterService;
