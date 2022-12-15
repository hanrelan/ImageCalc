import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";

import ReactMarkdown from "react-markdown";

export const atoms = {
  value: atom(`
ImageCalc lets you easily edit your images with the same features as ImageMagick. Some examples of the transformations you can do include:

    - Increase the redness by 30%
    - Flip the image horizontally
    - Crop the bottom 20% of the image, invert the colors and remove the alpha channel

Your image never leaves your computer, so you can trust that it stays private. Give it a try!`),
};

const ExamplesText = () => {
  const [value] = useAtom(atoms.value);
  return (
    <div>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
};

export default suspensify(ExamplesText);
