import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import AddArtistModal from "./AddArtistModal";
import EditArtistModal from "./EditArtistModal";
import AuthContext from "../../storage/auth-context";
import ArtistService from "../../services/ArtistService";
import TableActions from "../commonUI/TableActions";
import "./Artists.scss";
import TableHeader from "../commonUI/TableHeader";
import TableColumnTitle from "../commonUI/TableColumnTitle";

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
  {
    id: "action",
    label: "Action",
    align: "center",
    minWidth: 100,
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
      <Paper className="paper-container">
        <TableContainer sx={{ maxHeight: 740 }}>
          <TableHeader
            title="Artists"
            showAddModal={showAddArtist}
            toolTip="Add New Artist"
          />
          <Table stickyHeader aria-label="sticky table">
            <TableColumnTitle columns={columns} />
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
                        const truncatedValue =
                          typeof value === "string" &&
                          value.length > column.maxLength
                            ? `${value.slice(0, column.maxLength)}...`
                            : value;
                        return column.id === "action" ? (
                          <TableCell
                            className="table-cell-action"
                            key={column.id}
                            align={column.align}
                          >
                            <TableActions
                              handleDelete={() => handleDeleteArtist(index)}
                              showEdit={() => showEditArtist(index)}
                            />
                          </TableCell>
                        ) : (
                          <TableCell
                            className="table-cell-default"
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof truncatedValue === "number"
                              ? column.format(truncatedValue)
                              : truncatedValue}
                          </TableCell>
                        );
                      })}
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
          className="table-pagination"
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
