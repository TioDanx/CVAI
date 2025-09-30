import Main from "@/components/Main";
import StepsSection from "@/components/StepsSection";
import WhyUs from "@/components/WhyUs";
import StarOrContact from "@/components/StarOrContact";

export default function Home() {
  

  return (
    <div className="overflow-hidden">
      <Main />
      <StepsSection />
      <WhyUs />
      <StarOrContact />
    </div>
  );
}
