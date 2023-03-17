import http from "../services/http-common";

const EVENT_BASE = "/events";

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
  return http.get(EVENT_BASE, {
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
  return http.post(EVENT_BASE, eventData);
};

const updateEvent = (eventData) => {
  return http.put(EVENT_BASE, eventData);
};

const getEventById = (eventId) => {
  return http.get(EVENT_BASE + `/${eventId}`);
};

const deleteEvent = (eventId) => {
  return http.delete(EVENT_BASE + `/${eventId}`);
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
