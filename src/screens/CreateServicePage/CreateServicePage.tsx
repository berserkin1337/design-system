import { container } from "./CreateServicePage.css";
import { LeftSideBar } from "./LeftSideBar";
import { MainContent } from "./MainContent";

export const CreateServicePage = () => {
  return (
    <div className={container}>
      <LeftSideBar />
      <MainContent />
    </div>
  );
};
