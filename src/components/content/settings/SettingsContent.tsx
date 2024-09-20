import { Box } from "@mui/material";
import {
  
  updateLastListenedPodcast,
  updateListenTime,
} from "../../../state/userData/userPodcastDataSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const SettingsContent = () => {
  const email = useAppSelector((state) => state.userData.user?.email);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [deletion, setDeletion] = useState("");

  const handleDeleteListen = () => {
    setOpen(true);
    setDeletion("listen");
  };

  const handleDeletion = () => {
    setOpen(false);
   
    if (deletion === "listen" && email) {
        dispatch(updateLastListenedPodcast({userEmail: email,last_listen:null}))
        dispatch(updateListenTime({userEmail:email,listen_time:[{}]}))
    }
    setDeletion("")
  };

  const handleCancel=()=>{
    setDeletion("")
    setOpen(false)
  }
  return (
    <Box sx={{display:"flex", justifyContent:"space-between", flexDirection:"column", alignContent:"center", padding:"30px"}}>
      <h3> User Data:</h3>
     

      <Box>
        <label> 
         <p>Delete Listen Data:  </p>   
        <Button
          variant='outlined'
          color='danger'
          endDecorator={<DeleteForever />}
          onClick={handleDeleteListen}
        >
          Discard
        </Button>
        </label>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant='outlined' role='alertdialog'>
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard all of your Pods?
          </DialogContent>
          <DialogActions>
            <Button variant='solid' color='danger' onClick={handleDeletion}>
              Delete My Data
            </Button>
            <Button
              variant='plain'
              color='neutral'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
};
export default SettingsContent;
