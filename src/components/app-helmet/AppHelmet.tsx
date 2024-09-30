import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

type AppHelmetProps = PropsWithChildren<{
  title: string;
}>;

export default function AppHelmet({ title, children }: AppHelmetProps) {
  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_APP_TITLE} | {title}
        </title>
      </Helmet>
      {children}
    </>
  );
}
