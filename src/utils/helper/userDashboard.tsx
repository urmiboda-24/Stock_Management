import { styled, Box } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

export const getPageVisitRate = (rate: number, arrowColor: string) => {
  return (
    <RateBox>
      <ArrowDownward style={{ color: arrowColor }} /> {rate}%
    </RateBox>
  );
};

const RateBox = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
});

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "online":
    case "paid":
      return "green";
    case "offline":
      return "yellow";
    case "in meeting":
    case "cancelled":
      return "red";
    case "due":
      return "orange";
    default:
      return "red";
  }
};
