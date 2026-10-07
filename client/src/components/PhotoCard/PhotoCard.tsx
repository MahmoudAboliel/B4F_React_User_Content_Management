import type { Photo } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PhotoCard = ({ id, albumId, title, url, thumbnailUrl }: Photo) => {
  return (
    <div
      id={`photo-${albumId}-${id}`}
      className="flex flex-col w-full p-3 h-80 border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-full h-48 bg-gray-100 shrink">
        <img
          src={thumbnailUrl ? thumbnailUrl : url}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between gap-2 flex-1 pt-3">
        <p
          className="text-xs font-medium text-gray-800 line-clamp-2"
          title={title}
        >
          {title}
        </p>
        <div className="flex justify-between">
          <Button variant={'outline'}>Update</Button>
          <Button variant={'destructive'}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
