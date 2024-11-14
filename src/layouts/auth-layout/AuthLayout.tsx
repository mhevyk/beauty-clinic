import AppSuspenseWithOutlet from "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet";
import {
  Description,
  Header,
  HelloDecoration,
  Main,
  MainTitle,
  PageWrapper,
} from "@/layouts/auth-layout/AuthLayout.styled";

export default function AuthLayout() {
  return (
    <PageWrapper>
      <Main>
        <Header>
          <HelloDecoration />
          <MainTitle component="h1" variant="heading">
            Lily
          </MainTitle>
          <Description component="p" variant="heading">
            Organic Beutician
          </Description>
        </Header>
        <AppSuspenseWithOutlet />
      </Main>
    </PageWrapper>
  );
}
