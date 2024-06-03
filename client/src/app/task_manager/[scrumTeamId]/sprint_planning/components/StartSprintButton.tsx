"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
    scrumTeamId: number;
}

export default function StartSprintButton({scrumTeamId}: Props) {
    const router = useRouter();

    const handleStartButtonClick = () => {
        router.push(`/task_manager/${scrumTeamId}/scrum_board`);
        // TODO: set isInProgress = true
    };

    return (
        <Button variant="contained" onClick={handleStartButtonClick} sx={{
            width: '100%',
            marginTop: '20px',
            marginBottom: '20px'
        }}>Start Sprint</Button>
    )
}