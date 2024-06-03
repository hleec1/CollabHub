"use client"

import StyledContainer from "@/components/StyledContainer";
import { Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import BordredContainer from "./components/BorderedContainer";
import TaskList from "./components/TaskList";

interface Props {
    params: { scrumTeamId: number};
}

export default function ScrumBoardPage({params: {scrumTeamId}}: Props) {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = React.useState(0);
    
    const auth = 3; // 임시 코드 : Scrum Master authority 확인

    const handleScrumSettingButtonClick = () => {
        router.push(`/task_manager/${scrumTeamId}/management`)
    }

    const handleBacklogButtonClick = () => {
        router.push(`/task_manager/${scrumTeamId}/product_backlog`);
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
      };
    

    return (
        <StyledContainer>
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button onClick={handleScrumSettingButtonClick} sx={{
                    color: "#999999",
                    textDecoration: 'underline',
                    fontSize: '12px'
                }}>Scrum Settings</Button>
            </div>
            <BordredContainer>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="scrum board tabs"
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{width: "120%"}}
                >
                    <Tab label="Todo" />
                    <Tab label="In Progress" />
                    <Tab label="On Review" />
                    <Tab label="Done" />
                </Tabs>
                <TaskList selectedTab={selectedTab}/>
            </BordredContainer>
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button onClick={handleBacklogButtonClick} sx={{
                    color: "#999999",
                    textDecoration: 'underline',
                    fontSize: '12px'
                }}>Go to Product Backlog</Button>
            </div>
        </StyledContainer>
    )
}