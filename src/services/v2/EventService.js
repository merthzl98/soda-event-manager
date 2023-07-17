import http from "../http-common";

const EVENT_BASE = "/events-v2";

const getEvents = (
  artistId,
  clientStatus,
  dateRangeEnd,
  dateRangeStart,
  highlighted,
  itemCount,
  page,
  eventStatus,
  title,
  venueId
) => {
  return http.get("/fetch-events", {
    params: {
      artistId: artistId,
      clientStatus: clientStatus,
      dateRangeEnd: dateRangeEnd,
      dateRangeStart: dateRangeStart,
      highlighted: highlighted,
      itemCount: itemCount,
      page: page,
      status: eventStatus,
      title: title,
      venueId: venueId,
    },
  });
};

const createEvent = (eventData) => {
  return http.post("/create-event", eventData);
};

const updateEvent = (eventData) => {
  return http.put("/update-event", eventData);
};

const getEventById = (eventId) => {
  return http.get("/fetch-event-by-id", { params: { eventId: eventId } });
};

const deleteEvent = (eventId) => {
  return http.delete("/delete-event", { params: { eventId: eventId } });
};

const getHighlightedEvents = () => {
  return http.get(EVENT_BASE + "/highlighted");
};

const orderHighlightedEvents = (eventIds) => {
  return http.put(EVENT_BASE + "/orderHighlighted", eventIds);
};

const EventService = {
  getEvents,
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getHighlightedEvents,
  orderHighlightedEvents,
};

export default EventService;
