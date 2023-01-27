import React, { useContext, useEffect } from "react";
import Select from "@mui/material/Select";
import { Menu, MenuItem } from "@mui/material";
import { CreatePageContext } from "../../../lib/CreatePageContext";

export default function YearSelect({
  onChange,
  reverse,
}: {
  onChange: (...event: any[]) => void;
  reverse: boolean;
}) {
  const { nextBigEvent } = useContext(CreatePageContext);
  const start = nextBigEvent + 1;
  const end = 2023;
  
  const range = reverse
    ? Array.from(Array(end - start + 1).keys(), (x) => x + start).reverse()
    : Array.from(Array(end - start + 1).keys(), (x) => x + start);

  return (
    <Select
      label="Year"
      onChange={(event, _ ) => onChange(event.target.value)}
      defaultValue={reverse ? end : start}
      sx={{
        color: "#704f47",
      }}>
      {range.map((i) => (
        <MenuItem style={{ width: "6rem" }} key={i} value={i}>
          {i}
        </MenuItem>
      ))}
    </Select>
  );
}