import EmployeeShowcaseSection from "@/pages/home/components/EmployeeShowcaseSection.tsx";
import HeroSection from "@/pages/home/components/HeroSection.tsx";
import MyTreatments from "@/pages/home/components/MyTreatments.tsx";
import Testimonials from "@/pages/home/components/Testimonials.tsx";

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
