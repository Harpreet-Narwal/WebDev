import { Video } from "@/components/ui/Video";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const videos = [
    {id: 1, url:"https://cdn.higgsfield.ai/user_3EXRcSJxBjgx9yQfkND9r8Dt0Td/hf_20260622_171723_df1f8cd3-d42a-4916-b333-9949de661877_min.mp4", title: "flying Video" },
    {id: 2, url:"https://cdn.higgsfield.ai/user_3EXRcSJxBjgx9yQfkND9r8Dt0Td/hf_20260622_171723_df1f8cd3-d42a-4916-b333-9949de661877_min.mp4", title: "Running Video" },
    {id: 3, url:"https://cdn.higgsfield.ai/user_3EXRcSJxBjgx9yQfkND9r8Dt0Td/hf_20260622_171723_df1f8cd3-d42a-4916-b333-9949de661877_min.mp4", title: "Swimming Video" }
]


export  function Landing(){
    return <div>
        <div className="bg-gray-100 flex flex-col justify-start items-center w-full min-h-screen pt-24 px-16 gap-12">
            <h1 className="w-full text-center text-xs sm:text-sm md:text-lg lg:text-2xl font-medium whitespace-nowrap">
                The only platform you need to create high definition video. Welcome to Higgs Field
            </h1>
            
            <Carousel className="w-full sm:max-w-xs md:max-w-md lg:max-w-3xl">
                <CarouselContent className="-ml-2">
                    {videos.map((video =>(
                    <CarouselItem key={video.id} className="basis-1/3 lg:basis-1/3">
                    <div className="pl-1">
                        <Card className="overflow-hidden border-0 shadow-md rounded-xl bg-transparent">
                            <CardContent className="flex aspect-square items-center justify-center p-0">
                                <Video url={video.url} title={video.title}></Video>
                            </CardContent>
                        </Card>
                    </div>
                    </CarouselItem>)))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>  
    </div>
}