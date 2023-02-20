import React, { useState, useCallback } from "react";
import { SendImage } from "../../../domain/usecases/send-image";

type Props = {
  sendImage: SendImage;
};

export const PhotoUpload: React.FC<Props> = ({ sendImage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      await sendImage({ file, description });
      setFile(null);
      setFileUrl(null);
      setDescription("");
    }
  }, [file, description]);

  const isSubmitDisabled = !file || !description;

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <input type="text" value={description} onChange={handleDescriptionChange} />
      <button type="submit" disabled={isSubmitDisabled}>Enviar</button>
    </form>
  );
};
