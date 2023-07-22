import { forwardRef, useState } from "react";
import CreateRoomModal from "./CreateRoomModal";

export const HoldRef = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default function CreateRoomButton({
  channelType,
}: {
  channelType: boolean;
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
          <CreateRoomModal open={open} setOpen={setOpen} />
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-room-modal"
            aria-describedby="create-non-dm-room-modal"
          >
            <HoldRef>
              <CreateRoomModal prop={handleClose} />
            </HoldRef>
          </Modal> */}
        </>
      ) : (
        ""
      )}
    </>
  );
}
