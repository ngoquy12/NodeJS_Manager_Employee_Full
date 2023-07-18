export const FORMATDATE = (date) => {
  let today = new Date(date);
  // Lấy ngày
  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }
  // Lấy tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  // Lấy năm
  let year = today.getFullYear();

  return `${day}/${month}/${year}`;
};
