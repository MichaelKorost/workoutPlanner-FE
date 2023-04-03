// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Profile.scss";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import missingImg from "../../assets/missing-profile.png";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


function Profile({user, onSave}) {

const [newName, setNewName] = useState(user.name)
const [toggleEdit, setToggleEdit] = useState(true)


const handleToggleEdit = () => {
  setToggleEdit(!toggleEdit)
  setNewName(user.name)
}

  const handleTextChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSave = () => {
  
    const updatedName = newName
    onSave(updatedName)
  }

  useEffect(() => {
    setNewName(user.name)
  },[user])

  console.log(user)
  return (
    <div className="profile-page">
      <div className="profile-image-container">
        <img className="profile__img" src={missingImg} alt="upload" />
        <Button
          variant="contained"
          component="label"
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            backgroundColor: "#7f8c8d",
            borderRadius: "50%",
            minWidth: "60px",
            minHeight: "60px",
            padding: "0",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            "&:hover": { backgroundColor: "#2ed573" },
          }}
        >
          <AddIcon />
          {/* <input hidden accept="image/*" type="file" onChange={handleImage} /> */}
        </Button>
      </div>
      <section className="profile-info-container">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow:
              " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            width: "400px",
            height: "80px",
          }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Name" variant="standard" onChange={handleTextChange} value={newName} disabled={toggleEdit} />
          <EditIcon
            onClick={handleToggleEdit}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": { backgroundColor: "#f1f2f6", borderRadius: "50%" },
            }}
          />
          <Tooltip title="Save" placement="top">
            <Button
            onClick={handleSave}
              sx={{
                width: "54px",
                height: "54px",
                backgroundColor: "#2196f3",
                margin:" 0 0 0 auto",
                "&:hover": { backgroundColor: "#1e88e5" },
              }}
            >
              <SaveAsIcon sx={{ color: "white", fontSize: "36px" }} />
            </Button>
          </Tooltip>
        </Box>
      </section>
    </div>
  );
}

export default Profile;
