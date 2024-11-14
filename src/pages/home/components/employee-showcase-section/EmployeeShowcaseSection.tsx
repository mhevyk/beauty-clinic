import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import employeeLilyImage from "@/assets/images/lily.webp";

import { EMPLOYEE_SHOWCASE_SECTION_ID } from "@/constants";
import {
  EmployeeDetails,
  EmployeeDetailsExpandDecoration,
  EmployeeImage,
  EmployeeImageWrapper,
  EmployeeSummary,
  LeafDecoration,
} from "@/pages/home/components/employee-showcase-section/EmployeeShowcaseSection.styled";

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
