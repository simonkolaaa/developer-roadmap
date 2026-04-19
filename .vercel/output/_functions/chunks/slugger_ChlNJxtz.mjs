const regex = /[^A-Za-z0-9_\- ]/g;
function slugify(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.toLowerCase().replace(regex, "").trim().replace(/ /g, "-");
}

export { slugify as s };
