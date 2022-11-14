import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Container, Toolbar } from "@mui/material";

function Copyright() {
  return (
    <>
      <div className="flex flex-row items-center text-gray-500">
        {`Copyright ©  `}
        {
          <>
            {/* <Link className="gap-2" color="inherit" href="https://t.me/quatrefinance">
              <a href="">
                Quatrefinance
              </a>
            </Link> */}
            <div>{`  ${new Date().getFullYear()}`}</div>
          </>
        }
      </div>
      <div className="flex-1" />
      <div className="flex flex-row items-center gap-2">
        <a href="https://github.com/Quatre-Finance" target="_newtab">
          <img src="images/github-foot.svg" alt="github" />
        </a>
        <a href="https://twitter.com/QuatreFinance?s=09" target="_newtab">
          <img src="images/twitter.svg" alt="twitter" />
        </a>
        <a href="https://t.me/quatrefinance" target="_newtab">
          <img src="images/telegram.svg" alt="telegram" />
        </a>
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <Toolbar>
      <Container className="flex items-center gap-12 h-50">
        <Copyright />
      </Container>
    </Toolbar>
  );
};

export default Footer;
