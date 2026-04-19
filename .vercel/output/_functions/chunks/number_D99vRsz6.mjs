const formatter = Intl.NumberFormat("en-US", {
  useGrouping: true
});
function formatCommaNumber(number) {
  return formatter.format(number);
}
function getPercentage(portion, total) {
  if (portion <= 0 || total <= 0) {
    return 0;
  }
  if (portion >= total) {
    return 100;
  }
  const percentage = portion / total * 100;
  return Math.min(Math.round(percentage), 100);
}

export { formatCommaNumber as f, getPercentage as g };
