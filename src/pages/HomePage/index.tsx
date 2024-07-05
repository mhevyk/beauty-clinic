import MyTreatments from "@/pages/HomePage/components/MyTreatments";
import Testimonials from "@/pages/HomePage/components/Testimonials";

import EmployeeShowcaseSection from "./components/EmployeeShowcaseSection";
import HeroSection from "./components/HeroSection";

// TODO: change UI
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MyTreatments />
      <EmployeeShowcaseSection />
      <Testimonials />
    </>
  );
}
