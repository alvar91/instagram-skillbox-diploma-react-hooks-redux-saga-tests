/**
* Function to format the date
* @param {string} dateString Date in format like "2021-02-11T17:25:19-05:00"
* @return {string} Date in format like "Fri, Feb 12, 2021"
*/

export const getFormattedDate = (dateString) => {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = `${dateString.slice(0, -6)}.000${dateString.slice(-6)}`;
  const mls = Date.parse(formattedDate);
  const date = new Date(mls).toLocaleString("en-US", options);
  return date;
};
