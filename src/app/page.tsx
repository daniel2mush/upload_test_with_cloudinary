import UploadFile from "@/components/uploadFile";
import { getSignature } from "./actions/cloudinary";

export default async function Page() {
  return (
    <div>
      <UploadFile />
    </div>
  );
}
