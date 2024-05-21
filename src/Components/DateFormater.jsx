const formatDateAsDateObject = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const day = date.getDate();
  return new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  );
};

export default  formatDateAsDateObject