"use client"

import { Box, Button, ListItem, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import { TaskType } from "@/common_mockups/todos";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from "react";
import ProductBacklogEditModal from "./ProductBacklogEditModal";

interface Props {
    children?: ReactNode;
    task: TaskType;
    onTaskChange: (updatedTask: TaskType) => void;
}

export default function ProductBacklogItem({children, task, onTaskChange}: Props) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (updatedTask: TaskType) => {
        onTaskChange(updatedTask);
    };

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
                />
                <AddCircleIcon onClick={handleEditButtonClick} sx={{width: '20px', height: '20px', color: theme.palette.secondary.main, paddingRight: '4px'}}/>
            </ListItem>
        </div>
        <ProductBacklogEditModal key={task.id} open={open} handleClose={handleClose} task={task} onSave={handleSave}/>
        </>
    )
}