import { DashboardIcons , SmallArrowRight } from "../assets";

export const dashboardCards = (tvl: string | number, currency: string, networkName: string, ) =>  [
  {
    name: "0",
    Icon: DashboardIcons,
    description: currency,
    // path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
  {
    name: "0",
    Icon: DashboardIcons,
    description: currency,
    // path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
  {
    name: networkName,
    Icon: DashboardIcons,
    description: "NETWORK",
    path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
  {
    name: "10",
    Icon: DashboardIcons,
    description: "PROPOSALS",
    // path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
  {
    name: "180",
    Icon: DashboardIcons,
    description: "OPENED BAND",
    // path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
  {
    name: "30",
    Icon: DashboardIcons,
    description: "CLOSED BAND",
    // path: null,
    arrow: <SmallArrowRight className="mr-3" />,
  },
];