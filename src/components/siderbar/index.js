import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// import moment from "moment";

function Sidebar(props) {
  const { archives = [], social = [] } = props;

  //   const ListMonth = [];
  //   const ListYear = [];

  //   archives.map((item) => {
  //     ListMonth.push(item.monthCreate);
  //     ListYear.push(item.yearCreate);
  //   });

  //   const sortListMonth = ListMonth?.sort((a, b) => {
  //     if (a > b) return -1;
  //     if (a < b) return 1;
  //     return 0;
  //   });
  //   const sortListYear = ListYear?.sort((a, b) => {
  //     if (a > b) return -1;
  //     if (a < b) return 1;
  //     return 0;
  //   });

  //   const uniqueMonth = Array.from(new Set(sortListMonth));
  //   const uniqueYear = Array.from(new Set(sortListYear));
  //   const Time = () => {
  //     const time = [];
  //     uniqueMonth.forEach((month) => time.push({ month }));
  //     uniqueYear.forEach((year) => time.push({ year }));
  //     return time;
  //   };
  //   console.log(Time());
  return (
    <>
      {/* <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Kho lưu trữ
      </Typography> */}
      {/* {uniqueMonth.map((item, i) => {
        return (
          <Link display="block" variant="body1">
            Tháng {thang}, {nam}
          </Link>
        );
      })} */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Mạng xã hội
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </>
  );
}

export default React.memo(Sidebar);
