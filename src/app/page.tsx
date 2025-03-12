import Header from "../components/Header";
import MobileWrapper from "../components/MobileWrapper";
import CategoryNavigation from "./components/CategoryNavigation";
import ProductDisplay from "./components/ProductDisplay";

export default function Home() {
  return (
    <MobileWrapper>
      <Header />
      <CategoryNavigation />
      <ProductDisplay />
    </MobileWrapper>
  );
}
