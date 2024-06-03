"use client"

import StyledFullContainer from "./components/StyledFullContainer";
import SearchBar from "./components/SearchBar";
import MessagesView from "./components/MessagesView";
import MessageSender from "./components/MessageSender";
import MembersStatusView from "./components/MembersStatusView";
import { useState } from "react";
import { MessageType, message_list } from "./mockups/messages";

export default function ChatMainPage() {
    const [messages, setMessages] = useState<MessageType[]>(message_list);
    const [searchResults, setSearchResults] = useState<MessageType[]>([]);

    const handleMessageSend = (newMessage: MessageType) => {
        setMessages(list => list.concat([newMessage]));
    }

    const handleSearchResults = (searchResults: MessageType[], searchValue:string) => {
        setSearchResults(searchResults);
        // TODO: searchValue에 해당하는 부분에 하이라이트
    }

    return (
        <StyledFullContainer>
            <SearchBar messages={messages} onSearchResults={handleSearchResults}/>
            <MembersStatusView />
            <MessagesView messages={searchResults.length > 0 ? searchResults : messages}/>
            <MessageSender onMessageSend={handleMessageSend}/>
        </StyledFullContainer>
    )
}