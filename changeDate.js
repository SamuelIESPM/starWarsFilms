function convertToEuropeanDate(americanDate) {
  // Split the American date string by "/"
  const parts = americanDate.split("-");

  // Extract month, day, and year from the parts array
  const month = parts[0];
  const day = parts[1];
  const year = parts[2];

  // Return the European date format as a string
  return `${day}/${month}/${year}`;
}
export default convertToEuropeanDate;
