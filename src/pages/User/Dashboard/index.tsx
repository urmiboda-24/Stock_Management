import {
  Avatar,
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Search,
  Notifications,
  Add,
  ExpandLess,
  TrendingUp,
  FiberManualRecordSharp,
  Message,
  InsertInvitation,
  Assignment,
  Public,
  Language,
} from "@mui/icons-material";
import CustomTextField from "../../../component/customTextField";
import CustomLineChart from "../../../component/customLineChart";
import { ChartOptions } from "chart.js";
import { trendingUpSvg } from "../../../asset";
import {
  acquisitionList,
  rankList,
  teamMemberList,
  teamProgress,
  visitRows,
} from "../../../utils/constants/userDashboard";
import { checkCondition } from "../../../utils/helper";
import { getStatusColor } from "../../../utils/helper/userDashboard";
import CustomBarChart from "../../../component/customBarChart";
import CommonHeader from "../../../component/header";
import {
  MapDispatchToProps,
  connect,
  useSelector as UseSelector,
} from "react-redux";
import { IDashboardContainerDispatch } from "../../../utils/interface/dashboard";
import { getDashboardDataRequest } from "../../../store/dashboard/action";
import { useEffect as UseEffect, useState as UseState } from "react";

export type DashboardProps = IDashboardContainerDispatch;

const mapDispatchToProps: MapDispatchToProps<IDashboardContainerDispatch, any> =
  {
    getDashboardDataRequest,
  };

const renderNewTask = () => {
  return (
    <NewTaskBox>
      <Box style={{ maxWidth: "130px" }}>
        <NewTaskButton startIcon={<Add />}>New Task</NewTaskButton>
      </Box>
      <ShareExportBox>
        <ShareButton className="share-btn">Share</ShareButton>
        <ShareButton className="export-btn">Export</ShareButton>
      </ShareExportBox>
    </NewTaskBox>
  );
};

const renderSaleChat = () => {
  const { dashboardData } = UseSelector((state: any) => state.dashboard);
  const saleChartData = dashboardData.length > 0 ? dashboardData[0] : [];
  const [isWeek, setIsWeek] = UseState<boolean>(true);
  const onWeekMonthClick = (type: string) => {
    setIsWeek(type !== "Month");
  };

  const getData = () => {
    return {
      labels: isWeek ? saleChartData.week : saleChartData.month,
      datasets: [
        {
          label: "",
          data: isWeek ? saleChartData.week_value : saleChartData.month_value,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        display: false,
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <SaleCharContainer>
      <SaleInfoBox>
        <InfoBox>
          <Typography variant="h6">Sales Value</Typography>
          <ValueTypo variant="h5">$90.75</ValueTypo>
          <DayTypo variant="h5">
            Yesterday{" "}
            <DayBox>
              <ExpandLess />
              30.03%
            </DayBox>
          </DayTypo>
        </InfoBox>
        <SaleButtonBox>
          <Button
            onClick={() => onWeekMonthClick("Week")}
            className={isWeek ? "selectedButton" : "notSelectedBtn"}
          >
            Week
          </Button>
          <Button
            onClick={() => onWeekMonthClick("Month")}
            className={!isWeek ? "selectedButton" : "notSelectedBtn"}
          >
            Month
          </Button>
        </SaleButtonBox>
      </SaleInfoBox>
      <Divider />
      <CustomLineChart
        data={getData()}
        options={options}
        className="chartBox"
      />
    </SaleCharContainer>
  );
};

const renderRevenueCard = () => {
  return (
    <CardContainer container spacing={3}>
      <Grid size={5}>
        <RevenueImgBox>
          <img src={trendingUpSvg} className="revenueImg" alt="trending up" />
        </RevenueImgBox>
      </Grid>
      <Grid size={7}>
        <IconContainer>
          <Title variant="subtitle1">Customers</Title>
          <Metric variant="h3">345k</Metric>
          <DateRange variant="body2">
            Feb 1 - Apr 1, &nbsp;
            <span style={{ display: "flex", alignItems: "center" }}>
              <Language fontSize="small" /> WorldWide
            </span>
          </DateRange>
          <GrowthPercentage variant="body2">
            <ExpandLess fontSize="small" />
            <Typography>18.2% </Typography>
            <DescriptionText>Since last month</DescriptionText>
          </GrowthPercentage>
        </IconContainer>
      </Grid>
    </CardContainer>
  );
};

const renderCustomerRow = () => {
  return (
    <Grid container spacing={3} style={{ marginBottom: "24px" }}>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>{renderRevenueCard()}</Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>{renderRevenueCard()}</Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>{renderRevenueCard()}</Grid>
    </Grid>
  );
};

const renderPageVisiter = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Page Visit</SeeAllTypo>
        <SeeAllButton>See All</SeeAllButton>
      </VisitTitleBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <VisitTableHead>
            <TableRow>
              <TableCell>Page Name</TableCell>
              <TableCell align="right">Page Views</TableCell>
              <TableCell align="right">Page Value</TableCell>
              <TableCell align="right">Bounce rate</TableCell>
            </TableRow>
          </VisitTableHead>
          <TableBody>
            {visitRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.view}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </VisiterContainer>
  );
};

const renderTeamSection = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Team Member</SeeAllTypo>
        <SeeAllButton>See All</SeeAllButton>
      </VisitTitleBox>
      <Divider />
      <TeamInfoWrapper>
        {teamMemberList.map((member) => {
          const btnIcon = checkCondition(
            member.action === "Invite",
            <InsertInvitation />,
            <Message />
          ) as string;
          return (
            <TeamInfoBox>
              <MemberInfoBox>
                <Avatar />
                <UserNameBox>
                  <MemberNameTypo>{member.name}</MemberNameTypo>
                  <StatusBox>
                    <FiberManualRecordSharp
                      style={{
                        fontSize: "small",
                        color: getStatusColor(member.status),
                      }}
                    />
                    {member.status}
                  </StatusBox>
                </UserNameBox>
              </MemberInfoBox>
              <MemberActionButton startIcon={btnIcon}>
                {member.action}
              </MemberActionButton>
            </TeamInfoBox>
          );
        })}
      </TeamInfoWrapper>
    </VisiterContainer>
  );
};

