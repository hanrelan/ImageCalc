import Alert from "react-bootstrap/Alert";
import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";
import { atoms as processImage } from "./ProcessImage";

export const atoms = {
  value: atom((get) => `${get(processImage.error)}`),
  hidden: atom((get) => !get(processImage.error)),
};

const ProcessImageError = () => {
  const [value] = useAtom(atoms.value);
  return (
    <Alert key="danger" variant="danger">
      {value}
    </Alert>
  );
};

export default suspensify(ProcessImageError);
