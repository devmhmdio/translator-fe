import TeamImg from "../../../images/avatar/b-sm.jpg";
import TeamImg2 from "../../../images/avatar/c-sm.jpg";
import TeamImg3 from "../../../images/avatar/a-sm.jpg";
import TeamImg4 from "../../../images/avatar/d-sm.jpg";

import { setDeadline } from "../../../utils/Utils";

export const displayScreenData = [
  {
    id: 1,
    avatarClass: "purple",
    title: "Screen 1",
    subtitle: "User 1",
    desc: "Design and develop the DashLite template for Envato Marketplace",
    lead: "Abu Bin",
    tasks: "3",
    totalTask: "93",
    checked: false,
    deadline: setDeadline(20), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: null,
        theme: "purple",
      },
      { value: "Milagros Betts", label: "Milagros Betts", theme: "pink" },
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
    ],
  }
];

export const teamList = [
  { value: "Abu Bin", label: "Abu Bin", theme: "purple" },
  { value: "Newman John", label: "Newman John", theme: "primary" },
  { value: "Milagros Betts", label: "Milagros Betts", theme: "purple" },
  { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
  { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
  { value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" },
];
