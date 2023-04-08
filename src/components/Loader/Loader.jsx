import { Backdrop, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: "30" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export default Loader;
