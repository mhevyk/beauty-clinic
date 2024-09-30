import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

type AppHelmetProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export default function AppHelmet({
  title,
  description,
  children,
}: AppHelmetProps) {
  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_APP_TITLE} | {title}
        </title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      {children}
    </>
  );
}
