import http from "./http-common";

const VENUE_BASE = "/venues";

const getVenues = (city, country, itemCount, name, page) => {
  return http.get(VENUE_BASE, {
    params: {
      city: city,
      country: country,
      itemCount: itemCount,
      name: name,
      page: page,
    },
  });
};

const createVenue = (venueData) => {
  return http.post(VENUE_BASE, venueData);
};

const updateVenue = (venueData) => {
  return http.put(VENUE_BASE, venueData);
};

const getVenueById = (venueId) => {
  return http.get(VENUE_BASE + `/${venueId}`);
};

const deleteVenue = (venueId) => {
  return http.delete(VENUE_BASE + `/${venueId}`);
};

const VenueService = { getVenues, createVenue, updateVenue, getVenueById, deleteVenue };

export default VenueService;
