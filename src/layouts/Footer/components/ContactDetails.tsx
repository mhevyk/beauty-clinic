import { Grid, Typography, styled } from "@mui/material";
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

// TODO: complete heading when variants are available
const SectionTitle = styled("h5")(({ theme }) => ({
  ...theme.typography.FontArialBlack2,
  fontSize: "18px",
  margin: "0 0 10px 0",
}));

// TODO: complete button styles when variants are supplied
const BookNowLinkButton = styled(Link)(({ theme }) => ({
  ...theme.typography.FontAvenirLight3,
  display: "block",
  marginTop: "22px",
  textTransform: "none",
  width: "max-content",
  fontWeight: 400,
  lineHeight: "21px",
  transition: "opacity 300ms",
  backgroundColor: theme.palette.secondary.main,
  padding: "12px 35px",
  borderRadius: 0,
  // TODO: fix color
  // @ts-expect-error
  color: theme.palette.ButtonBlack.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
  },
}));

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
        <Typography variant="FontAvenirLight3" style={{ fontSize: 16 }}>
          I'm a paragraph. Click here to add your own text and edit me.
        </Typography>
        <BookNowLinkButton to="/treatments">Book Now</BookNowLinkButton>
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
          <DefinitionItem label="Sat">10am - 4pm​</DefinitionItem>
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
