import type { ReactNode } from "react";
import type { Album } from "@/lib/types";
interface AlbumGridProps {
  children: ReactNode;
  className?: string;
  id?: string;
  album: Album | null;
}

const AlbumGrid = ({ children, className = "", id, album }: AlbumGridProps) => {
  return (
    <div>
      <h1 className="text-center p-4">Album Name: {album?.title}</h1>
      <div
        id={id}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AlbumGrid;
