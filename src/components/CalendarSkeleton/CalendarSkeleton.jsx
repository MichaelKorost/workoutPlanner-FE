import { useTheme } from "@emotion/react";
import { Skeleton, useMediaQuery } from "@mui/material";

function CalendarSkeleton() {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960

  return (
    <>
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
      <Skeleton
        animation={"wave"}
        variant={"rectangular"}
        width={matchesMd ? 120 : "100%"}
        height={matchesMd ? 40 : 50}
        sx={{ display: "flex" }}
      />
  
    </>
  );
}

export default CalendarSkeleton;
