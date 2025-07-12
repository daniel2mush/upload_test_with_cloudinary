import UploadFile from "@/components/uploadFile";
import { getSignature } from "./actions/cloudinary";

export default async function Page() {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);

  const { data, status, message } = await getSignature(timestamp);

  return (
    <div>
      <UploadFile uploadProps={data} />
    </div>
  );
}
