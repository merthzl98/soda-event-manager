import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";

import AuthContext from "../../storage/auth-context";
import AnnounceService from "../../services/AnnouncementService";
import EditAnnounceModal from "./EditAnnounceModal";
import AddAnnounceModal from "./AddAnnounceModal";

const columns = [
  { id: "orderNo", label: "OrderNo", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  {
    id: "text",
    label: "Text",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Announcements = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [announcesData, setAnnouncesData] = useState([]);
  const [addAnnounceModal, setAddAnnounceModal] = useState(false);
  const [editAnnounceModal, setEditAnnounceModal] = useState(false);
  const [announceData, setAnnounceData] = useState({});

  const { setIsLoading } = useContext(AuthContext);

  const getAnnouncesData = () => {
    setIsLoading(true);
    AnnounceService.getAnnoucements()
      .then((response) => {
        console.log(response);
        // setAnnouncesData(response.data.content);
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

  const handleChangePage = (announce, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (announce) => {
    setRowsPerPage(+announce.target.value);
    setPage(0);
  };
  return (
    <>
      <Paper sx={{ width: "100%", position: "relative" }}>
        <TableContainer sx={{ maxHeight: 740 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={columns.length}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                >
                  Announces
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)", width: "7rem" }}
                >
                  <Tooltip title="Add New Announce">
                    <Fab
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
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: 57,
                      minWidth: column.minWidth,
                      backgroundColor: "rgba(0,0,0, 0.1)",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {announcesData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={Math.random()}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <td
                        className="actions"
                        style={{
                          width: "7rem",
                          backgroundColor: "rgba(50,50,0, 0.1)",
                          position: "absolute",
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
                      </td>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={announcesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {addAnnounceModal && (
        <AddAnnounceModal
          onHide={hideAddAnnounce}
          openModal={addAnnounceModal}
          setAddAnnounceModal={setAddAnnounceModal}
          getAnnouncesData={getAnnouncesData}
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
