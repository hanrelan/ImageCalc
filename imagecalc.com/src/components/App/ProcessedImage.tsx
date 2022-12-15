import Image from "react-bootstrap/Image";
import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";
import { atoms as processImage } from "./ProcessImage";

export const atoms = {
  src: atom((get) => `${get(processImage.data)}`),
};

const fallback = "icons/image.svg";

const ProcessedImage = () => {
  const [src] = useAtom(atoms.src);
  return src !== "null" ? (
    <div className="w-100 h-100 border d-flex align-items-center">
      <Image fluid src={src} className="d-block mx-auto mw-100 mh-100" />
    </div>
  ) : (
    <div className="ratio ratio-1x1">
      <div className="border w-100 h-100 d-flex align-items-center">
        <Image className="d-block mx-auto" src={fallback} width={40} height={40} />
      </div>
    </div>
  );
};

export default suspensify(ProcessedImage);
