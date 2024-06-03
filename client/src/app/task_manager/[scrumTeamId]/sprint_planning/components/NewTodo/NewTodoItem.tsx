"use client"

import { Box, Button, ListItem, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import { TaskType } from "@/common_mockups/todos";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import NewTodoEditModal from "./NewTodoEditModal";
import { team_members } from "@/common_mockups/team_members";

interface Props {
    children?: ReactNode;
    task: TaskType;
    onTaskChange: (updatedTask: TaskType) => void;
    onMove2Backlog: (data: TaskType) => void
}

export default function NewTodoItem({children, task, onTaskChange, onMove2Backlog}: Props) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (updatedTask: TaskType) => {
        onTaskChange(updatedTask);
    };

    const handleMove2Backlog = (data: TaskType) => {
        onMove2Backlog(data);
    }

    const handleEditButtonClick = () => {
        handleOpen();
    }

    return (
        <>
        <div style={{marginTop: '10px'}}>
            <ListItem sx={{width: '100%', boxShadow: 1, borderRadius: '5px'}}>
                <ListItemText
                    primary={
                        <Typography variant="body2">
                            {task.content}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" sx={{color: '#757575'}}>
                            {task.responsibleParties?.map((memberId, index) => {
                                const member = team_members.find(m => m.id === memberId.toString());
                                return member ? member.name : `Unknown (ID: ${memberId})`;
                            }).join(', ')}
                        </Typography>
                    }
                />
                <EditIcon onClick={handleEditButtonClick} sx={{width: '18px', height: '18px', color: theme.palette.secondary.main, paddingRight: '4px'}}/>
            </ListItem>
        </div>
        <NewTodoEditModal key={task.id} open={open} handleClose={handleClose} task={task} onSave={handleSave} onMove2Backlog={handleMove2Backlog}/>
        </>
    )
}