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

import AddArtistModal from "./AddArtistModal";
import EditArtistModal from "./EditArtistModal";
import AuthContext from "../../storage/auth-context";
import ArtistService from "../../services/ArtistService";

const columns = [
  { id: "fullName", label: "Full\u00a0Name", minWidth: 100 },
  { id: "genre", label: "Genre", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    // align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "posters",
  //   label: "Posters",
  //   minWidth: 100,
  //   // align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
];

const Artists = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [artistsData, setArtistsData] = useState([]);
  const [addArtistModal, setAddArtistModal] = useState(false);
  const [editArtistModal, setEditArtistModal] = useState(false);
  const [artistData, setArtistData] = useState({});

  const { setIsLoading } = useContext(AuthContext);

  const getArtistsData = () => {
    setIsLoading(true);
    // has not any query 
    ArtistService.getArtistsList()
      .then((response) => {
        setArtistsData(response.data.content);
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getArtistsData();
    // eslint-disable-next-line
  }, []);

  const handleDeleteArtist = (clickedIndex) => {
    const artistId = artistsData[clickedIndex]?.id;
    ArtistService.deleteArtist(artistId).then((response) => {
      response.status === 200 && getArtistsData();
    });
  };

  const showAddArtist = () => {
    setAddArtistModal(true);
  };

  const hideAddArtist = () => {
    setAddArtistModal(false);
  };

  const showEditArtist = (clickedIndex) => {
    const artist = artistsData[clickedIndex];
    setArtistData(artist);
    setEditArtistModal(true);
  };

  const hideEditArtist = () => {
    setEditArtistModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
                  Artists
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={1}
                  style={{ backgroundColor: "rgba(0,0,0, 0.2)", width: "7rem" }}
                >
                  <Tooltip title="Add New Artist">
                    <Fab
                      onClick={showAddArtist}
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
              {artistsData
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
                          right: "0",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => showEditArtist(index)}
                            aria-label="edit"
                            size="large"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={() => handleDeleteArtist(index)}
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
          count={artistsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {addArtistModal && (
        <AddArtistModal
          onHide={hideAddArtist}
          openModal={addArtistModal}
          setAddArtistModal={setAddArtistModal}
          getArtistsData={getArtistsData}
        />
      )}

      {editArtistModal && (
        <EditArtistModal
          onHide={hideEditArtist}
          openModal={editArtistModal}
          setEditArtistModal={setEditArtistModal}
          artistData={artistData}
          getArtistsData={getArtistsData}
        />
      )}
    </>
  );
};

export default Artists;
