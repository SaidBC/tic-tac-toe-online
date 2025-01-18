import BtnsWrapper from "./BtnsWrapper";
import PickPlayer from "./PickPlayer";
import XOLogo from "../../components/XOLogo";

function Home() {
  return (
    <div className="self-center grid grid-cols-1 gap-12">
      <XOLogo />
      <PickPlayer />
      <BtnsWrapper />
    </div>
  );
}

export default Home;
