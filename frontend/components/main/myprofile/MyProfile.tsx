import { Avatar, Button, Card } from "@mui/material";

import { positions } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import ChangeNickName from "./ChangeNickName";
import MyProfileRoute from "@/components/MyProfileRoute/MyProfileRoute";
import { useRouter } from "next/navigation";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Myprofile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [nicknameModal, setNicknameModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const OpenFileInput = () => {
    document.getElementById("file_input")?.click();
  };

  const HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = event.target.files;
    console.log(filelist);
  };

  const OpenChangeNN = () => {
    <ChangeNickName />;
  };

  const router = useRouter();

  const RedirMyprofile = () => {
    router.push("./mypage");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
          style={{ width: "70%", height: "22vh", border: "4px solid #8CCAE5" }}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Card
          style={{
            height: "4vh",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "0 auto",
            backgroundColor: "#67dbfb",
            border: "1px solid black",
          }}
        >
          NickName
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          // onClick={handleOpenModal}
          onClick={RedirMyprofile}
          style={{
            backgroundColor: "WHITE",
            height: "4vh",
            width: "25%",
            border: "1px solid black",
          }}
        >
          더보기
        </Button>
      </div>
    </div>
  );
};
export default Myprofile;
