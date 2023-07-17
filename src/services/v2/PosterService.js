import http, { axiosUpload as httpUpload } from "../http-common";

const deletePoster = (posterId) => {
  return http.delete("/delete-poster", { params: { posterId: posterId } });
};

const uploadPoster = (posterType, posterData) => {
  return httpUpload.post("/upload-poster", posterData, {
    params: { type: posterType },
  });
};

const PosterService = { uploadPoster, deletePoster };

export default PosterService;
