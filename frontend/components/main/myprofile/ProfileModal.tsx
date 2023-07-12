import styles from "./ModalBasic.module.css";

import { Card, CardContent, Stack, Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  setModalOpen: (value: boolean) => any;
};

const ProfileModal: React.FC<Props> = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const ChangePhoto = () => {
    console.log("change photo");
  };
  const ChangeID = () => {
    console.log("ChangeID");
  };
  const TwoFactorAuthentication = () => {
    console.log("TwoFactorAuthentication");
  };
  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {/* 모달 안에 들어갈 내용 작성. */}

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          padding: "20px 0px 0px 20px",
          margin: "auto",
        }}
      >
        <div>
          <Avatar
            alt="Remy Sharp"
            src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
            sx={{ width: 130, height: 130 }}
          />
          <div style={{ padding: "20px 0px 0px 20px" }}></div>
          <button onClick={ChangePhoto} style={{ height: 50, width: 130 }}>
            {" "}
            사진바꾸기
          </button>
        </div>
        <div style={{ padding: "10px 0px 0px 20px" }}>
          <Card
            style={{
              height: 110,
              width: 280,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            INTRA ID
          </Card>

          <div style={{ padding: "30px 0px 0px 20px" }}></div>
          <Card
            style={{
              height: 50,
              width: 280,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            2차 인증 여부
          </Card>
        </div>
        <div>
          <div style={{ padding: "87.5px 0px 0px 5px" }}>
            <button onClick={ChangeID}>
              <SettingsIcon></SettingsIcon>
            </button>
          </div>
          <div style={{ padding: "47px 0px 0px 5px" }}>
            <button onClick={TwoFactorAuthentication}>
              <SettingsIcon></SettingsIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
