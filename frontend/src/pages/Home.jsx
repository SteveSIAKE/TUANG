import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import MyDocument from "./pdf";


export default function Home() {
   return (
     <>
       <MyDocument />
       <HeroSection />
       <Features />
     </>
   );
}

