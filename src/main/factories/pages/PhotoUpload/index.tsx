import React from "react";
import { PhotoUpload } from "../../../../presentation/pages/PhotoUpload";
import { RemoteSendImage } from "../../../../data/usecases/send-image/remote-send-image";
import { AxiosHttpClient } from "../../../../infra/http/axios-http-client";

export const PhotoUploadFactory: React.FC = () => {
  const axiosHttpClient = new AxiosHttpClient();
  const remoteSendImage = new RemoteSendImage(
    process.env.API_URL as string,
    axiosHttpClient
  );
  return <PhotoUpload sendImage={remoteSendImage} />;
};