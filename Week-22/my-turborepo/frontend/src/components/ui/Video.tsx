
export function Video({url, title}: {url: string, title: string}){
    return <div className="group relative h-full w-full overflow-hidden bg-black">
    <video
      src={url}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      autoPlay={true}
      muted
      loop
      playsInline
    />
    {/* Gradient Overlay for the Title */}
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity">
      <div className="truncate text-sm font-medium text-white md:text-base">
        {title}
      </div>
    </div>
  </div>
}
