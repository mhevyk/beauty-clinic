import {
  CONTACTS_SECTION_ID,
  EMPLOYEE_SHOWCASE_SECTION_ID,
} from "@/constants/index";

type MenuItem = {
  path: string;
  label: string;
};

export const menuItems: MenuItem[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: `/#${EMPLOYEE_SHOWCASE_SECTION_ID}`,
    label: "Meet Lily",
  },
  {
    path: "/treatments",
    label: "Treatments",
  },
  {
    path: "/blog",
    label: "Blog",
  },
  {
    path: `/#${CONTACTS_SECTION_ID}`,
    label: "Contact",
  },
  {
    path: "/members",
    label: "Members",
  },
];
