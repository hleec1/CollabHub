"use client"

import { Box, Button, ListItem, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import { Status, TaskType } from "@/common_mockups/todos";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import ProductBacklogAddModal from "./ProductBacklogAddModal";

interface Props {
    onTaskAdd: (newTask: TaskType) => void;
}

export default function ProductBacklogAddItem({onTaskAdd}: Props) {
    const [tempId, setTempId] = useState(100);
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditButtonClick = () => {
        handleOpen();
    }

    const handleAdd = (newTaskContent: string) => {
        const newTask: TaskType = {id: tempId, content: newTaskContent, status: Status.UNK};
        setTempId(tempId => tempId + 1);
        onTaskAdd(newTask);
    }

    return (
        <>
        <div style={{marginTop: '10px'}}>
            <ListItem sx={{width: '100%', boxShadow: 1, borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AddIcon onClick={handleEditButtonClick} sx={{width: '25px', height: '25px', color: theme.palette.secondary.dark, paddingRight: '4px'}}/>
            </ListItem>
        </div>
        <ProductBacklogAddModal open={open} handleClose={handleClose} onSave={handleAdd}/>
        </>
    )
}