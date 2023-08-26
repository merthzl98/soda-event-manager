import React, { useEffect, useState, useContext, useCallback } from "react";

import AuthContext from "../../storage/auth-context";
import VenueServiceV2 from "../../services/v2/VenueService";
import EditVenueModal from "./EditVenueModal";
import AddVenueModal from "./AddVenueModal";
import { tableConfig } from "../../configs/config";
import TableCommon from "../commonUI/TableCommon";

const Venues = () => {
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(1);
  const [venuesData, setVenuesData] = useState([]);
  const [addVenueModal, setAddVenueModal] = useState(false);
  const [editVenueModal, setEditVenueModal] = useState(false);
  const [venueId, setVenueId] = useState();

  const { setIsLoading } = useContext(AuthContext);

  const getVenuesData = useCallback(() => {
    setIsLoading(true);
    VenueServiceV2.getVenues(null, null, tableConfig.itemCount, null, page)
      .then((response) => {
        console.log({ response });
        setTotalElements(response.data.venuesPage.totalElements);
        setVenuesData(response.data.venuesPage.content);
      })
      .then(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    getVenuesData();
    // eslint-disable-next-line
  }, [getVenuesData]);

  const handleDeleteVenue = (clickedIndex) => {
    const venueId = venuesData[clickedIndex]?.id;
    VenueServiceV2.deleteVenue(venueId).then((response) => {
      response.status === 200 && getVenuesData();
    });
  };

  const showAddVenue = () => {
    setAddVenueModal(true);
  };

  const hideAddVenue = () => {
    setAddVenueModal(false);
  };

  const showEditVenue = (clickedIndex) => {
    setVenueId(venuesData[clickedIndex].id);
    setEditVenueModal(true);
  };

  const hideEditVenue = () => {
    setEditVenueModal(false);
  };

  const handleChangePage = (venue, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TableCommon
        data={venuesData}
        columns={tableConfig.venuesColumn}
        handleDelete={handleDeleteVenue}
        showEdit={showEditVenue}
        title="Venues"
        showAddModal={showAddVenue}
        label="+ Add Venue"
        page={page}
        onPageChange={handleChangePage}
        count={totalElements}
      />

      {addVenueModal && (
        <AddVenueModal
          onHide={hideAddVenue}
          openModal={addVenueModal}
          setAddVenueModal={setAddVenueModal}
          getVenuesData={getVenuesData}
        />
      )}

      {editVenueModal && (
        <EditVenueModal
          onHide={hideEditVenue}
          openModal={editVenueModal}
          setEditVenueModal={setEditVenueModal}
          getVenuesData={getVenuesData}
          venueId={venueId}
        />
      )}
    </>
  );
};

export default Venues;
