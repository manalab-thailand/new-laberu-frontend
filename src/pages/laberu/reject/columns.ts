import { ITaskImageReject } from "src/types/interface";

export const columns = [
  {
    label: "รหัสรูปภาพ",
    name: "shortcode",
    field: "shortcode",
    align: "left",
    style: "font-weight:bold",
  },
  {
    label: "สถานะ",
    name: "status",
    field: (row: ITaskImageReject) => {
      const status = {
        waiting: "รอการแก้ไข",
        review: "รอการตรวจสอบ",
        reject: "ไม่อนุมัติ",
        approved: "อนุมัติ",
      };

      return status[row.status] ?? "";
    },
    align: "center",
  },
  {
    label: "คำอธิบาย",
    name: "description",
    field: (row: ITaskImageReject) => {
      if (row.new_result) return row.new_result;
      return row.task_success.result.annotation!.description;
    },
    align: "left",
  },
  {
    label: "",
    name: "actions",
    align: "center",
  },
];
