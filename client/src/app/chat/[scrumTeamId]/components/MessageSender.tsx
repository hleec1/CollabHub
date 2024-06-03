"use client"

import { Box, Button, Container, FormControl, IconButton, Input, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from "react";
import { MessageType } from "../mockups/messages";
import { team_members } from "@/common_mockups/team_members";
import ColoredTagDeletable from "@/components/ColoredTagDeletable";

interface Props {
    onMessageSend: (newMessage: MessageType) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const MessageSenderContainer = styled(Container)({
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'centert',
    alignItems: 'center',
    gap: '5px',
})

const TextFieldContainer = styled(Container)({
    display: 'flex',
    margin: 0,
    padding: 0,
    width: '100%',
    justifyContent: 'center',
    gap: 0
})

export default function MessageSender({onMessageSend}: Props) {
    const [message, setMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    
    const handleSendButtonClick = () => {
        if (message.length > 0 || file) {
            const members_except_me = team_members.map((member) => Number(member.id)).filter((id) => id !== 1);
            const newMessage: MessageType = {
                content: message,
                senderId: 1,    // temp
                unreadMembersId: members_except_me,
                sendTime: new Date(),
                attachedFile: file,
            }
            onMessageSend(newMessage);
            setMessage("");
            setFile(null);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleDeleteFile = () => {
        setFile(null);
    };

    return (
        <MessageSenderContainer>
            <TextFieldContainer>
                <Button
                    component="label"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        paddingRight: '5px',
                        color: '#757575',
                        margin: 0,
                        minWidth: 0,
                    }}
                >
                    <AttachFileIcon />
                    <input type="file" hidden onChange={handleFileChange}/>
                </Button>
                <TextField
                    placeholder="Sending Messages"
                    variant="outlined"
                    color="primary"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        flexGrow: 1
                    }}
                />
                <IconButton aria-label="send" size="large" sx={{
                      margin: 0
                    }}>
                    <SendIcon onClick={handleSendButtonClick} />
                </IconButton>
            </TextFieldContainer>
            {file && (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex'

                    }}
                >
                    <ColoredTagDeletable text={file.name} color="#FDA655" onDelete={handleDeleteFile} />
                </Box>
            )}
        </MessageSenderContainer>
    )
}