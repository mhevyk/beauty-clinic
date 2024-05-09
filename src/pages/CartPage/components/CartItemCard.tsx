import useToggle from "@hooks/useToggle";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { CartItemWithMultipleSessions } from "@store/cart/cartStore";
import concatUrls from "@utils/concatUrls";
import minutesToHourMinutes from "@utils/minutesToHourMinutes";
import { format } from "date-fns";
import imagePlaceholder from "@icons/image-placeholder.svg";
import { useLazyImage } from "@hooks/useLazyImage";

const Card = styled("article")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "25px 40px",
}));

const TreatmentName = styled(Typography)({
  fontSize: "22px",
});

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.FieryOrange.main,
  "&::before, &::after": {
    borderColor: "inherit",
  },
}));

const CardContent = styled(Box)({
  margin: "25px 0",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

type CartItemCardProps = {
  item: CartItemWithMultipleSessions;
};

export default function CartItemCard({ item }: CartItemCardProps) {
  const { isOpen, toggle } = useToggle();
  const { sessions, treatment } = item;

  const [src, { hasError, isLoading }] = useLazyImage({
    src: concatUrls(
      import.meta.env.VITE_API_BASE_IMAGE_URL,
      treatment.imageUrl!
    ),
    placeholderSrc: imagePlaceholder,
  });

  const shouldShowImagePlaceholder = hasError || isLoading;

  return (
    <Card>
      <TreatmentName variant="heading">{treatment.name}</TreatmentName>
      <DividerStyled sx={{ marginTop: "22px" }} />
      <CardContent>
        <Stack direction="row" gap="20px" justifyContent="space-between">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isLoading ? 0.3 : 1,
              width: "165px",
              height: "90px",
              borderRadius: "4px",
              ...(shouldShowImagePlaceholder && {
                "& img": {
                  width: "60px",
                },
              }),
            }}
          >
            <Image src={src} alt={`${treatment.name} image`} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              textWrap: "nowrap",
              textAlign: "right",
            }}
          >
            <Typography fontSize="17px">${treatment.pricePerUnit}</Typography>
            <Typography fontSize="17px">
              {minutesToHourMinutes(treatment.duration)}
            </Typography>
          </Box>
        </Stack>

        <Collapse in={isOpen}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              mt: "20px",
            }}
          >
            {sessions.map((session) => (
              <Session key={session.id} session={session} />
            ))}
          </Box>
        </Collapse>
      </CardContent>

      <DividerStyled textAlign="right">
        <Button onClick={toggle} sx={{ p: 0 }}>
          {isOpen ? "hide" : "show"} sessions
        </Button>
      </DividerStyled>
    </Card>
  );
}

type SessionProps = {
  session: CartItemWithMultipleSessions["sessions"][0];
};

function Session({ session }: SessionProps) {
  const formattedStartDate = format(
    session.time.start,
    "MMMM d, yyyy 'at' h:mm aaa"
  );

  return (
    <Stack
      direction="row"
      gap="20px"
      justifyContent="space-between"
      key={session.id}
    >
      <Typography>{formattedStartDate}</Typography>
      <Typography>{session.employee.name}</Typography>
    </Stack>
  );
}
