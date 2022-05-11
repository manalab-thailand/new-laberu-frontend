import moment from "moment";

export const formatDateThai = (date: string) => {
  return moment(date).lang("th").format("DD MMM YY HH:mm");
};
