import { useUser } from "@/context/UserContext";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { photosApi } from "@/services/api";
import { useParams } from "react-router";
import type { Photo } from "@/lib/types";
import { pageMeta } from "@/lib/constants";
import AlbumGrid from "@/components/AlbumGrid/AlbumGrid";
import PhotoCard from "@/components/PhotoCard/PhotoCard";

const Photos = () => {
  const { user } = useUser();
  const { albumId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchAlbums = async (albumId: number) => {
      const response = await photosApi.getAll(`?albumId=${albumId}`);
      setPhotos(response?.data || []);
    };
    if (albumId) {
      fetchAlbums(Number(albumId));
    }
  }, [user, albumId]);
  // console.log(albumId);
  // console.log(photos);
  return (
    <div>
      <PageHeader {...pageMeta.albumPhotos} />
      <AlbumGrid album={null}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} {...photo} />
        ))}
      </AlbumGrid>
    </div>
  );
};

export default Photos;
