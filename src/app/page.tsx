import Header from "../components/Header";
import MobileWrapper from "../components/MobileWrapper";
import CategoryNavigation from "./components/CategoryNavigation";

export default function Home() {
  return (
    <MobileWrapper>
      <Header />
      <CategoryNavigation />
    </MobileWrapper>
  );
}
