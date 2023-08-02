import { useState, Dispatch, SetStateAction } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { IChatRoom0 } from "@/components/public/Layout";

export default function CreateRoomButton({
  channelType,
  setNonDmRooms,
}: {
  channelType: boolean;
  setNonDmRooms: Dispatch<SetStateAction<IChatRoom0[]>>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      {channelType ? (
        <>
          <button className="add" onClick={handleOpen}>
            +
          </button>
          <CreateRoomModal
            open={open}
            setOpen={setOpen}
            setNonDmRooms={setNonDmRooms}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