const renderProgressTrack = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Progress Track</SeeAllTypo>
      </VisitTitleBox>
      <Divider />
      {teamProgress.map((progress) => {
        return (
          <ProgressWrapper>
            <Assignment />
            <ProgressBox>
              <ProgressInfoBox>
                <ProgressTypo>{progress.name}</ProgressTypo>
                <ProgressTypo className="barPercentage">
                  {progress.barPer}
                </ProgressTypo>
              </ProgressInfoBox>
              <ProgressBar
                variant="determinate"
                value={progress.value}
                progressColor={progress.color}
              />
            </ProgressBox>
          </ProgressWrapper>
        );
      })}
    </VisiterContainer>
  );
};

const renderRankSection = () => {
  return (
    <VisiterContainer>
      {rankList.map((rankInfo) => {
        return (
          <>
            <RankWrapper>
              <RankValueBox>
                <Public />
                <RankBox>
                  <RankTitleTypo>{rankInfo.title}</RankTitleTypo>
                  <RankSubTitle>
                    <RankSubTitleTypo>{rankInfo.subTitle}</RankSubTitleTypo>
                    {rankInfo.subTitle && <ExpandLess fontSize="small" />}
                  </RankSubTitle>
                </RankBox>
              </RankValueBox>
              <RankValueBox>
                <Typography>{rankInfo.value}</Typography>
                <TrendingUp />
              </RankValueBox>
            </RankWrapper>
            <Divider />
          </>
        );
      })}
    </VisiterContainer>
  );
};

const renderAcquisitionSection = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Acquisition</SeeAllTypo>
      </VisitTitleBox>
      <AcquisitionWrapper>
        <AcquisitionTypo>
          Tells you where your visitors originated from, such as search engines,
          social networks or website referrals.
        </AcquisitionTypo>
        {acquisitionList.map((item) => (
          <AcquisitionBox>
            <RankValueBox>
              {item?.icon && <item.icon />}
              <RankBox>
                <AcquisitionTypo>{item?.title}</AcquisitionTypo>
                <RankSubTitle>
                  <AcquisitionValue>{item?.value}</AcquisitionValue>
                </RankSubTitle>
              </RankBox>
            </RankValueBox>
          </AcquisitionBox>
        ))}
      </AcquisitionWrapper>
    </VisiterContainer>
  );
};

