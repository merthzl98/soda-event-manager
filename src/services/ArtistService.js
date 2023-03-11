import http from "./http-common";

const ARTIST_BASE = "/artists";

const getArtistsList = () => {
  return http.get(ARTIST_BASE);
};

const createArtist = (artistData) => {
  return http.post(ARTIST_BASE, artistData);
};

const updateArtist = () => {
    return http.put()
}

const ArtistService = { getArtistsList, createArtist, updateArtist };

export default ArtistService;
