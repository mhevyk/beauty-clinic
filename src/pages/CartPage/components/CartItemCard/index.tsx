import {
  Box,
  Button,
  Collapse,
  Divider,
  Typography,
  alpha,
  styled,
} from "@mui/material";

import imagePlaceholder from "@/assets/icons/image-placeholder.svg";

import { useLazyImage } from "@/hooks/useLazyImage.ts";
import useToggle from "@/hooks/useToggle.ts";
import CartSessionList from "@/pages/CartPage/components/CartItemCard/components/CartSessionList.tsx";
import TreatmentGeneralInfo from "@/pages/CartPage/components/TreatmentGeneralInfo.tsx";
import { CartItem } from "@/store/cart/cartStore.ts";
import concatUrls from "@/utils/concatUrls.ts";

const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.4),
  margin: "22px 0",
  padding: "26px",
}));

type BoxImageStyledProps = {
  isLoading: boolean;
  shouldShowImagePlaceholder: boolean;
};

const BoxImageStyled = styled(Box, {
  shouldForwardProp: prop =>
    prop !== "isLoading" && prop !== "shouldShowImagePlaceholder",
})<BoxImageStyledProps>(({ theme, isLoading, shouldShowImagePlaceholder }) => ({
  minWidth: "170px",
  minHeight: "170px",
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  marginRight: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: isLoading ? 0.3 : 1,
  ...(shouldShowImagePlaceholder && { "& img": { width: "100px" } }),
}));

const TreatmentImage = styled("img")({
  width: "auto",
  height: "170px",
});

const DefaultInfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  "&::before, &::after": {
    borderColor: "inherit",
  },
}));

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
