import { storage } from "../config/firebase.config";

export const upldoadPDF = async (
  pathLocal: string,
  pathUrl: any
): Promise<any> => {
  const pdfFile = "PDF/" + pathUrl;
  await storage.upload(pathLocal, {
    destination: pdfFile,
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
};
