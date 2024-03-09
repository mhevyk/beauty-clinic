import { Box, styled } from "@mui/material";
import ContactDetails from "./components/ContactDetails";

const ContactDetailsTitle = styled("h3")(({ theme }) => ({
  ...theme.typography.FontAvenirLight2,
  textTransform: "uppercase",
  textAlign: "center",
  display: "block",
  fontWeight: 400,
  marginBottom: "22px",
  [theme.breakpoints.up("md")]: {
    margin: "140px 0",
  },
}));

export default function Footer() {
  return (
    <Box component="footer" sx={{ margin: "0 28px" }}>
      <ContactDetailsTitle>Let's get in touch</ContactDetailsTitle>
      <ContactDetails />
    </Box>
  );
}
