import { Container, styled } from "@mui/material";
import ContactDetails from "./components/ContactDetails";
import GoogleMap from "./components/GoogleMap";

const ContactDetailsTitle = styled("h3")(({ theme }) => ({
  ...theme.typography.FontAvenirLight2,
  textTransform: "uppercase",
  textAlign: "center",
  display: "block",
  fontWeight: 400,
  padding: "0 15vw",
  marginBottom: "22px",
  [theme.breakpoints.up("md")]: {
    margin: "140px 0",
    padding: "0",
  },
}));

// TODO: fix font
const CopyrightText = styled("p")(({ theme }) => ({
  ...theme.typography.FontAvenirLight2,
  fontSize: "14px",
  textAlign: "center",
  textTransform: "uppercase",
}));

// TODO: Add scroll margin top when testimonials is completed
export default function Footer() {
  return (
    <Container component="footer" id="contact" maxWidth={false}>
      <ContactDetailsTitle>Let's get in touch</ContactDetailsTitle>
      <ContactDetails />
      <GoogleMap />
      <CopyrightText>© 2023 by Maksym Hevyk and Vasyl Feniak</CopyrightText>
    </Container>
  );
}
