import { Treatment } from "@/api/generated";
import {
  BoxStyled,
  InformationBox,
  TreatmentInfo,
} from "@/pages/cart/components/treatment-general-info/TreatmentGeneralInfo.styled";
import { CartSession as CartSessionType } from "@/store/cart/cartStore.ts";

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
