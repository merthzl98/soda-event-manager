import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Typography } from "@mui/material";

import AuthContext from "../../storage/auth-context";
import AnnounceService from "../../services/AnnouncementService";
import EditAnnounceModal from "./EditAnnounceModal";
import AddAnnounceModal from "./AddAnnounceModal";
import "./Announcements.scss";
import TableActions from "../commonUI/TableActions";
import TableHeader from "../commonUI/TableHeader";

const Announcements = () => {
  const [announcesData, setAnnouncesData] = useState([]);
  const [addAnnounceModal, setAddAnnounceModal] = useState(false);
  const [editAnnounceModal, setEditAnnounceModal] = useState(false);
  const [announceData, setAnnounceData] = useState({});
  const [announcesOrderIds, setAnnouncesOrderIds] = useState([]);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const newOrders = announcesData.map((announce) => announce.id);
    setAnnouncesOrderIds(newOrders);
  }, [announcesData]);

  useEffect(() => {
    AnnounceService.orderAnnoucements(announcesOrderIds).then((response) => {
      response.status === 200 && console.log("response-->", response);
    });
    // eslint-disable-next-line
  }, [announcesOrderIds]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(announcesData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAnnouncesData(items);
  };

  const getAnnouncesData = () => {
    setIsLoading(true);
    AnnounceService.getAnnoucements()
      .then((response) => {
        // console.log(response);

        setAnnouncesData(response.data);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getAnnouncesData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteAnnounce = (clickedIndex) => {
    const announceId = announcesData[clickedIndex]?.id;
    AnnounceService.deleteAnnouncement(announceId).then((response) => {
      response.status === 200 && getAnnouncesData();
    });
  };

  const showAddAnnounce = () => {
    setAddAnnounceModal(true);
  };

  const hideAddAnnounce = () => {
    setAddAnnounceModal(false);
  };

  const showEditAnnounce = (clickedIndex) => {
    const announce = announcesData[clickedIndex];
    setAnnounceData(announce);
    setEditAnnounceModal(true);
  };

  const hideEditAnnounce = () => {
    setEditAnnounceModal(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Paper className="paper-container">
          <TableContainer>
            <TableHeader
              title="Announcements"
              showAddModal={showAddAnnounce}
              toolTip="Add New Announce"
            />
            <Table stickyHeader aria-label="sticky table">
              <Droppable droppableId="table">
                {(provided) => (
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {announcesData.map((row, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={row.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onDragOver={(event) => event.preventDefault()}
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              // justifyContent: "space-between",
                              gap: "2rem",
                              borderBottom: "1px solid rgba(50,50,0, 0.1)",
                              alignItems: "center",
                              backgroundColor: snapshot.isDragging
                                ? "rgba(50,50,0, 0.1)"
                                : "white",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <TableCell className="table-cell-status">
                              {/* <FiberManualRecordIcon
                                fontSize="0.5rem"
                                color="error"
                              /> */}
                              {row.status}
                            </TableCell>
                            <TableCell className="table-cell">
                              {row.text}
                            </TableCell>
                            {/* <TableCell className="table-cell">
                              {row.textFrench}
                            </TableCell>
                            <TableCell className="table-cell">
                              {row.textDutch}
                            </TableCell> */}

                            <TableCell
                              className="actions"
                              style={{
                                // minWidth: "7rem",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "none",
                                padding: "0",
                              }}
                            >
                              <TableActions
                                handleDelete={() => handleDeleteAnnounce(index)}
                                showEdit={() => showEditAnnounce(index)}
                              />
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <TableRow className="table-footer">
                      {/* <Typography
                        color="primary"
                        component="p"
                        className="footer-typo"
                      >
                        See more announce
                      </Typography>
                      <ExpandMoreIcon color="primary" /> */}
                    </TableRow>
                  </TableBody>
                )}
              </Droppable>
            </Table>
          </TableContainer>
        </Paper>
      </DragDropContext>
      {addAnnounceModal && (
        <AddAnnounceModal
          onHide={hideAddAnnounce}
          openModal={addAnnounceModal}
          setAddAnnounceModal={setAddAnnounceModal}
          getAnnouncesData={getAnnouncesData}
          orderLength={announcesData.length}
        />
      )}

      {editAnnounceModal && (
        <EditAnnounceModal
          onHide={hideEditAnnounce}
          openModal={editAnnounceModal}
          setEditAnnounceModal={setEditAnnounceModal}
          announceData={announceData}
          getAnnouncesData={getAnnouncesData}
        />
      )}
    </>
  );
};

export default Announcements;
