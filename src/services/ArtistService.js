import http from "./http-common";

const ARTIST_BASE = "/artists";

const getArtistsList = (artistName, genre, artistCount, page) => {
  return http.get(ARTIST_BASE, {
    params: {
      fullName: artistName,
      genre: genre,
      itemCount: artistCount,
      page: page,
    },
  });
};

const getArtistById = (artistId) => {
  return http.get(ARTIST_BASE + `/${artistId}`);
};

const createArtist = (artistData) => {
  return http.post(ARTIST_BASE, artistData);
};

const updateArtist = (updatedData) => {
  return http.put(ARTIST_BASE, updatedData);
};

const deleteArtist = (artistId) => {
  return http.delete(ARTIST_BASE + `/${artistId}`);
};

const ArtistService = {
  getArtistsList,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};

export default ArtistService;
