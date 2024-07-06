import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import { CartSession as CartSessionType } from "@/store/cart/cartStore.ts";
import { Treatment } from "@api/hooks";

const TreatmentInfo = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  paddingBottom: "16px",
  fontSize: "18px",
  margin: 0,
}));

const BoxStyled = styled(Box)({
  minWidth: "170px",
  paddingTop: "16px",
  marginRight: "22px",
});

const InformationBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

type TreatmentGeneralInfoProps = {
  sessions: CartSessionType[];
  treatment: Treatment;
};

export default function TreatmentGeneralInfo({
  sessions,
  treatment,
}: TreatmentGeneralInfoProps) {
  return (
    <BoxStyled>
      <InformationBox>
        <TreatmentInfo>Total</TreatmentInfo>
        <TreatmentInfo>
          ${sessions.length * treatment.pricePerUnit}
        </TreatmentInfo>
      </InformationBox>
      <InformationBox>
        <TreatmentInfo>Sessions</TreatmentInfo>
        <TreatmentInfo>{sessions.length}</TreatmentInfo>
      </InformationBox>
    </BoxStyled>
  );
}
