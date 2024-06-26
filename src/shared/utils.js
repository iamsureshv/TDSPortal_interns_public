export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${separator}${date}/${month < 10 ? `0${month}` : `${month}`}/${year}${separator}`;
} 