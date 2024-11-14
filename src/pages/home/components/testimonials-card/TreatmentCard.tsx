import { ComponentType, SVGProps } from "react";

import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Treatment } from "@/api/generated";
import {
  BoxStyled,
  ImgStyled,
  TitleStyled,
} from "@/pages/home/components/testimonials-card/TreatmentCard.styled";

type TreatmentCardProps = {
  treatment: Treatment;
  DecorationComponent: ComponentType<SVGProps<SVGSVGElement>>;
  svgImageDecorationStyles: SxProps;
  treatmentImageUrl: string;
};

export default function TreatmentCard({
  treatment,
  DecorationComponent,
  svgImageDecorationStyles,
  treatmentImageUrl,
}: TreatmentCardProps) {
  return (
    <Grid item xs={12} sm={9} md={4.5} lg={3} xl={2.5}>
      <BoxStyled>
        <Box
          component={DecorationComponent}
          sx={{ position: "absolute", zIndex: 0, ...svgImageDecorationStyles }}
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
