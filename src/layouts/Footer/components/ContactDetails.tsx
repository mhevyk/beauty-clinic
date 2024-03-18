import { Grid, Typography, styled, Button } from "@mui/material";
import { DefinitionItem, DefinitionList } from "./DefinitionList";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";

const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "32px",
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: 0,
    flexWrap: "nowrap",
  },
}));

const SectionTitle = styled("h5")(({ theme }) => ({
  ...theme.typography.heading,
  fontSize: "18px",
  lineHeight: "auto",
  margin: "0 0 10px 0",
}));

const BookNowLinkButton = styled(Button)({
  padding: "8px 30px",
  display: "block",
  marginTop: "22px",
  width: "max-content",
});

type SectionProps = {
  disableBlockCentering?: boolean;
};

const Section = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "disableBlockCentering",
})<SectionProps>(({ theme, disableBlockCentering }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: disableBlockCentering ? undefined : "center",
    textAlign: "center",
  },
}));

const InfoList = styled("ul")({
  fontSize: 16,
  whiteSpace: "nowrap",
});

export default function ContactDetails() {
  return (
    <GridStyled container spacing={"65px"} columns={12}>
      <Section item xs={12} sm={12} md={4} lg={2.5} xl={3} as="section">
        <SectionTitle>Lily Organic Beautician</SectionTitle>
        <Typography variant="paragraph" lineHeight="2rem">
          I'm a paragraph. Click here to add your own text and edit me.
        </Typography>
        {/*TODO: fix component*/}
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
