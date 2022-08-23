// import { storage } from "../config/firebase.config";

// export const upldoadImage = async (
//   pathUrl: string,
//   dataFile: any
// ): Promise<any> => {
//   const file = JSON.parse(JSON.stringify(dataFile.undefined));
//   let result: string = "";

//   if (!file) {
//     return { url: "", message: "File was not found" };
//   }

//   async function uploadFile() {
//     await storage
//       .file(`${pathUrl}/${file.name}`)
//       .save(Buffer.from(file.data.data));
//     return (result = `Picture ${file.name} in firebase Storage.`);
//   }

//   await uploadFile().catch(console.error);
// };
