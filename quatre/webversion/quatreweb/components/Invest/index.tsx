import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import styles from "../styles/local/components/write.module.css";
import { WrappedCard } from "../WrappedCard";
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

type InvestProps = {
  lightMode: boolean,
  setPageRef: Function,
  setmessage: Function,
}

function Invest(props: InvestProps): JSX.Element {
  // const [modalPop, popModal] = React.useState(false);
  // const closeModal = () => popModal(false);
  const { lightMode, setPageRef, setmessage } = props;

  React.useEffect(() => {
    setTimeout(() => {
      setPageRef(0);
    }, 9000);
  }, []);

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item key={0} xs={12} sm={6} md={4}>
            <WrappedCard heading={"StakeFinder"} content={<ProgressBar percent={7} lightMode={lightMode} />} key={0} imageUrl={undefined} />
          </Grid>
          <Grid item key={1} xs={12} sm={6} md={4}>
            <WrappedCard heading={"Provide Liquidity"} content={<ProgressBar percent={2} lightMode={lightMode} />} key={1} imageUrl={undefined} />
          </Grid>
          <Grid item key={2} xs={12} sm={6} md={4}>
            <WrappedCard heading={"Start-Ups"} content={<ProgressBar percent={2} lightMode={lightMode} />} key={2} imageUrl={undefined} />
          </Grid>
        </Grid>
      </Container>
      {/* <Modal open={modalPop} onClose={closeModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
              <Box sx={{ ...style, width: 200 }}>
                <Typography variant="h6" align="center" color="" paragraph>
                  ...in development
                </Typography>
              </Box>
            </Modal> */}
    </>
  );
}

export default Invest;
