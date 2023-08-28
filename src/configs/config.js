export const tableConfig = {
  itemCount: 10,
  eventsColumn: [
    {
      id: "status",
      label: "Status",
      maxWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "title",
      label: "Title",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "startHour",
      label: "Start Hour",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "action",
      label: "Action",
      align: "right",
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
  ],
  artistsColumn: [
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
      align: "right",
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
  ],
  venuesColumn: [
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "country", label: "Country", minWidth: 100 },
    { id: "city", label: "City", minWidth: 100 },
    {
      id: "fullAddress",
      label: "Full Address",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      align: "right",
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
  ],
};
