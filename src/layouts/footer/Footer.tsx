import { styled } from "@mui/material";
import Container from "@mui/material/Container";

import { CONTACTS_SECTION_ID } from "@/constants";
import ContactDetails from "@/layouts/footer/components/ContactDetails";
import LocationMap from "@/layouts/footer/components/LocationMap";

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
      <ContactDetailsTitle>Let&apos;s get in touch</ContactDetailsTitle>
      <ContactDetails />
      <LocationMap />
      <CopyrightText>© 2023 by Maksym Hevyk and Vasyl Feniak</CopyrightText>
    </FooterWrapper>
  );
}
