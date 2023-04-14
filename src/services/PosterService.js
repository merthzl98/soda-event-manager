import http from "./http-common";

const POSTER_BASE = "/posters";

const deletePoster = (posterId) => {
  return http.delete(POSTER_BASE + `/${posterId}`);
};

// const uploadPoster = (type, posterData) => {
//   return http.post(POSTER_BASE + `/${type}/upload`, posterData);
// };

const PosterService = { deletePoster };

export default PosterService;
