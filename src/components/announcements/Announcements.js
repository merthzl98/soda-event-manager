import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SaveIcon from "@mui/icons-material/Save";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography } from "@mui/material";

import AuthContext from "../../storage/auth-context";
import AnnouncementServiceV2 from "../../services/v2/AnnouncementService";
import EditAnnouncementModal from "./EditAnnouncementModal";
import AddAnnouncementModal from "./AddAnnouncementModal";
import "./Announcements.scss";
import TableActions from "../commonUI/TableActions";
import TableHeader from "../commonUI/TableHeader";
import greenDot from "../../assets/icons/greenDot.png";
import greyDot from "../../assets/icons/greyDot.png";
import SwitchButtonUI from "../commonUI/SwitchButtonUI";
import IconButtonUI from "../commonUI/IconButtonUI";

const tableStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid rgba(50,50,0, 0.1)",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
};

const Announcements = () => {
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [addAnnouncementModal, setAddAnnouncementModal] = useState(false);
  const [editAnnouncementModal, setEditAnnouncementModal] = useState(false);
  const [announcementsOrderIds, setAnnouncementsOrderIds] = useState([]);
  const [announcementId, setAnnouncementId] = useState();
  const [orderEnable, setOrderEnable] = useState(false);

  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const newOrders = announcementsData.map((announcement) => announcement.id);
    setAnnouncementsOrderIds(newOrders);
  }, [announcementsData]);

  useEffect(() => {
    const orderRequest = {
      testParam: "testParam",
      announcementIds: announcementsOrderIds,
    };
    console.log(orderRequest);
    AnnouncementServiceV2.orderAnnouncements(orderRequest).then((response) => {
      response.status === 200 && console.log("response-->", response);
    });
    // eslint-disable-next-line
  }, [announcementsOrderIds]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(announcementsData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAnnouncementsData(items);
  };

  const getAnnouncementsData = () => {
    setIsLoading(true);
    AnnouncementServiceV2.getAnnoucements()
      .then((response) => {
        console.log({ response });
        setAnnouncementsData(response.data.announcements);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getAnnouncementsData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteAnnouncement = (clickedIndex) => {
    const announcementId = announcementsData[clickedIndex]?.id;
    AnnouncementServiceV2.deleteAnnouncement(announcementId).then(
      (response) => {
        response.status === 200 && getAnnouncementsData();
      }
    );
  };

  const showAddAnnouncement = () => {
    setAddAnnouncementModal(true);
  };

  const hideAddAnnouncement = () => {
    setAddAnnouncementModal(false);
  };

  const showEditAnnouncement = (clickedIndex) => {
    setAnnouncementId(announcementsData[clickedIndex].id);
    setEditAnnouncementModal(true);
  };

  const hideEditAnnouncement = () => {
    setEditAnnouncementModal(false);
  };

  const saveOrder = () => {
    const announcementIds = announcementsData.map(
      (announcement) => announcement.id
    );
    AnnouncementServiceV2.orderAnnouncements({
      announcementIds: announcementIds,
    })
      .then((response) => {
        setOrderEnable(false);
        getAnnouncementsData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let rightHeadContent = (
    <Box sx={{ display: "flex" }}>
      <SwitchButtonUI
        switchLabel="Enable ordering"
        isChecked={orderEnable}
        setIsChecked={setOrderEnable}
      />
      {orderEnable && (
        <IconButtonUI
          title="Save Order"
          onClick={saveOrder}
          bgColor="rgba(15,5,29,0.15)"
          color="primary"
        >
          <SaveIcon fontSize="medium" color="primary" />
        </IconButtonUI>
      )}
    </Box>
  );

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Paper className="paper-container">
          <TableContainer>
            <TableHeader
              title="Announcements"
              showAddModal={showAddAnnouncement}
              label="+ Add Announcement"
              rightContent={rightHeadContent}
            />
            {announcementsData.lenght === 0 ? (
              <Box display="flex" sx={{ p: 2 }}>
                <Typography variant="h6" m="auto">
                  Announcements list is empty.
                </Typography>
              </Box>
            ) : (
              <>
                {orderEnable ? (
                  <DraggableContent
                    announcementsData={announcementsData}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    showEditAnnouncement={showEditAnnouncement}
                  />
                ) : (
                  <TableContent
                    announcementsData={announcementsData}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    showEditAnnouncement={showEditAnnouncement}
                  />
                )}
              </>
            )}
          </TableContainer>
        </Paper>
      </DragDropContext>
      {addAnnouncementModal && (
        <AddAnnouncementModal
          onHide={hideAddAnnouncement}
          openModal={addAnnouncementModal}
          setAddAnnouncementModal={setAddAnnouncementModal}
          getAnnouncementsData={getAnnouncementsData}
          orderLength={announcementsData.length}
        />
      )}

      {editAnnouncementModal && (
        <EditAnnouncementModal
          onHide={hideEditAnnouncement}
          openModal={editAnnouncementModal}
          setEditAnnouncementModal={setEditAnnouncementModal}
          getAnnouncementsData={getAnnouncementsData}
          announcementId={announcementId}
        />
      )}
    </>
  );
};

const TableContent = ({
  announcementsData,
  handleDeleteAnnouncement,
  showEditAnnouncement,
}) => {
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableBody>
        {announcementsData.map((row, index) => (
          <TableRow key={row.id} sx={tableStyle}>
            <ContentColumns
              row={row}
              index={index}
              handleDeleteAnnouncement={handleDeleteAnnouncement}
              showEditAnnouncement={showEditAnnouncement}
            />
          </TableRow>
        ))}
        <TableRow className="table-footer"></TableRow>
      </TableBody>
    </Table>
  );
};

const DraggableContent = ({
  announcementsData,
  handleDeleteAnnouncement,
  showEditAnnouncement,
}) => {
  return (
    <Table stickyHeader aria-label="sticky table">
      <Droppable droppableId="table">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {announcementsData.map((row, index) => (
              <Draggable key={row.id} draggableId={row.id} index={index}>
                {(provided, snapshot) => (
                  <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onDragOver={(event) => event.preventDefault()}
                    style={{
                      ...tableStyle,
                      backgroundColor: snapshot.isDragging
                        ? "rgba(50,50,0, 0.1)"
                        : "white",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <ContentColumns
                      row={row}
                      index={index}
                      handleDeleteAnnouncement={handleDeleteAnnouncement}
                      showEditAnnouncement={showEditAnnouncement}
                    />
                  </TableRow>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <TableRow className="table-footer"></TableRow>
          </TableBody>
        )}
      </Droppable>
    </Table>
  );
};

const ContentColumns = ({
  row,
  index,
  handleDeleteAnnouncement,
  showEditAnnouncement,
}) => {
  return (
    <>
      <TableCell
        sx={{ padding: "0", fontWeight: "medium" }}
        className="table-cell-status"
      >
        {row.status === "LIVE" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid green",
              width: "75px",
              borderRadius: "8px",
              color: "green",
              gap: "4px",
              backgroundColor: "rgba(7, 233, 82, 0.1)",
            }}
          >
            <img
              style={{
                width: "0.5rem",
                height: "0.5rem",
              }}
              src={greenDot}
              alt="live icon"
            />
            Live
          </Box>
        )}
        {row.status === "DRAFT" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(1 ,1 ,1 ,0.25)",
              width: "75px",
              borderRadius: "8px",
              color: "grey",
              gap: "4px",
              backgroundColor: "rgba(1 ,1 ,1 ,0.1)",
            }}
          >
            <img
              style={{
                width: "0.5rem",
                height: "0.5rem",
              }}
              src={greyDot}
              alt="draft icon"
            />
            Draft
          </Box>
        )}
      </TableCell>
      <TableCell className="table-cell">{row.highlightedText}</TableCell>
      <TableCell className="table-cell">{row.text}</TableCell>
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
          handleDelete={() => handleDeleteAnnouncement(index)}
          showEdit={() => showEditAnnouncement(index)}
        />
      </TableCell>
    </>
  );
};

export default Announcements;
