import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import AuthContext from "../../storage/auth-context";
import AnnounceService from "../../services/AnnouncementService";
import EditAnnounceModal from "./EditAnnounceModal";
import AddAnnounceModal from "./AddAnnounceModal";
import "./Announcements.scss";

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
    setIsLoading(true);

    AnnounceService.orderAnnoucements(announcesOrderIds).then((response) => {
      // console.log("response-->", response);
      response.status === 200 && setIsLoading(false);
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
        <Paper sx={{ width: "100%", position: "relative" }}>
          <TableContainer sx={{ maxHeight: 740 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={5}
                    style={{
                      backgroundColor: "rgba(0,0,0, 0.2)",
                      height: "4.5rem",
                      paddingRight: "7rem",
                    }}
                  >
                    Announces
                    <Tooltip title="Add New Announce">
                      <Fab
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                        }}
                        onClick={showAddAnnounce}
                        color="primary"
                        aria-label="add"
                        size="small"
                      >
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>

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
                              gap: "5rem",
                              borderBottom: "1px solid rgba(50,50,0, 0.1)",
                              alignItems: "center",
                              backgroundColor: snapshot.isDragging
                                ? "rgba(50,50,0, 0.1)"
                                : "white",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <TableCell className="table-cell">
                              {row.status}
                            </TableCell>
                            <TableCell className="table-cell">
                              {row.text}
                            </TableCell>
                            <TableCell className="table-cell">
                              {row.textFrench}
                            </TableCell>
                            <TableCell className="table-cell">
                              {row.textDutch}
                            </TableCell>

                            <TableCell
                              className="actions"
                              style={{
                                minWidth: "7rem",
                                backgroundColor: "rgba(50,50,0, 0.1)",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0",
                                // position: "absolute",
                                // right: "0"
                              }}
                            >
                              <Tooltip title="Edit">
                                <IconButton
                                  onClick={() => showEditAnnounce(index)}
                                  aria-label="edit"
                                  size="large"
                                >
                                  <EditIcon fontSize="inherit" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="delete">
                                <IconButton
                                  onClick={() => handleDeleteAnnounce(index)}
                                  aria-label="delete"
                                  size="large"
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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
