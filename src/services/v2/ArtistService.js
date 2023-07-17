import http from "../http-common";

const getArtistsList = (artistName, genre, artistCount, page) => {
  return http.get("/fetch-artists", {
    params: {
      fullName: artistName,
      genre: genre,
      itemCount: artistCount,
      page: page,
    },
  });
};

const getArtistById = (artistId) => {
  return http.get("/fetch-artist-by-id", { params: { artistId: artistId } });
};

const createArtist = (artistData) => {
  return http.post("/create-artist", artistData);
};

const updateArtist = (updatedData) => {
  return http.put("/update-artist", updatedData);
};

const deleteArtist = (artistId) => {
  return http.delete("/delete-artist", { params: { artistId: artistId } });
};

const ArtistService = {
  getArtistsList,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};

export default ArtistService;
