import Alert from "react-bootstrap/Alert";
import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";
import { atoms as getImageMagickCommandQuery } from "./GetImageMagickCommandQuery";

export const atoms = {
  value: atom((get) => `${get(getImageMagickCommandQuery.error)}`),
  hidden: atom((get) => !get(getImageMagickCommandQuery.error)),
};

const GetImageMagickCommandQueryError = () => {
  const [value] = useAtom(atoms.value);
  return (
    <Alert key="danger" variant="danger">
      {value}
    </Alert>
  );
};

export default suspensify(GetImageMagickCommandQueryError);
