export const formatIso = (startTime, endTime) => {
  const startTimeString = startTime.toString();
  const endTimeString = endTime.toString();

  const start = new Date(startTimeString);
  const end = new Date(endTimeString);

  const startIso = start.toISOString();
  const endIso = end.toISOString();
  return {startIso, endIso};
};
