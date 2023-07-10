import {Button} from "@mui/material";


const GameStartButton = () =>{
    const onClick =() =>
    {
        //버튼 클릭 시 여기서 처리하면됨
        console.log("Game Start Clicked")
    }

    return (
     <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
          <Button onClick={onClick} variant="outlined" style={{padding: '40px 60px',
          borderRadius: '5px'}}>Game Start</Button>
        </div>
    )
    
}

export default GameStartButton