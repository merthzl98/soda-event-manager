import http from "../http-common";

const VENUE_BASE = "/venues";

const getVenues = (city, country, itemCount, name, page) => {
  return http.get("/fetch-venues", {
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
  return http.post("/create-venue", venueData);
};

const updateVenue = (venueData) => {
  return http.put("/update-venue", venueData);
};

const getVenueById = (venueId) => {
  return http.get("/fetch-venue-by-id", { params: { venueId: venueId } });
};

const deleteVenue = (venueId) => {
  return http.delete("/delete-venue", { params: { venueId: venueId } });
};

const VenueService = {
  getVenues,
  createVenue,
  updateVenue,
  getVenueById,
  deleteVenue,
};

export default VenueService;
