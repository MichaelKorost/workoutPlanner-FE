import { useTheme } from "@emotion/react";
import { Skeleton, useMediaQuery } from "@mui/material"


function WorkoutsSkeleton() {

    const theme = useTheme();
    const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
    const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    <Skeleton
      animation={"wave"}
      variant={"rectangular"}
      width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
      height={matchesSm ? 550 : matchesTablet ? 550 : 550}
      sx={{ display: "flex" }}
    />
    
  </>
  )
}

export default WorkoutsSkeleton