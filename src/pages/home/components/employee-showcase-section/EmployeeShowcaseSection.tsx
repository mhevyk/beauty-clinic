import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LeafDecorationSvg from "@/assets/decorations/sharp-leaf.svg";
import employeeLilyImage from "@/assets/images/lily.webp";

import { EMPLOYEE_SHOWCASE_SECTION_ID } from "@/constants";

const EmployeeImageWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.between("sm", "md")]: {
    padding: "0 8vw",
    backgroundColor: theme.palette.CreamyDawn.main,
  },
}));

const EmployeeImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  aspectRatio: "4/5",
  [theme.breakpoints.up("xl")]: {
    aspectRatio: "17/14",
  },
}));

const EmployeeDetails = styled(Grid)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: theme.palette.CreamyDawn.main,
  padding: "0 4%",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    justifyContent: "flex-end",
  },
  [theme.breakpoints.up(1050)]: {
    justifyContent: "center",
    padding: "0 8%",
  },
}));

const LeafDecoration = styled(LeafDecorationSvg)(({ theme }) => ({
  margin: "0 auto",
  width: "220px",
  marginBottom: "43px",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    right: "50%",
    transform: "translateX(35%)",
    top: "-90px",
    width: "443px",
    marginBottom: 0,
  },
}));

// NOTE: used to create layers effect in this section
const EmployeeDetailsExpandDecoration = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  width: "65%",
  height: "90px",
  backgroundColor: theme.palette.CreamyDawn.main,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const EmployeeSummary = styled(Typography)(({ theme }) => ({
  lineHeight: "35.2px",
  margin: 0,
  marginBottom: "42px",
  [theme.breakpoints.up("md")]: {
    marginBottom: "20px",
  },
  [theme.breakpoints.up(1050)]: {
    marginBottom: 0,
  },
}));

export default function EmployeeShowcaseSection() {
  return (
    <Box component="section" id={EMPLOYEE_SHOWCASE_SECTION_ID}>
      <EmployeeDetailsExpandDecoration />
      <Grid container columns={12}>
        <EmployeeImageWrapper item xs={12} md={6}>
          <EmployeeImage
            src={employeeLilyImage}
            alt={"Treatment employee Lily"}
          />
        </EmployeeImageWrapper>
        <EmployeeDetails item xs={12} md={6}>
          <LeafDecoration />
          <Typography
            letterSpacing="10.5px"
            fontSize="15px"
            marginBottom="11px"
            textTransform="uppercase"
          >
            Meet lily
          </Typography>
          <Typography variant="heading" marginBottom="37px" component="h3">
            Hi, I&apos;m Lily
          </Typography>
          <EmployeeSummary variant="paragraph" as="p" data-testid="description">
            I&apos;m a paragraph. Click here to add your own text and edit me.
            It&apos;s easy. Just click “Edit Text” or double click me to add
            your own content and make changes to the font. Feel free to drag and
            drop me anywhere you like on your page. I&apos;m a great place for
            you to tell a story and let your users know a little more about you.
          </EmployeeSummary>
        </EmployeeDetails>
      </Grid>
      <EmployeeDetailsExpandDecoration />
    </Box>
  );
}
