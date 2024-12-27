import { getPageVisitRate } from "../helper/userDashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";

export const visitRows = [
  {
    name: "/demo/admin/index.html",
    view: "4.525",
    value: "$255",
    rate: getPageVisitRate(42.12, "green"),
  },
  {
    name: "/demo/admin/forms.html",
    view: "2.2987",
    value: "$139*",
    rate: getPageVisitRate(43.52, "red"),
  },
  {
    name: "/demo/admin/util.html",
    view: "2.844",
    value: "$124",
    rate: getPageVisitRate(32.35, "red"),
  },
  {
    name: "/demo/admin/validation.html",
    view: "1.22",
    value: "$55",
    rate: getPageVisitRate(15.78, "green"),
  },
  {
    name: "/demo/admin/modals.html",
    view: "500",
    value: "$3",
    rate: getPageVisitRate(75.12, "red"),
  },
];

export const teamMemberList = [
  {
    name: "Christopher Wood",
    status: "Online",
    action: "Invite",
  },
  {
    name: "Jose Leos",
    status: "In meeting",
    action: "Message",
  },
  {
    name: "Bonnie Green",
    status: "Offline",
    action: "Invite",
  },
  {
    name: "Neil Sims",
    status: "Online",
    action: "Message",
  },
];

export const teamProgress = [
  {
    name: "Rocket - SaaS Template",
    color: "#7C3AED",
    barPer: "34 %",
    value: 34,
  },
  {
    name: "Rocket - SaaS Template",
    color: "#10B981",
    barPer: "60 %",
    value: 60,
  },
  {
    name: "Homepage Design in Figma",
    color: "#FBA918",
    barPer: "45 %",
    value: 45,
  },
  {
    name: "Backend for Themesberg v2",
    color: "#E11D48",
    barPer: "34 %",
    value: 34,
  },
];

export const rankList = [
  {
    title: "Global Rank",
    subTitle: "",
    value: "#755",
  },
  {
    title: "Country Rank",
    subTitle: "United States",
    value: "#32",
  },
  {
    title: "Category Rank",
    subTitle: "Computer Technology",
    value: "#1",
  },
];

export const acquisitionList = [
  {
    title: "Bounce Rate",
    value: "33.50%",
    icon: BarChartIcon,
  },
  {
    title: "Sessions",
    value: "9567",
    icon: CollectionsIcon,
  },
  ,
];
