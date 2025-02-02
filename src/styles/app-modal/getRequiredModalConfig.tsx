import AppTypography from "@/styles/app-typography/AppTypography";

const getRequiredModalConfig = () => {
  return {
    id: crypto.randomUUID(),
    title: "Title",
    renderContent: () => (
      <AppTypography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eligendi
        suscipit accusamus veritatis ullam in doloremque dolor voluptate,
        facilis, nam voluptatem sapiente repellendus vero culpa nemo officia
        quia? Non, iste?
      </AppTypography>
    ),
  };
};

export default getRequiredModalConfig;
