import { uuidToUsername } from "@/lib/utils";
import { useEffect, useState } from "react";

function UsernameDisplay({ uuid }: { uuid: string }) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    uuidToUsername(uuid).then(setUsername);
  }, [uuid]);

  return <span>{username}</span>;
}

export default UsernameDisplay;
