import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table/Table";
import TableBody from "@/components/Table/TableBody/TableBody";
import TableCell from "@/components/Table/TableCell/TableCell";
import TableHead from "@/components/Table/TableHead/TableHead";
import TableRow from "@/components/Table/TableRow/TableRow";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { Album, ColumnConfig } from "@/lib/types";
import { albumsApi } from "@/services/api";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { extractHeaders } from "@/lib/utils";

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
  // console.log(albums);

  const albumColumns: ColumnConfig<Album>[] = [
    { header: "No.#", key: "id" },
    { header: "Title", key: "title" },
  ];

  const headers = [...extractHeaders(albumColumns), "Actions"];
  return (
    <div>
      <PageHeader {...pageMeta.albums} />
      <Table id="table">
        <TableHead cols={headers} />
        <TableBody id="table-body">
          {albums.map((album) => (
            <TableRow key={album.id}>
              {albumColumns.map((col) => (
                <TableCell key={col.key} id={String(col.key)}>
                  {String(album[col.key])}
                </TableCell>
              ))}
              <TableCell id="actions" className="flex items-center gap-2">
                <Button size="xs" variant="outline">
                  <Link to={`/albums/${album.id}/photos`}>View</Link>
                </Button>
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => handleUpdate(album.id)}
                >
                  Update
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  onClick={() => handleDelete(album.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyAlbums;
