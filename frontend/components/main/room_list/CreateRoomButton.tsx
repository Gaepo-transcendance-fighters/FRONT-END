import Modal from "@mui/material/Modal";
import { forwardRef, useState } from "react";
import CreateRoomModal from "./CreateRoomModal";

const HoldRef = forwardRef((props: any, ref: any) => (
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
  const handleClose = () => setOpen(false);

  return (
    <>
      {channelType ? (
        <>
          <button className="add" onClick={handleOpen}>
            +
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-room-modal"
            aria-describedby="create-non-dm-room-modal"
          >
            <HoldRef>
              <CreateRoomModal prop={handleClose} />
            </HoldRef>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}
