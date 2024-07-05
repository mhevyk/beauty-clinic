import { Container, styled } from "@mui/material";

import { CONTACTS_SECTION_ID } from "@/constants/index";

import ContactDetails from "./components/ContactDetails";
import GoogleMap from "./components/GoogleMap";

const FooterWrapper = styled(Container)({
  scrollMarginTop: "230px",
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
  fontSize: "11px",
  letterSpacing: "0.6rem",
  lineHeight: "1.8rem",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: 400,
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
