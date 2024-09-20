import { Box, Button, Card, Modal } from "@mui/material";


import PodInfo from "./content/podcast/PodInfo";

interface PodcastDetailsModalProps {
  open: boolean;
  onClose: () => void;
  podcastID: string |null;
  podcastTitle: string;

}

const PodcastDetailsModal: React.FC<PodcastDetailsModalProps> = ({
  open,
  onClose,
  podcastID,
  podcastTitle,
}) => {
  if (!podcastID) return null;

  return (
    <Modal  open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            position: "relative",
            width: "80%",
            maxWidth: "600px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
            maxHeight: "90vh", 
          }}
        >
          
          
          <h2>{podcastTitle}</h2>
          <PodInfo
          id={podcastID}
          />
      <Button onClick={onClose}> close</Button>
        </Card>
      </Box>
    </Modal>
  );
};

export default PodcastDetailsModal;
