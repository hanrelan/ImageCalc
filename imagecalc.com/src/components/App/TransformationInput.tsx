import Form from "react-bootstrap/Form";

import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";

export const atoms = {
  placeholder: atom(`Rotate the image to the left`),
  value: atom(``),
};

const TransformationInput = () => {
  const [placeholder] = useAtom(atoms.placeholder);
  const [value, setValue] = useAtom(atoms.value);
  return (
    <>
      <Form.Label htmlFor="TransformationInput">Describe your transformation</Form.Label>
      <Form.Control
        type="input"
        id="TransformationInput"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxlength={500}
      />
    </>
  );
};

export default suspensify(TransformationInput);
