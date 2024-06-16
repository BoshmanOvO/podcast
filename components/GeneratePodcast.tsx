import React, { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const useGeneratePodcast = ({
  setAudio,
  setAudioStorageId,
  voiceType,
  voicePrompt,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getAudioUrl = useMutation(api.podcasts.getAudioUrl);

  const { toast } = useToast();

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    if (!voicePrompt) {
      console.log("Please Provide Voice Prompt to Generate Audio");
      toast({
        title: "Please Provide Voice Prompt to Generate Audio",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              setIsGenerating(false);
            }}
          >
            Try again
          </ToastAction>
        ),
      });
      return setIsGenerating(false);
    }
    try {
      // we need to access podcasts audio generation API
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      // file handling
      const blob = new Blob([response], { type: "audio/mpeg" });
      const filename = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], filename, { type: "audio/mpeg" });

      // uploading
      const upload = await startUpload([file]);
      const storageId = (upload[0].response as any).storageId;
      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error generating podcasts",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsGenerating(false);
    }
  };
  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className={"flex flex-col gap-2.5"}>
        <Label className={"text-16 font-bold text-white-1"}>
          Ai prompt to generate voice
        </Label>
        <Textarea
          placeholder={"Provide text to AI to generate audio"}
          className={"input-class focus-visible:ring-offset-orange-1"}
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className={"mt-5 w-full max-w-[200px]"}>
        <Button
          type={"submit"}
          className={"text-16 bg-orange-1 py-4 font-bold text-1 rounded-[5px]"}
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className={"animate-spin ml-2"} />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay={true}
          className={"mt-5"}
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
