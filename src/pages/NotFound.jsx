import { Box, Grid } from "@mui/material";
import { Fade } from "react-reveal";

import { MainTitle } from "../components/UI/Titles";
import { MainContainer } from "../components/Containers/MainContainer";

export default function NotFound() {
  return (
    <Box height="93vh">
      <Box py={2}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              <Fade>
                <MainTitle text="products challenge :D" />
              </Fade>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>

      <Box py={2}>
        <MainContainer>
          <Grid container>
            <Grid item xs={12}>
              <Fade>
                <Box display="flex" width={500} height={500} mx="auto">
                  <img
                    src="https://www.initcoms.com/wp-content/uploads/2020/07/404-error-not-found-1.png"
                    alt="404"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
    </Box>
  );
}