const renderOrderSection = () => {
  const { dashboardData } = UseSelector((state: any) => state.dashboard);
  const chart1 = dashboardData.length ? dashboardData[1] : [];
  const chart2 = dashboardData.length ? dashboardData[2] : [];
  const data = {
    labels: chart1.week,
    datasets: [
      {
        label: "",
        data: chart1.week_value,
        tension: 0.4,
        fill: true,
        barThickness: 12,
        backgroundColor: "rgb(25, 118, 210)",
        barRadius: 10,
      },
      {
        label: "",
        data: chart2.week_value,
        backgroundColor: "rgb(46, 125, 50)",
        tension: 0.4,
        fill: true,
        barThickness: 12,
        borderRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          offset: true,
        },
      },
      y: {
        grid: {
          offset: true,
        },
        display: false,
        title: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 50,
      },
    },
  };
  return (
    <VisiterContainer>
      <OrderTitleBox>
        <OrderInfoBox>
          <AcquisitionTypo>Total Orders</AcquisitionTypo>
          <AcquisitionValue>453</AcquisitionValue>
          <DayBox>
            <ExpandLess />
            30.03%
          </DayBox>
        </OrderInfoBox>
        <Box>
          <StatusBox>
            <FiberManualRecordSharp className="dotIcon" color="primary" />
            <BarChatLabelTypo>
              <span title={chart1.stock_name}>{chart1.stock_name}</span>
            </BarChatLabelTypo>
          </StatusBox>
          <StatusBox>
            <FiberManualRecordSharp className="dotIcon" color="success" />{" "}
            <BarChatLabelTypo>
              <span title={chart2.stock_name}>{chart2.stock_name}</span>
            </BarChatLabelTypo>
          </StatusBox>
        </Box>
      </OrderTitleBox>

      <CustomBarChart data={data} options={options} />
    </VisiterContainer>
  );
};

const Dashboard = (props: IDashboardContainerDispatch) => {
  UseEffect(() => {
    props.getDashboardDataRequest();
  }, []);
  return (
    <Box style={{ width: "100%" }}>
      {renderNewTask()}
      {renderSaleChat()}
      {renderCustomerRow()}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              {renderPageVisiter()}
            </Grid>
            <Grid size={{ xs: 12, xl: 6 }}>{renderTeamSection()}</Grid>
            <Grid size={{ xs: 12, xl: 6 }}>{renderProgressTrack()}</Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Grid container spacing={2}>
            <Grid size={12}>{renderOrderSection()}</Grid>
            <Grid size={12}>{renderRankSection()}</Grid>
            <Grid size={12}>{renderAcquisitionSection()}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(Dashboard);

const NewTaskBox = styled(Box)({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

const NewTaskButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  height: "31px",
  borderRadius: "5px",
});
const ShareExportBox = styled(Box)({
  border: "1px solid #262b40",
  borderRadius: "10px",
  height: "31px",
  "& .export-btn": {
    borderLeft: "1px solid #262b40",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  "& .share-btn": {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});
const ShareButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 0,
  maxWidth: "31px",
  height: "100%",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
});
const SaleCharContainer = styled(Box)({
  backgroundColor: "#acebfd",
  borderRadius: "10px",
  margin: "10px 0 1.5rem 0",
  padding: "20px",
  "& .chartBox": {
    maxHeight: 300,
    width: "100% !important",
  },
});
const SaleInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 25,
});
const InfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ValueTypo = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: 1.6,
});
const DayTypo = styled(Typography)({
  fontSize: "0.875em",
  fontWeight: 400,
  lineHeight: 1.6,
  display: "flex",
  alignItems: "center",
});
const DayBox = styled(`span`)({
  display: "flex",
  alignItems: "center",
  color: "green",
  flexDirection: "row",
});
const SaleButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  height: "31px",
  "& .selectedButton": {
    backgroundColor: "#61dafb",
    color: "#262b40",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "0.5rem",
    height: "100%",
    "&:hover": {
      backgroundColor: "#61dafb",
      color: "#262b40",
    },
  },
  "& .notSelectedBtn": {
    backgroundColor: "#262b40",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "0.5rem",
    height: "100%",
    "&:hover": {
      backgroundColor: "#262b40",
      color: "#fff",
    },
  },
});
const VisiterContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-child": {
    borderRadius: "10px",
    background: "#fff",
  },
  "& .dotIcon": {
    fontSize: "14px",
  },
});
const VisitTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "72px",
  justifyContent: "space-between",
  padding: "0 20px",
});
const SeeAllButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
});
const SeeAllTypo = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
});
const VisitTableHead = styled(TableHead)({
  backgroundColor: "#f8f8f8",
  borderBottom: "1px solid #262b40",
});
const TeamInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  "&:not(:last-child)": {
    marginBottom: "16px",
  },
});
const TeamInfoWrapper = styled(Box)({
  padding: "1.25rem 1.5rem",
});
const MemberInfoBox = styled(Box)({
  display: "flex",
  gap: 30,
  justifyContent: "center",
  alignItems: "center",
});
const UserNameBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
const StatusBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.85rem",
});
const MemberNameTypo = styled(Typography)({
  fontSize: "1rem",
});
const MemberActionButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  minWidth: "100px",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
});
const ProgressWrapper = styled(Box)({
  display: "flex",
  padding: "1.25rem 1.5rem",
  alignItems: "center",
  gap: 10,
});
const ProgressBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 3,
});

