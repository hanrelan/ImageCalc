import Button from "react-bootstrap//Button";
import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";
import { atoms as transformationInput } from "./TransformationInput";
import { atoms as uploadImage } from "./UploadImage";
import { atoms as getImageMagickCommandQuery } from "./GetImageMagickCommandQuery";

const onClickAtom = atom(null, async (get, set) => {
  getImageMagickCommandQuery.run(get);
});

export const atoms = {
  text: atom(`Submit`),
  disabled: atom((get) => get(uploadImage.imageUrl) === "" || get(transformationInput.value) === ""),
  loading: atom((get) => get(getImageMagickCommandQuery.running) > 0),
};

const SubmitButton = () => {
  const [text] = useAtom(atoms.text);
  const [disabled] = useAtom(atoms.disabled);
  const [loading] = useAtom(atoms.loading);
  const [, onClick] = useAtom(onClickAtom);
  return (
    <div>
      <Button
        variant="primary"
        disabled={disabled || loading}
        onClick={
          !loading
            ? () => {
                onClick();
              }
            : null
        }
      >
        {loading ? "Loading..." : text}
      </Button>
    </div>
  );
};

export default suspensify(SubmitButton);
