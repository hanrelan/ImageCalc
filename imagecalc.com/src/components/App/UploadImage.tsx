import { atom, useAtom } from "jotai";
import { suspensify } from "@/lib/api_helpers";

import Image from "react-bootstrap/Image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const atoms = {
  loading: atom(false),
  imageUrl: atom(""),
};

export default suspensify(() => {
  const [loading, setLoading] = useAtom(atoms.loading);
  const [imageUrl, setImageUrl] = useAtom(atoms.imageUrl);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const base64 = reader.result;
      setImageUrl(base64);
      setLoading(false);
    });
    reader.readAsDataURL(file);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
    },
    maxSize: 100000000,
    multiple: false,
    onDrop,
  });
  const bgcolor = imageUrl ? "bg-light" : "bg-white shadow-sm";
  return (
    <div
      {...getRootProps()}
      className={`w-100 h-100 d-flex align-items-center flex-column border justify-content-center ${bgcolor}`}
      role="button"
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <Image fluid src={imageUrl} alt="UploadImage" />
      ) : (
        <div className="p-2 small der d-flex text-center w-100 flex-column mt-4">
          <Image className="mx-auto justify-self-center d-block" src="icons/upload.svg" width={40} height={40} />
          <p className="user-select-none d-block">Click or drag an image to this area to upload</p>
        </div>
      )}
    </div>
  );
});
