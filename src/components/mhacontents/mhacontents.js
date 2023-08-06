import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TableHeader from "../commonUI/TableHeader";
import { Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MhaContentServiceV2 from "../../services/v2/MhaContentService";
import AuthContext from "../../storage/auth-context";
import TableActions from "../commonUI/TableActions";
import greenDot from "../../assets/icons/greenDot.png";
import greyDot from "../../assets/icons/greyDot.png";
import AddMhaContentModal from "./AddMhaContentModal";

const columns = [
  {
    id: "url",
    label: "Url",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    maxWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "contentType", label: "Content Type", minWidth: 100 },
  {
    id: "external",
    label: "External",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "targetUrl",
    label: "Target Url",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    align: "center",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
];

const MhaContents = () => {
  const [mhaContents, setMhaContents] = useState([]);
  const [addMhaContentModal, setAddMhaContentModal] = useState(false);
  const [editMhaContentModal, setEditMhaContentModal] = useState(false);
  const [mhaContentId, setMhaContentId] = useState();

  const { setIsLoading } = useContext(AuthContext);

  const getMhaContentsData = () => {
    setIsLoading(true);
    MhaContentServiceV2.getMhaContents().then((response) => {
      setMhaContents(response.data.mhaContents);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getMhaContentsData();
    // eslint-disable-next-line
  }, []);

  const handleDragEnd = () => {
    console.log("drag");
  };

  const handleDeleteMhaContent = (clickedIndex) => {
    const mhaContentId = mhaContents[clickedIndex].id;
    MhaContentServiceV2.deleteMhaContents(mhaContentId).then((response) => {
      response.status === 200 && getMhaContentsData();
    });
  };

  const showEditMhaContent = (clickedIndex) => {
    setMhaContentId(mhaContents[clickedIndex].id);
    setEditMhaContentModal(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Paper className="paper-container">
          <TableContainer sx={{ maxHeight: 740 }}>
            <TableHeader
              title="Main Highlighted Contents"
              showAddModal={() => setAddMhaContentModal(true)}
              toolTip="Add New Event"
            />
            {mhaContents.lenght === 0 ? (
              <Box display="flex" sx={{ p: 2 }}>
                <Typography variant="h6" m="auto">
                  Main highlighted content list is empty.
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader aria-label="sticky table">
                <Droppable droppableId="table">
                  {(provided) => (
                    <TableBody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {mhaContents.map((row, index) => (
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
                                {row.status === "LIVE" && (
                                  <img src={greenDot} alt="live icon" />
                                )}
                                {row.status === "DRAFT" && (
                                  <img src={greyDot} alt="draft icon" />
                                )}
                                <p>{row.status}</p>
                              </TableCell>
                              <TableCell className="table-cell">
                                <img
                                  src={row.url}
                                  width="250px"
                                  height="auto"
                                  alt="Poster"
                                />
                              </TableCell>
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
                                  hideEdit
                                  handleDelete={() =>
                                    handleDeleteMhaContent(index)
                                  }
                                />
                              </TableCell>
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
            )}
          </TableContainer>
        </Paper>
      </DragDropContext>
      {addMhaContentModal && (
        <AddMhaContentModal
          onHide={() => setAddMhaContentModal(false)}
          openModal={addMhaContentModal}
          setAddMhaContentModal={setAddMhaContentModal}
          getMhaContentsData={getMhaContentsData}
        />
      )}
    </>
  );
};

export default MhaContents;
