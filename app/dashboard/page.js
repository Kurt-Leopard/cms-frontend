import BlueprintForm from "../components/BlueprintForm";
import Sidebar from "../components/SideBar";

const BlueprintPage = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="sticky top-0 h-full w-[300px] bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <BlueprintForm />
      </div>
    </div>
  );
};

export default BlueprintPage;
