import OIcon from "./OIcon";
import XIcon from "./XIcon";

function XOLogo() {
  return (
    <div className="relative flex items-center justify-self-center gap-[0.365rem]">
      <XIcon />
      <OIcon />
    </div>
  );
}

export default XOLogo;
