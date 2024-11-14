import {
  LinkStyled,
  TypographyLogo,
} from "@/layouts/sidebar/components/Logo/Logo.styled";

export default function Logo() {
  return (
    <TypographyLogo fontSize="22px" variant="heading">
      <LinkStyled to="/">Lily.</LinkStyled>
    </TypographyLogo>
  );
}
