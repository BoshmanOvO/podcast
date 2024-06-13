import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GenerateThumbnailProps } from "@/types";
import { isGeneratorFunction } from "node:util/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { v4 as uuidv4 } from "uuid";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getImageUrl = useMutation(api.podcasts.getAudioUrl);
  const { toast } = useToast();

  const handleImage = async (blob: Blob, filename: string) => {
    setIsImageLoading(true);
    setImage("");
    try {
      const file = new File([blob], filename, { type: "image/png" });
      // uploading
      const upload = await startUpload([file]);
      const storageId = (upload[0].response as any).storageId;
      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error uploading image",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const handleGenerateThumbnail = useAction(api.openai.generateImageAction);
  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({
        prompt: imagePrompt,
      });
      const blob = new Blob([response], { type: "image/png" });
      const filename = handleImage(blob, `thumbnail-${uuidv4()}.png`);
    } catch (error) {
      toast({
        title: "Error generating thumbnail",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file
        .arrayBuffer()
        .then((buffer) => new Blob([buffer]));
      await handleImage(blob, file.name);
    } catch (error) {
      toast({
        title: "Error uploading image",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className={"generate_thumbnail"}>
        <Button
          type={"button"}
          variant={"plain"}
          className={cn("", { "bg-black-6": isAiThumbnail })}
          onClick={() => setIsAiThumbnail(true)}
        >
          Use Ai to generate Thumbnail
        </Button>
        <Button
          type={"button"}
          variant={"plain"}
          className={cn("", { "bg-black-6": !isAiThumbnail })}
          onClick={() => setIsAiThumbnail(false)}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className={"mt-5 flex flex-col"}>
          <div className={"flex flex-col gap-2.5"}>
            <Label className={"text-16 font-bold text-white-1"}>
              Ai prompt to generate thumbnail
            </Label>
            <Textarea
              placeholder={"Provide text to AI to generate thumbnail"}
              className={"input-class focus-visible:ring-offset-orange-1"}
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            ></Textarea>
          </div>
          <div className={"mt-5 xw-full max-w-[200px]"}>
            <Button
              type={"submit"}
              className={
                "text-16 bg-orange-1 py-4 font-bold text-1 rounded-[5px]"
              }
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={24} className={"animate-spin ml-2"} />
                </>
              ) : (
                <>Generate</>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={"image_div"}
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type={"file"}
            className={"hidden"}
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image
              src={"icons/upload-image.svg"}
              alt={"upload"}
              height={40}
              width={40}
            />
          ) : (
            <div className={"text-16 flex-center font-medium text-white-1"}>
              Uploading
              <Loader size={24} className={"animate-spin ml-2"} />
            </div>
          )}
          <div className={"flex flex-col items-center gap-1"}>
            <h2 className={"text-12 font-bold text-orange-1"}>
              Click to upload
            </h2>
            <p className={"text-12 font-normal text-gray-1"}>
              SVG, PNG, JPG or GIF (max. 1080 x 1080 px)
            </p>
          </div>
        </div>
      )}
      {image && (
          <div className={"flex-center w-full"}>
              <Image
                  src={image}
                  alt={"thumbnail"}
                  width={250}
                  height={250}
                  className={"mt-5 img-fluid rounded"}
              />
          </div>
        )}
    </>
  );
};

export default GenerateThumbnail;
