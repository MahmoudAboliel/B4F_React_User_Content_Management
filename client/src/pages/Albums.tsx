import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { Album } from "@/lib/types";
import { albumsApi } from "@/services/api";
import { useState, useEffect } from "react";

const MyAlbums = () => {
  const { user } = useUser();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (user) {
        const response = await albumsApi.getAll(`?userId=${user.id}`);
        setAlbums(response?.data || []);
      }
    };

    fetchAlbums();
  }, [user]);
  console.log(albums);
  return (
    <div>
      <PageHeader {...pageMeta.albums} />
    </div>
  );
};

export default MyAlbums;
