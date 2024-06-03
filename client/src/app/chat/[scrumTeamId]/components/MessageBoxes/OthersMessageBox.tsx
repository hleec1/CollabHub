import { Avatar, Box, Container, Typography } from "@mui/material";
import { MessageType } from "../../mockups/messages";
import { team_members } from "@/common_mockups/team_members";

interface Props {
    message: MessageType;
}

export default function OthersMessageBox({message}: Props) {
    const senderProfileImage = team_members.find(member => member.id === String(message.senderId))?.profileImage;
    const senderName = team_members.find(member => member.id === String(message.senderId))?.name;

    return (
        <Box
            sx={{
                width: '90%',
                display: 'flex',
                gap: '5px'
            }}
        >
            <Avatar alt="Profile" src={`/images/${senderProfileImage}.png`} sx={{ width: 30, height: 30, border: '0.5px solid #A3D165' }} />

            <Container
                sx={{
                    flexGrow: 1,
                    textAlign: 'left',
                    padding: 0
                }}
            >
                <Typography fontSize={12}>{senderName}</Typography>
                <Box
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: '#F0F0F0',
                        color: '#092412',
                        padding: '10px',
                        flexGrow: 1,
                        fontSize: '13px'
                        
                }}
                >
                {message.content}
                 </Box>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 0,
                    margin: 0,
                    color: '#999999',
                    textAlign: 'left'
                }}
            >
                <Typography fontSize={8}>{
                    message.sendTime.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                }</Typography>
                <Typography fontSize={8}>{
                    message.sendTime.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })
                }</Typography>
                {message.unreadMembersId.length > 0 && <Typography fontSize={10}>{message.unreadMembersId.length}</Typography>}
            </Container>
        </Box>
    )
}