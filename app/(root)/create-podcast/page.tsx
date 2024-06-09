"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { VoiceType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {useRouter} from "next/navigation";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const voiceCategory = ["Nova", "Alloy", "Shimmer", "Echo", "Fable", "Onyx"];

const CreatePodcast = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageStorageId, setimageStorageId] = useState<Id<"_storage"> | null>(
    null,
  );

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null,
  );
  const [audioURL, setAudioURL] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { toast } = useToast();

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const useRoute = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioURL || !imageURL || !voiceType) {
        toast({
          title: "Please generate audio, image and select voice type",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return Error("Please generate audio, image and select voice type");
      }
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioURL,
        imageURL,
        voicePrompt,
        imagePrompt,
        voiceType,
        views: 0,
        audioDuration,
        imageStorageId: imageStorageId!,
        audioStorageId: audioStorageId!,
      });
      toast({
        title: "Podcast created successfully",
      });
      setIsSubmitting(false);
      useRoute.push("/");
    } catch (error) {
      toast({
        title: "Error submitting form",
        variant: "destructive",
      });
      console.log(error);
    }
    console.log(data);
  }


  return (
    <section className={"mt-10 flex flex-col"}>
      <h1 className={"text-white-1 text-20 text-bold"}>Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-12 flex w-full flex-col"
        >
          <div
            className={"flex flex-col gap-[30px] border-b border-black-5 pb-10"}
          >
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className={"flex flex-col gap-2"}>
                  <FormLabel className={"text-16 font-bold text-white-1"}>
                    Podcast Title
                  </FormLabel>
                  <FormControl
                    className={"input-class focus-visible:ring-offset-orange-1"}
                  >
                    <Input placeholder="Podcast Title" {...field} />
                  </FormControl>
                  <FormMessage className={"text-white-1"} />
                </FormItem>
              )}
            />
            <div>
              <Label className={"text-16 font-bold text-white-1"}>
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "mt-3 text-15 w-full border-none bg-black-1 text-gray-1 rounded-[5px] focus-visible:ring-offset-orange-1",
                  )}
                >
                  <SelectValue
                    placeholder="Select AI voice"
                    className={"placeholder:text-gray-1"}
                  />
                </SelectTrigger>
                <SelectContent
                  className={
                    "text-16 border-none bg-black-1 font-bold text-white-1 rounded-b-2xl"
                  }
                >
                  {voiceCategory.map((voice) => (
                    <SelectItem
                      key={voice}
                      value={voice}
                      className={"capitalize focus:bg-orange-1"}
                    >
                      {voice}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`${voiceType}.mp3`}
                    autoPlay={true}
                    className={"w-full"}
                  />
                )}
              </Select>
              <FormField
                control={form.control}
                name="podcastDescription"
                render={({ field }) => (
                  <FormItem className={"flex flex-col gap-[10px]"}>
                    <FormLabel
                      className={"text-16 font-bold text-white-1 mt-10"}
                    >
                      Podcast Description
                    </FormLabel>
                    <FormControl
                      className={
                        "input-class focus-visible:ring-offset-orange-1"
                      }
                    >
                      <Textarea
                        placeholder="Write a short podcast discription"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={"text-white-1"} />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <GeneratePodcast
              voiceType={voiceType as VoiceType}
              setAudio={setAudioURL}
              audio={audioURL}
              setAudioStorageId={setAudioStorageId}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail
              setImage={setImageURL}
              setImageStorageId={setimageStorageId}
              image={imageURL}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            <Button
              type={"submit"}
              className={
                "mt-9 text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 rounded-[5px]"
              }
            >
              {isSubmitting ? (
                <>
                  Submitting
                  <Loader size={24} className={"animate-spin ml-2"} />
                </>
              ) : (
                <>Submit and Publish Podcast</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
