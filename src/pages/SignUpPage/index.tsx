import AuthAlternativeLink from "./components/AuthAlternativeLink";

// TODO: Add signin content
export default function SignUpPage() {
  return (
    <>
      <AuthAlternativeLink
        linkProps={{
          to: "/auth/signin",
          label: "Have an account",
        }}
      />
    </>
  );
}
