import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";
import { atoms as getImageMagickCommandQuery } from "./GetImageMagickCommandQuery";

export const atoms = {
  value: atom(
    (get) =>
      `${
        get(getImageMagickCommandQuery.running) > 0 ? "Loading..." : get(getImageMagickCommandQuery.data)?.command || ""
      }`
  ),
};

const ImageMagickCommandResult = () => {
  const [value] = useAtom(atoms.value);
  return <div>{value}</div>;
};

export default suspensify(ImageMagickCommandResult);
