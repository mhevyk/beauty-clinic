import AppHelmet from "@/components/app-helmet/AppHelmet";
import EmployeeShowcaseSection from "@/pages/home/components/employee-showcase-section/EmployeeShowcaseSection";
import HeroSection from "@/pages/home/components/hero-section/HeroSection";
import MyTreatments from "@/pages/home/components/my-treatments/MyTreatments";
import Testimonials from "@/pages/home/components/testimonials/Testimonials";

// TODO: change UI
export default function HomePage() {
  return (
    <AppHelmet title="Home">
      <HeroSection />
      <MyTreatments />
      <EmployeeShowcaseSection />
      <Testimonials />
    </AppHelmet>
  );
}
