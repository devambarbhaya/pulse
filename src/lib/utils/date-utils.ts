export const defaultDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const onlyDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
});
