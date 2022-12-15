import { atom } from "jotai";
import { atomWithProxy } from "jotai/valtio";
import { proxy } from "valtio/vanilla";
import { atoms as transformationInput } from "./TransformationInput";
import { atoms as processImage } from "./ProcessImage";

const status = proxy({ running: 0, triggered: false, data: null, error: null });
const statusAtom = atomWithProxy(status);
const running = atom((get) => get(statusAtom).running);
const data = atom((get) => get(statusAtom).data);
const error = atom((get) => get(statusAtom).error);

async function createPromise(get) {
  const API_URL = `${import.meta.env.VITE_API_URL}/command`;
  const response = await fetch(
    API_URL +
      "?" +
      new URLSearchParams({
        transformation: get(transformationInput.value),
      })
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.status + " Failed fetch ");
  }
}

async function run(get) {
  status.running += 1;
  status.error = null;
  let response;
  try {
    response = await createPromise(get);
    status.data = response;
    processImage.run(get);
  } catch (error) {
    status.data = null;
    status.error = error;
  } finally {
    status.running -= 1;
  }
}

export const atoms = {
  data,
  running,
  error,
  run,
};
