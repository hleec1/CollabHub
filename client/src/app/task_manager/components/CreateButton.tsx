"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CreateButton() {
    const router = useRouter();

    const handleCreateButtonClick = () => {
        router.push('/task_manager/create');
    };

    return (
        <Button variant="contained" onClick={handleCreateButtonClick} sx={{
            width: '100%',
            marginTop: '10px',
            marginBottom: '20px'
        }}>CREATE SCRUM TEAM</Button>
    )
}