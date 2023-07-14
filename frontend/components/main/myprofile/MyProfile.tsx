import { Avatar, Button, Card } from "@mui/material";
import { useState } from "react";
import ModalBasic from "../../main/myprofile/ModalBasic";
const Myprofile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
          sx={{ width: 130, height: 130 }}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Card
          style={{
            height: 60,
            width: 150,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "0 auto",
            backgroundColor: "#67dbfb",
          }}
        >
          NickName
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            height: 40,
            width: 100,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "0 auto",
            backgroundColor: "WHITE",
          }}
          onClick={showModal}
        >
          내 프로필 보기
        </button>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
};

export default Myprofile;
