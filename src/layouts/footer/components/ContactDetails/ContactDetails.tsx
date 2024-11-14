import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import ContactForm from "@/containers/forms/contact-form/ContactForm";
import {
  BookNowLinkButton,
  GridStyled,
  InfoList,
  Section,
  SectionTitle,
} from "@/layouts/footer/components/ContactDetails/ContactDetails.styled";
import {
  DefinitionItem,
  DefinitionList,
} from "@/layouts/footer/components/DefinitionList/DefinitionList";

export default function ContactDetails() {
  return (
    <GridStyled container spacing={"65px"} columns={12}>
      <Section item xs={12} sm={12} md={4} lg={2.5} xl={3} as="section">
        <SectionTitle as="h1">Lily Organic Beautician</SectionTitle>
        <Typography variant="paragraph" lineHeight="2rem">
          I&apos;m a paragraph. Click here to add your own text and edit me.
        </Typography>
        <BookNowLinkButton component={Link} to="/treatments" variant="primary">
          Book Now
        </BookNowLinkButton>
      </Section>
      <Section item xs={12} sm={6} md={4} lg={2.6} xl={2} as="section">
        <SectionTitle>Info</SectionTitle>
        <InfoList>
          <li>500 Terry Francine Street</li>
          <li>San Francisco, CA 94158</li>
          <li>info@mysite.com</li>
          <li>Tel: 123-456-7890</li>
        </InfoList>
      </Section>
      <Section item xs={12} sm={6} md={4} lg={2.5} xl={2} as="section">
        <SectionTitle>Opening Hours</SectionTitle>
        <DefinitionList>
          <DefinitionItem label="Mon - Fri">10am - 8pm</DefinitionItem>
          <DefinitionItem label="Sat">10am - 4pm</DefinitionItem>
          <DefinitionItem label="Sun">10am - 6pm</DefinitionItem>
        </DefinitionList>
      </Section>
      <Section
        item
        xs={12}
        sm={12}
        md={12}
        lg={3.6}
        xl={5}
        as="section"
        disableBlockCentering
      >
        <SectionTitle>Contact</SectionTitle>
        <ContactForm />
      </Section>
    </GridStyled>
  );
}
