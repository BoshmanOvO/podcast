import React, { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";


const GeneratePodcast = ({
  voiceType,
  setAudio,
  audio,
  setAudioStorageId,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  return (
    <div>
      <div className={"flex flex-col gap-2.5"}>
        <Label className={"text-16 font-bold text-white-1"}>Voice Prompt</Label>
        <Textarea
          placeholder={"Provide text to AI to generate audio"}
          className={"input-class focus-visible:ring-offset-orange-1"}
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        ></Textarea>
      </div>
      <div className={"mt-5 w-full max-w-[200px]"}>
        <Button
          type={"submit"}
          className={"text-16 bg-orange-1 py-4 font-bold text-1 rounded-[5px]"}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={24} className={"animate-spin ml-2"} />
            </>
          ) : (
            <>Generate</>
          )}
        </Button>
      </div>
      {audio && (
        <audio
          controls
          src={audio}
          autoPlay={true}
          className={"mt-5"}
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
