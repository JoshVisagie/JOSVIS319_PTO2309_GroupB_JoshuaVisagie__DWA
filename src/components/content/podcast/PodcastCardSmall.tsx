import { Card } from "@mui/material";
import PodcastDetailsModal from "../../PodcastModal";
import { useState } from "react";

const PodcastCardSmall = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { podcastTitle, podcastID } = props;

  const handleClick = () => {
    if (!modalOpen) setModalOpen(true);
  };

  const handleClose = () => {
    console.log("closed");
    setModalOpen(!modalOpen);
    console.log(modalOpen);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        margin: "5px",
        width: "300px",
        height: "50px",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        textWrap:"nowrap"
      }}
    >
      <p>{podcastTitle}</p>

      <PodcastDetailsModal
        podcastID={podcastID}
        open={modalOpen}
        onClose={handleClose}
        podcastTitle={podcastTitle}
      />
    </Card>
  );
};

export default PodcastCardSmall;
