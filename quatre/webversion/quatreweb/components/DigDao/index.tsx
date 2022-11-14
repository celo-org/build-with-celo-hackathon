import React from "react";
// import styles from "../styles/local/components/write.module.css";
import { Container, Grid, Box, Typography, Modal } from "@mui/material";
import ProgressBar from "../customProgress/ProgressBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.1em solid #fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

interface DigDaoProps {
  setPageRef: Function,
  lightMode: boolean,
}

function DigDao(props: DigDaoProps): JSX.Element {
  const [modalPop, popModal] = React.useState(false);
  // const closeModal = () => popModal(false);
  // const { lightMode } = useAppContext();
  const { setPageRef, lightMode } = props;

  React.useEffect(() => {
    // popModal(true);
    setTimeout(() => {
      // popModal(false);
      setPageRef(0);
    }, 9000);
  }, []);

  return (
    <>
      <Container sx={{ py: 8 }} className='m-24'>
        <Grid item key={1} xs={12} sm={6} md={4}>
          <Typography variant='h3' style={{ color: 'var(--orange)', marginBottom: '2em' }} align='center'>Digesu Decentralized Autonomaus Community</Typography>
          {/* <Typography variant='h6' align='center'className="text-orange-500"> Coming soon ...</Typography> */}
          <div className="flex justify-center mt-4"><ProgressBar percent={5} lightMode={lightMode} /></div>
        </Grid>
      </Container>
      {/* <Modal open={modalPop} onClose={closeModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
              <Box sx={{ ...style, width: 400 }}>
                <div className="text-lg flex justify-center " onClick={() => routeTo("home", isWeb3Enabled)}>...in development</div>
              </Box>
            </Modal> */}
    </>
  );
}

export default DigDao;
