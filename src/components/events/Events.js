import React, { useEffect, useState, useContext, useCallback } from "react";

import AuthContext from "../../storage/auth-context";
import EventServiceV2 from "../../services/v2/EventService";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";
import TableCommon from "../commonUI/TableCommon";
import { tableConfig } from "../../configs/config";

const Events = () => {
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(1);
  const [eventsData, setEventsData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [eventId, setEventId] = useState();

  const { setIsLoading } = useContext(AuthContext);

  const getEventsData = useCallback(() => {
    setIsLoading(true);
    EventServiceV2.getEvents(
      null,
      null,
      null,
      null,
      null,
      tableConfig.itemCount,
      page,
      null,
      null,
      null
    )
      .then((response) => {
        console.log(response);
        setTotalElements(response.data.eventsPage.totalElements);
        setEventsData(response.data.eventsPage.content);
      })
      .then(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    getEventsData();
  }, [getEventsData]);

  const handleDeleteEvent = (clickedIndex) => {
    const eventId = eventsData[clickedIndex]?.id;
    EventServiceV2.deleteEvent(eventId).then((response) => {
      response.status === 200 && getEventsData();
    });
  };

  const showAddEvent = () => {
    setAddEventModal(true);
  };

  const hideAddEvent = () => {
    setAddEventModal(false);
  };

  const showEditEvent = (clickedIndex) => {
    const eventId = eventsData[clickedIndex]?.id;
    setEventId(eventId);
    setEditEventModal(true);
  };

  const hideEditevent = () => {
    setEditEventModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TableCommon
        data={eventsData}
        columns={tableConfig.eventsColumn}
        handleDelete={handleDeleteEvent}
        showEdit={showEditEvent}
        title="Events"
        showAddModal={showAddEvent}
        label="+ Add Event"
        page={page}
        onPageChange={handleChangePage}
        count={totalElements}
      />
      {addEventModal && (
        <AddEventModal
          onHide={hideAddEvent}
          openModal={addEventModal}
          setAddEventModal={setAddEventModal}
          getEventsData={getEventsData}
        />
      )}

      {editEventModal && (
        <EditEventModal
          onHide={hideEditevent}
          openModal={editEventModal}
          setEditEventModal={setEditEventModal}
          getEventsData={getEventsData}
          eventId={eventId}
        />
      )}
    </>
  );
};

export default Events;
