import React, { useEffect, useState, useContext, useCallback } from "react";

import AddArtistModal from "./AddArtistModal";
import EditArtistModal from "./EditArtistModal";
import AuthContext from "../../storage/auth-context";
import ArtistServiceV2 from "../../services/v2/ArtistService";
import { tableConfig } from "../../configs/config";
import TableCommon from "../commonUI/TableCommon";

const Artists = () => {
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(1);
  const [artistsData, setArtistsData] = useState([]);
  const [addArtistModal, setAddArtistModal] = useState(false);
  const [editArtistModal, setEditArtistModal] = useState(false);
  const [artistId, setArtistId] = useState();

  const { setIsLoading } = useContext(AuthContext);

  const getArtistsData = useCallback(() => {
    setIsLoading(true);
    ArtistServiceV2.getArtistsList(null, null, tableConfig.itemCount, page)
      .then((response) => {
        setTotalElements(response.data.artistsPage.totalElements);
        setArtistsData(response.data.artistsPage.content);
      })
      .then(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    getArtistsData();
    // eslint-disable-next-line
  }, [getArtistsData]);

  const handleDeleteArtist = (clickedIndex) => {
    const artistId = artistsData[clickedIndex]?.id;
    ArtistServiceV2.deleteArtist(artistId).then((response) => {
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
    setArtistId(artistsData[clickedIndex].id);
    setEditArtistModal(true);
  };

  const hideEditArtist = () => {
    setEditArtistModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TableCommon
        data={artistsData}
        columns={tableConfig.artistsColumn}
        handleDelete={handleDeleteArtist}
        showEdit={showEditArtist}
        title="Artists"
        showAddModal={showAddArtist}
        label="+ Add Artist"
        page={page}
        onPageChange={handleChangePage}
        count={totalElements}
      />
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
          getArtistsData={getArtistsData}
          artistId={artistId}
        />
      )}
    </>
  );
};

export default Artists;
