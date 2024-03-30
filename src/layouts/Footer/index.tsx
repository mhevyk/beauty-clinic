import { Container, styled } from "@mui/material";
import ContactDetails from "./components/ContactDetails";
import GoogleMap from "./components/GoogleMap";
import { CONTACTS_SECTION_ID } from "@constants/index";

// TODO: Change scroll margin top when testimonials is completed
const FooterWrapper = styled(Container)({
  scrollMarginTop: "140px",
}) as typeof Container;

const ContactDetailsTitle = styled("h3")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "17px",
  letterSpacing: "0.7rem",
  lineHeight: "1.8rem",
  fontWeight: 400,
  textTransform: "uppercase",
  textAlign: "center",
  display: "block",
  padding: "0 15vw",
  marginBottom: "22px",
  [theme.breakpoints.up("md")]: {
    margin: "140px 0",
    padding: "0",
  },
}));

const CopyrightText = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "14px",
  letterSpacing: "0.7rem",
  lineHeight: "1.8rem",
  textAlign: "center",
  textTransform: "uppercase",
}));

export default function Footer() {
  return (
    <FooterWrapper component="footer" id={CONTACTS_SECTION_ID} maxWidth={false}>
      <ContactDetailsTitle>Let's get in touch</ContactDetailsTitle>
      <ContactDetails />
      <GoogleMap />
      <CopyrightText>© 2023 by Maksym Hevyk and Vasyl Feniak</CopyrightText>
    </FooterWrapper>
  );
}
