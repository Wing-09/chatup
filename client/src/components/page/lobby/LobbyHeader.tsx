import { GETRequest } from "@/lib/server/requests";
import { Lobby } from "@/lib/types/server";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function LobbyHeader() {
  const params = useParams<{ id: string }>();
  const { data: lobby } = useQuery({
    queryKey: ["lobby", params.id],
    queryFn: async () => {
      const { data, message, status } = await GETRequest<Lobby>(
        "/v1/lobby/" + params.id
      );

      if (status !== "OK") {
        toast(message);
        throw new Error(message);
      }

      return data;
    },
  });

  return (
    <header className="absolute inset-x-0 top-0 bg-transparent py-4 px-5">
      <h1 className="tex-2xl font-semibold">{lobby?.name}</h1>
    </header>
  );
}
