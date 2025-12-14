import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps{
    title: string;
    link: string;
    type: "youtube" | "twitter";
}    

export function Card({title, link, type} :  CardProps){

    useEffect(() =>{
        if(type === "twitter" && (window as any).twttr){
            (window as any).twttr.widgets.load();
        }
    },[type, link])


    return <div> 
        <div className="p-4 bg-white rounded-md border-slate-200 max-w-72 min-h-24 border">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        {type==="twitter"  && (<TwitterIcon/>)}
                        {type === "youtube" && (<YoutubeIcon/>)}
                    </div> 
                    {title}
                </div>
                <div className="flex text-gray-500 items-center">
                    <div className="pr-2">
                        <a href={link} target={"_blank"}>
                            <ShareIcon/>
                        </a>
                    </div>
                    <ShareIcon/> 
                    {/* delete icon has to be there...*/}
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" &&  <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            {/*  */}

            {/*  */}
            {type === "twitter" && (
            <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a> 
            </blockquote>
            )}
            </div>
        </div>
    </div>
}