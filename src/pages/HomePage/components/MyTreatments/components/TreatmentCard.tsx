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
  marginBottom: "30px",
  ...theme.typography.heading,
  marginTop: "100px",
  fontSize: "28px",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    width: 210,
  },
});

type TreatmentCardProps = {
  treatment: Treatment;
  decorationSvgImage: string;
  styleSvgImageDecoration: SxProps;
  treatmentImageSrc: string;
};

export default function TreatmentCard({
  treatment,
  decorationSvgImage,
  styleSvgImageDecoration,
  treatmentImageSrc,
}: TreatmentCardProps) {
  return (
    <Grid item xs={12} sm={9} md={4.5} lg={3} xl={2.5}>
      <BoxStyled>
        <SvgImageStyled
          sx={styleSvgImageDecoration}
          src={decorationSvgImage}
          alt="image"
        />
        <ImgStyled src={treatmentImageSrc} alt={treatment.name} />
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
