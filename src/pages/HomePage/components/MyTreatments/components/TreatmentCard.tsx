import { Treatment } from "@api/hooks";
import { Box, Grid, styled, SxProps, Typography } from "@mui/material";
import theme from "@theme/theme.ts";

const BoxStyled = styled(Box)({
  [theme.breakpoints.up("xs")]: {
    height: 460,
  },
  [theme.breakpoints.up("lg")]: {
    height: 560,
  },
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ImgStyled = styled("img")({
  position: "relative",
  zIndex: 5,
  top: "15%",
  objectFit: "cover",
  width: "auto",
  height: "40%",
  [theme.breakpoints.down("md")]: {
    height: "50%",
    top: "12%",
  },
});

const SvgImageStyled = styled("img")({
  position: "absolute",
  zIndex: 0,
});

const TitleStyled = styled("h4")({
  [theme.breakpoints.up("sm")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.up("md")]: {
    width: 210,
  },
  marginBottom: "30px",
  ...theme.typography.heading,
  marginTop: "100px",
  fontSize: "20px",
  textAlign: "center",
});

type TreatmentCardProps = {
  treatment: Treatment;
  decorationSvgImage: string;
  svgImageDecorationStyles: SxProps;
  treatmentImageUrl: string;
};

export default function TreatmentCard({
  treatment,
  decorationSvgImage,
  svgImageDecorationStyles,
  treatmentImageUrl,
}: TreatmentCardProps) {
  return (
    <Grid item xs={12} sm={9} md={4.5} lg={3} xl={2.5}>
      <BoxStyled>
        <SvgImageStyled
          sx={svgImageDecorationStyles}
          src={decorationSvgImage}
          alt="image"
        />
        <ImgStyled src={treatmentImageUrl} alt={treatment.name} />
        <TitleStyled>{treatment.name}</TitleStyled>
        <Typography
          variant="paragraph"
          fontSize="20px"
          textAlign="center"
          component="p"
        >
          {treatment.duration} mins | {treatment.pricePerUnit}$
        </Typography>
      </BoxStyled>
    </Grid>
  );
}
