import { atom } from "jotai";
import { atomWithProxy } from "jotai/valtio";
import { proxy } from "valtio/vanilla";
import { atoms as getImageMagickCommandQuery } from "./GetImageMagickCommandQuery";
import { atoms as uploadImage } from "./UploadImage";

import * as Magick from "https://knicknic.github.io/wasm-imagemagick/magickApi.js?url";

const status = proxy({ running: 0, triggered: false, data: null, error: null });
const statusAtom = atomWithProxy(status);
const running = atom((get) => get(statusAtom).running);
const data = atom((get) => get(statusAtom).data);
const error = atom((get) => get(statusAtom).error);

async function createPromise(get) {
  const outputFile = await Magick.executeAndReturnOutputFile({
    inputFiles: [await Magick.buildInputFile(get(uploadImage.imageUrl), "input.png")],
    commands: get(getImageMagickCommandQuery.data)?.command,
  });
  return await Magick.buildImageSrc({ name: outputFile.name, blob: new Blob([outputFile.buffer]) });
}

async function run(get) {
  status.running += 1;
  status.error = null;
  let response;
  try {
    response = await createPromise(get);
    status.data = response;
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
