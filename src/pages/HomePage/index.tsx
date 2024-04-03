import HeroSection from "./components/HeroSection";
import EmployeeShowcaseSection from "./components/EmployeeShowcaseSection";
import MyTreatments from "@pages/HomePage/components/MyTreatments";
import Testimonials from "@pages/HomePage/components/Testimonials";

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
