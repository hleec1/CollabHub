"use client"

import { Box, Container, Divider } from "@mui/material";
import { styled } from '@mui/material/styles';
import { MessageType } from "../mockups/messages";
import { useEffect, useRef } from "react";
import MyMessageBox from "./MessageBoxes/MyMessageBox";
import OthersMessageBox from "./MessageBoxes/OthersMessageBox";

interface Props {
    messages: MessageType[];
}

const BorderedContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    border: '0.5px solid #EDEDED',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    height: '60vh',
    overflow: 'scroll',
    gap: '20px',

    paddingTop: '20px',
    paddingLeft: 0,
    paddingRight: 0,

    // 스크롤 바 숨기기
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none',  // IE 10+
    '&::-webkit-scrollbar': {
        display: 'none' // Safari and Chrome
    }
}));

const MyMessageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
}));

const MembersMessageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}));


export default function MessagesView({messages}: Props) {
    const borderedContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = borderedContainerRef.current;
    
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);
    
    
    return (
        <BorderedContainer ref={borderedContainerRef}>
            {messages.map((message, index) => {
                if (message.senderId === 1) {   // 임시로 1로 설정
                    return <MyMessageContainer key={index}>
                                <MyMessageBox message={message}/>
                            </MyMessageContainer>
                } else {
                    return <MembersMessageContainer key={index}><OthersMessageBox message={message}/></MembersMessageContainer>
                }
            })}
            <Divider sx={{
                width: '100%', 
                marginBottom: '1px', 
                backgroundColor: '#8DC63F',
                boxShadow: '1px 3px 3px #8DC63F, 1px 3px 3px #8DC63F'}} />
        </BorderedContainer>
    )
}