import http from "../services/http-common";

const EVENT_BASE = "/events";

const getEvents = () => {
  return http.get(EVENT_BASE);
};

const createEvent = (event) => {
  return http.post(EVENT_BASE, event);
};

const updateEvent = (eventId) => {
  return http.put(EVENT_BASE, eventId);
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

const orderHighlightedEvents = () => {
  return http.put(EVENT_BASE + "/orderHighlighted");
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
