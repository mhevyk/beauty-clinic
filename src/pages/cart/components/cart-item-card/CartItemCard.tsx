import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import imagePlaceholder from "@/assets/icons/image-placeholder.svg?url";

import useLazyImage from "@/hooks/use-lazy-mage/useLazyImage";
import useToggle from "@/hooks/use-toggle/useToggle";
import {
  BoxImageStyled,
  BoxStyled,
  DefaultInfoBox,
  DividerStyled,
  TreatmentImage,
} from "@/pages/cart/components/cart-item-card/CartItemCard.styled";
import CartSessionList from "@/pages/cart/components/cart-session-list/CartSessionList";
import TreatmentGeneralInfo from "@/pages/cart/components/treatment-general-info/TreatmentGeneralInfo";
import { CartItem } from "@/store/cart/cartStore.ts";
import concatUrls from "@/utils/concat-urls/concatUrls";

type ItemCardProps = {
  item: CartItem;
};

export default function CartItemCard({ item }: ItemCardProps) {
  const { isOpen, toggle } = useToggle();

  const { treatment, sessions } = item;

  const [src, { hasError, isLoading }] = useLazyImage({
    src: concatUrls(
      import.meta.env.VITE_API_BASE_IMAGE_URL,
      treatment.imageUrl!
    ),
    placeholderSrc: imagePlaceholder,
  });

  const shouldShowImagePlaceholder = hasError || isLoading;

  return (
    <BoxStyled>
      <Box display="flex">
        <BoxImageStyled
          isLoading={isLoading}
          shouldShowImagePlaceholder={shouldShowImagePlaceholder}
        >
          <TreatmentImage src={src} alt={`image ${treatment.name}`} />
        </BoxImageStyled>
        <DefaultInfoBox>
          <Typography variant="heading" fontSize="22px" paddingBottom="12px">
            {treatment.name}
          </Typography>
          <Box>
            {/*TODO: fix render this component*/}
            <CartSessionList
              sessions={sessions.slice(0, 3)}
              treatment={treatment}
            />
          </Box>
        </DefaultInfoBox>
      </Box>
      <Collapse in={isOpen}>
        <Box display="flex">
          <TreatmentGeneralInfo sessions={sessions} treatment={treatment} />
          <Box width="100%">
            <CartSessionList
              sessions={sessions.slice(3)}
              treatment={treatment}
            />
          </Box>
        </Box>
      </Collapse>
      <DividerStyled textAlign="right">
        <Button onClick={toggle} sx={{ p: 0 }}>
          {isOpen ? "hide" : "show"} sessions
        </Button>
      </DividerStyled>
    </BoxStyled>
  );
}
