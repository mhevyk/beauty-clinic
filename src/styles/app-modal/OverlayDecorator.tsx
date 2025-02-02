import { Decorator } from "@storybook/react";

const OverlayDecorator: Decorator = (Story, ctx) => {
  return (
    <div
      className="app-modal__overlay"
      style={
        ctx.viewMode === "docs"
          ? {
              position: "relative",
              width: "100%",
              height: ctx.parameters?.docs?.story?.height,
              padding: "1rem",
              boxSizing: "border-box",
            }
          : undefined
      }
    >
      <Story />
    </div>
  );
};

export default OverlayDecorator;
