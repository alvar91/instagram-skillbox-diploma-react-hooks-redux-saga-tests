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
