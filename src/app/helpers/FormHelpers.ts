export function GetValue(val: any, key: string) {
  let value = null;
  if (val && val[key]) {
    value = val[key];
  }
  if (key.split(".").length > 1) {
    const keys = key.split(".");
    let temp = val;
    if (temp) {
      keys.forEach((key: string) => {
        temp = temp[key] || "-";
      });
    }
    value = temp;
  }

  return typeof value === "object" && value === null ? "0" : value;
}

export function FormatCurrency(val: any) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
