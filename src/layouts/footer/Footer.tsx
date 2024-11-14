import { CONTACTS_SECTION_ID } from "@/constants";
import {
  ContactDetailsTitle,
  CopyrightText,
  FooterWrapper,
} from "@/layouts/footer/Footer.styled";
import ContactDetails from "@/layouts/footer/components/ContactDetails/ContactDetails";
import LocationMap from "@/layouts/footer/components/LocationMap/LocationMap";

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
