import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";

export const atoms = {
  value: atom(
    `Upload an image and describe the transformation you want in English. Let GPT-3 and ImageMagick do the rest!`
  ),
};

const Instructions = () => {
  const [value] = useAtom(atoms.value);
  return <div>{value}</div>;
};

export default suspensify(Instructions);
