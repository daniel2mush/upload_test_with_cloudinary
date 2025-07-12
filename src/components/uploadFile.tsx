"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FILE } from "dns";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import axios from "axios";
import { UploadToDatabaseAction } from "@/app/actions/databaseAction";
import { toast } from "sonner";

interface uploadProps {
  signature: string;
  timestamp: number;
  apiKey: string;
}

interface uploadFileProps {
  uploadProps: uploadProps;
}

export default function UploadFile({ uploadProps }: uploadFileProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const fileSchema = z
    .instanceof(File)
    .refine((f) => f.size > 0, "Image is required")
    .refine((f) => f.size < 10 * 1024 * 1024, "Image must be less than 10 mb")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Invalid image type"
    );

  const formSchema = z.object({
    name: z.string(),
    file: fileSchema,
  });

  type uploadFormTypes = z.infer<typeof formSchema>;

  const form = useForm<uploadFormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function UploadHandler(params: uploadFormTypes) {
    setIsUploading(true);
    const folder = "upload-test";
    const formData = new FormData();
    formData.append("file", params.file);
    formData.append("folder", folder);
    formData.append("api_key", uploadProps.apiKey);
    formData.append("signature", uploadProps.signature);
    formData.append("timestamp", uploadProps.timestamp.toString());

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multiparts/form-data",
          },
          onUploadProgress: (e) => {
            const progress = Math.round((e.loaded * 100) / (e.total || 1));
            setUploadProgress(progress);
          },
        }
      );

      const res = await cloudinaryRes.data;
      const DataBaseFormData = new FormData();
      DataBaseFormData.append("name", params.name);
      DataBaseFormData.append("fileId", res.asset_id);
      DataBaseFormData.append("fileUrl", res.secure_url);
      DataBaseFormData.append("thumbnailUrl", res.secure_url);

      console.log(DataBaseFormData.get("thumbnailUrl"), "Thumbnail");

      const { success, error, message, data } = await UploadToDatabaseAction(
        DataBaseFormData
      );
      if (error) {
        toast.error(error as string);
        return;
      }
      toast.success(message);
      console.log(data, "Upload data");
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      form.reset();
      if (ref.current) {
        ref.current.value = "";
      }
    }
  }
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <Card className=" max-w-lg w-full ">
        <CardHeader>
          <CardTitle>Upload your file </CardTitle>
          <CardDescription>
            This allows you to upload your files to cloudinary
          </CardDescription>
          <CardAction>x</CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className=" space-y-5"
              onSubmit={form.handleSubmit(UploadHandler)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label>Name</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your image name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Image upload field */}
              <FormField
                name="file"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label>Image</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={ref}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target?.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {isUploading && (
                  <div>
                    <div className=" w-full rounded bg-gray-100 h-2 overflow-hidden">
                      <div
                        className=" bg-green-500 h-full  "
                        style={{
                          width: `${uploadProgress}%`,
                        }}
                      />
                    </div>
                    <div className=" text-sm text-right">
                      <p>upload :{uploadProgress}%</p>
                    </div>
                  </div>
                )}
                <Button
                  disabled={isUploading}
                  type="submit"
                  className=" w-full mt-4 cursor-pointer">
                  {uploadProgress > 0 ? (
                    <div className=" border-2 border-white  rounded-full h-6 w-6 border-t-transparent animate-spin" />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
