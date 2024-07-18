import EmployeeShowcaseSection from "@/pages/HomePage/components/EmployeeShowcaseSection";
import HeroSection from "@/pages/HomePage/components/HeroSection";
import MyTreatments from "@/pages/HomePage/components/MyTreatments";
import Testimonials from "@/pages/HomePage/components/Testimonials";

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
