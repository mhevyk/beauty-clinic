import { checkA11y, injectAxe } from "axe-playwright";
import { Page } from "playwright-core";

export default {
  preVisit: async (page: Page) => {
    await injectAxe(page);
  },
  postVisit: async (page: Page) => {
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};
