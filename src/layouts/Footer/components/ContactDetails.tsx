import { Button, Grid, Typography, styled } from "@mui/material";
import theme from "@theme/theme";
import { DefinitionItem, DefinitionList } from "./DefinitionList";
import ContactForm from "./ContactForm";

const mediumScreenMediaQuery = theme.breakpoints.down("md");

// TODO: complete heading when variants are available
const SectionTitle = styled("h5")(({ theme }) => ({
  ...theme.typography.FontArialBlack2,
  fontSize: "18px",
  margin: "0 0 10px 0",
}));

// TODO: complete button styles when variants are supplied
const BookNowButton = styled(Button)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  display: "block",
  marginTop: "22px",
  textTransform: "none",
  width: "max-content",
  fontWeight: 400,
  lineHeight: "21px",
  backgroundColor: "black",
  padding: "12px 35px",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "black",
    opacity: 0.8,
  },
}));

type SectionProps = {
  disableBlockCentering?: boolean;
};

const Section = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "disableBlockCentering",
})<SectionProps>(({ disableBlockCentering }) => ({
  [mediumScreenMediaQuery]: {
    display: "flex",
    flexDirection: "column",
    alignItems: disableBlockCentering ? undefined : "center",
    textAlign: "center",
  },
}));

export default function ContactDetails() {
  return (
    <Grid container spacing={"28px"} columns={12}>
      <Section item xs={12} sm={12} md={4} lg={3}>
        <SectionTitle>Lily Organic Beautician</SectionTitle>
        <Typography variant="FontAvenirLight3" style={{ fontSize: 16 }}>
          I'm a paragraph. Click here to add your own text and edit me.
        </Typography>
        <BookNowButton>Book Now</BookNowButton>
      </Section>
      <Section item xs={12} sm={6} md={4} lg={3}>
        <SectionTitle>Info</SectionTitle>
        <ul style={{ fontSize: 16 }}>
          <li>500 Terry Francine Street</li>
          <li>San Francisco, CA 94158</li>
          <li>info@mysite.com</li>
          <li>Tel: 123-456-7890</li>
        </ul>
      </Section>
      <Section item xs={12} sm={6} md={4} lg={3}>
        <SectionTitle>Opening Hours</SectionTitle>
        <DefinitionList>
          <DefinitionItem label="Mon - Fri">10am - 8pm</DefinitionItem>
          <DefinitionItem label="Sat">10am - 4pm​</DefinitionItem>
          <DefinitionItem label="Sun">10am - 6pm</DefinitionItem>
        </DefinitionList>
      </Section>
      <Section item xs={12} sm={12} md={12} lg={3} disableBlockCentering>
        <SectionTitle>Contact</SectionTitle>
        <ContactForm />
      </Section>
    </Grid>
  );
}
