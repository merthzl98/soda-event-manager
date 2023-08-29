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
import SaveIcon from "@mui/icons-material/Save";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import MhaContentServiceV2 from "../../services/v2/MhaContentService";
import AuthContext from "../../storage/auth-context";
import TableActions from "../commonUI/TableActions";
import greenDot from "../../assets/icons/greenDot.png";
import greyDot from "../../assets/icons/greyDot.png";
import AddMhaContentModal from "./AddMhaContentModal";
import EditMhaContentModal from "./EditMhaContentModal";
import SwitchButtonUI from "../commonUI/SwitchButtonUI";
import IconButtonUI from "../commonUI/IconButtonUI";

const tableStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  borderBottom: "1px solid rgba(50,50,0, 0.1)",
  alignItems: "center",
  padding: "0 24px",
};

const MhaContents = () => {
  const [mhaContents, setMhaContents] = useState([]);
  const [addMhaContentModal, setAddMhaContentModal] = useState(false);
  const [editMhaContentModal, setEditMhaContentModal] = useState(false);
  const [mhaContentId, setMhaContentId] = useState();
  const [orderEnable, setOrderEnable] = useState(false);

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(mhaContents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMhaContents(items);
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

  const handleOrderEnableSwitch = () => {
    setOrderEnable((prevState) => !prevState);
  };

  const saveOrder = () => {
    const mhaContentIds = mhaContents.map((mhaContent) => mhaContent.id);
    MhaContentServiceV2.orderMhaContents({ mhaContentIds: mhaContentIds })
      .then((response) => {
        setOrderEnable(false);
        getMhaContentsData();
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
          <TableContainer sx={{ maxHeight: 740 }}>
            <TableHeader
              title="Main Highlighted Contents"
              showAddModal={() => setAddMhaContentModal(true)}
              label="+ Add MhaContent"
              rightContent={rightHeadContent}
            />

            {mhaContents.lenght === 0 ? (
              <Box display="flex" sx={{ p: 2 }}>
                <Typography variant="h6" m="auto">
                  Main highlighted content list is empty.
                </Typography>
              </Box>
            ) : (
              <>
                {orderEnable ? (
                  <DraggableContent
                    mhaContents={mhaContents}
                    handleDeleteMhaContent={handleDeleteMhaContent}
                    showEditMhaContent={showEditMhaContent}
                  />
                ) : (
                  <TableContent
                    mhaContents={mhaContents}
                    handleDeleteMhaContent={handleDeleteMhaContent}
                    showEditMhaContent={showEditMhaContent}
                  />
                )}
              </>
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
      {editMhaContentModal && (
        <EditMhaContentModal
          onHide={() => setEditMhaContentModal(false)}
          openModal={editMhaContentModal}
          setEditMhaContentModal={setEditMhaContentModal}
          getMhaContentsData={getMhaContentsData}
          mhaContentId={mhaContentId}
        />
      )}
    </>
  );
};

const TableContent = ({
  mhaContents,
  handleDeleteMhaContent,
  showEditMhaContent,
}) => {
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableBody>
        {mhaContents.map((row, index) => (
          <TableRow key={index} sx={tableStyle}>
            <ContentColumns
              row={row}
              index={index}
              handleDeleteMhaContent={handleDeleteMhaContent}
              showEditMhaContent={showEditMhaContent}
            />
          </TableRow>
        ))}
        <TableRow className="table-footer"></TableRow>
      </TableBody>
    </Table>
  );
};

const DraggableContent = ({
  mhaContents,
  handleDeleteMhaContent,
  showEditMhaContent,
}) => {
  return (
    <Table stickyHeader aria-label="sticky table">
      <Droppable droppableId="table">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {mhaContents.map((row, index) => (
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
                      handleDeleteMhaContent={handleDeleteMhaContent}
                      showEditMhaContent={showEditMhaContent}
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
  handleDeleteMhaContent,
  showEditMhaContent,
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
      <TableCell
        sx={{
          py: 1,
          display: "flex",
          alignItems: "center",
        }}
        className="table-cell"
      >
        <img
          src={row.url}
          style={{ borderRadius: "8px" }}
          width="100px"
          height="auto"
          alt="Poster"
        />
      </TableCell>
      <TableCell className="table-cell">{row.targetUrl}</TableCell>
      <TableCell
        className="actions"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "none",
          padding: "0",
        }}
      >
        <TableActions
          handleDelete={() => handleDeleteMhaContent(index)}
          showEdit={() => showEditMhaContent(index)}
        />
      </TableCell>
    </>
  );
};

export default MhaContents;
