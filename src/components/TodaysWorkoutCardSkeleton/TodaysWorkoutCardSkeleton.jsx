import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function TodaysWorkoutCardSkeleton() {
  return (
    <>
      <div style={{margin:"auto"}}>
      <Skeleton
        variant="text"
        sx={{
          fontSize: "24px",
          display: "flex",
          width: "40%",
          margin: "5px auto 10px",
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          fontSize: "34px",
          display: "flex",
          width: "40%",
          margin: "5px auto 10px",
        }}
      />

      <Skeleton variant="rectangular" width={"95%"} height={140} sx={{display:"flex", margin:"auto"}} />
      </div>
    
    
    </>
      
  );
}

export default TodaysWorkoutCardSkeleton;
