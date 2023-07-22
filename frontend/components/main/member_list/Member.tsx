"use client";

import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import "@/components/main/member_list/MemberList.css";
import {
  Modal,
  Box,
  Card,
  Stack,
  Typography,
  Menu,
  CardContent,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { IFriend } from "../friend_list/FriendList";

const loginOn = <Image src="/logon1.png" alt="online" width={10} height={10} />;

const loginOff = (
  <Image src="/logoff.png" alt="offline" width={10} height={10} />
);

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

export default function Member({
  idx,
  person,
}: {
  idx: number;
  person: IFriend;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return (
    <>
      <div key={idx} className="membtn" onClick={handleOpenModal}>
        <div className="img">
          <Image src="/seal.png" alt="profile" width={53} height={53} />
        </div>
        <div className="name">{person.name}</div>
        <div className="icon">
          <StarIcon sx={{ height: "15px", color: "yellow" }} />
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle} borderRadius={"10px"}>
          <Card
            sx={{
              backgroundColor: "#48a0ed",
              width: "100wv",
              display: "flex",
              padding: 2,
            }}
          >
            <Box
              sx={{
                borderRadius: "70%",
                width: "max-content",
                overflow: "hidden",
              }}
              mx={5}
            >
              <Image
                src="https://dummyimage.com/100x100/1f0c1f/edeeff.png&text=user+img"
                alt="user img"
                width={100}
                height={100}
              />
            </Box>
            <Stack
              sx={{
                width: "15vw",
              }}
              spacing={1}
            >
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                닉네임: {person.name}
              </Typography>
              <Typography>
                상태: {person.isOnline ? loginOn : loginOff}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Button
                  type="button"
                  sx={{ minWidth: "max-content" }}
                  variant="contained"
                >
                  친선전
                </Button>
                <Button
                  type="button"
                  sx={{ minWidth: "max-content" }}
                  variant="contained"
                >
                  DM
                </Button>
                <Button
                  type="button"
                  sx={{ minWidth: "max-content" }}
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  더보기
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  MenuListProps={{ sx: { py: 0 } }}
                >
                  <Stack sx={{ backgroundColor: "#48a0ed" }}>
                    <MenuItem>Add</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Block</MenuItem>
                  </Stack>
                </Menu>
              </Stack>
            </Stack>
          </Card>
          <br />
          <Card sx={{ backgroundColor: "#3478c5" }}>
            <CardContent sx={{ paddingBottom: 0 }}>전적</CardContent>
            <Stack direction={"row"}>
              <Card
                sx={{
                  margin: 1,
                  marginRight: 0,
                  width: "30%",
                  height: "max-content",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#48a0ed",
                    height: "100%",
                    "&:last-child": { paddingBottom: "16px" },
                  }}
                >
                  <Typography margin={1}>랭크(포인트)</Typography>
                  <Typography margin={1}>승률</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  margin: 1,
                  width: "70%",
                  height: "max-content",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#48a0ed",
                    height: "100%",
                    "&:last-child": { paddingBottom: "16px" },
                  }}
                >
                  <Typography margin={1}>3000</Typography>
                  <Typography margin={1}>0%</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Card>
          <br />
          <Card
            sx={{
              backgroundColor: "#3478c5",
              height: "170px",
            }}
          >
            <CardContent sx={{ paddingBottom: 0 }}>전적 기록</CardContent>
            <Stack direction={"row"}>
              <Card
                sx={{
                  margin: 1,
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#48a0ed",
                  overflow: "scroll",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "#86d8f7",
                    margin: 1,
                  }}
                >
                  <Stack direction={"row"}>
                    <CardContent
                      sx={{ "&:last-child": { paddingBottom: "16px" } }}
                    >
                      WIN
                    </CardContent>
                    <CardContent
                      sx={{ "&:last-child": { paddingBottom: "16px" } }}
                    >
                      hoslim VS jujeon
                    </CardContent>
                    <CardContent
                      sx={{ "&:last-child": { paddingBottom: "16px" } }}
                    >
                      5 : 3
                    </CardContent>
                  </Stack>
                </Card>
              </Card>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