const ProgressBar = styled(LinearProgress)(
  ({ progressColor }: { progressColor?: string }) => ({
    backgroundColor: "#f8f8f8",
    borderRadius: "50px",
    "& .MuiLinearProgress-bar": {
      backgroundColor: progressColor,
    },
  })
);
const ProgressInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& .barPercentage": {
    textWrap: "nowrap",
  },
});
const ProgressTypo = styled(Box)({
  fontSize: "0.875rem",
  fontWeight: 400,
});
const RankWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.25rem 1.5rem",
});
const RankBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
const RankValueBox = styled(Box)({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
const RankTitleTypo = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 400,
});
const RankSubTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
  "& .MuiSvgIcon-root": {
    color: "green",
  },
});
const RankSubTitleTypo = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 400,
  color: "grey",
});
const AcquisitionTypo = styled(Box)({
  color: "rgb(74, 80, 115)",
  fontSize: "16px",
  fontWeight: 400,
});
const AcquisitionWrapper = styled(Box)({
  padding: "0 1.5rem 1.25rem 1.5rem",
});
const AcquisitionValue = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
});
const AcquisitionBox = styled(Box)({
  marginTop: "1rem",
});
const OrderTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: ".0625rem solid #eaedf2",
});
const OrderInfoBox = styled(Box)({
  display: "flex",
  gap: 3,
  flexDirection: "column",
});
const CardContainer = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  border: "1px solid #eaedf2",
  borderRadius: "0.5rem",
  padding: "1.25rem 1.5rem",
  background: "#fff",
}));

const IconContainer = styled(Grid)({
  padding: 0,
});

const Title = styled(Typography)({
  color: "#4A5568",
  fontWeight: 500,
});

const Metric = styled(Typography)({
  fontWeight: 600,
  margin: "0.5rem 0",
});

const DateRange = styled(Typography)({
  color: "#718096",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
});

const GrowthPercentage = styled(Typography)({
  display: "flex",
  alignItems: "center",
  color: "#38A169",
  flexWrap: "wrap",
  fontWeight: 500,
});

const DescriptionText = styled(Typography)({
  color: "#4A5568",
  fontWeight: 400,
  marginLeft: 5,
});

const RevenueImgBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& .revenueImg": {
    width: "30px",
    height: "30px",
  },
});

const BarChatLabelTypo = styled(Box)({
  color: "rgb(74, 80, 115)",
  fontSize: "16px",
  fontWeight: 400,
  maxWidth: "120px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
