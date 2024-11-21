export type AppTypographyProps = {
  children: string;
};

export default function AppTypography({ children }: AppTypographyProps) {
  return <p>{children}</p>;
}
