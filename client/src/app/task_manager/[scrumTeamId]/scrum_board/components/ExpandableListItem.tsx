"use client"

import { Box, Button, ListItem, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import { TaskType } from "@/common_mockups/todos";
import { team_members } from "@/common_mockups/team_members";
import ColoredTag from "@/components/ColoredTag";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import TaskEditModal from "./TaskEditModal";

interface Props {
    children?: ReactNode;
    task: TaskType;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onTaskChange: (updatedTask: TaskType) => void;
}

const DescriptionBox = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    maxHeight: 0,
}));

export default function ExpandableListItem({children, task, isExpanded, onToggleExpand, onTaskChange}: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (updatedTask: TaskType) => {
        onTaskChange(updatedTask);
    };

    function formatTaskDuration(dates: Date[]) {
        if (dates.length < 2) return '';
    
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[1]);
    
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
    
        if (startDate.getTime() === endDate.getTime()) {
            return formattedStartDate;
        } else {
            return `${formattedStartDate}~${formattedEndDate}`;
        }
    }

    function formatDate(date: Date) {
        const year = String(date.getFullYear()).slice(-2);  // Get last two digits of the year
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    const handleEditButtonClick = () => {
        handleOpen();
    }

    return (
        <>
        <div style={{marginTop: '5px'}}>
            <ListItem alignItems="flex-start" sx={{width: '100%', boxShadow: 1, borderRadius: '5px'}} onClick={onToggleExpand}>
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
            </ListItem>
            <DescriptionBox
                sx={{
                    maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
                    marginTop: '10px',
                    borderRadius: '5px',
                    padding: '0 10px'
                }}
                ref={contentRef}
            >
                <div style={{width: '100%', textAlign: 'right'}}>
                    <Button onClick={handleEditButtonClick} sx={{color: theme.palette.primary.light, fontSize: '12px', textDecoration: 'underline'}} variant="text">
                        <EditIcon sx={{width: '18px', height: '18px', color: theme.palette.primary.light, paddingRight: '4px'}}/>
                        Edit
                    </Button>
                </div>
                {/* Show relatedSchedule */}
                {/* Show taskDuration */}
                {task?.taskDuration && <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'left'}}>
                    <ColoredTag text="task duration" color="#FDA655"/>
                    <Typography variant="body2">
                        {formatTaskDuration(task.taskDuration)}
                    </Typography>
                </div>}
                {/* Show reviewers */}
                {task?.reviewers && <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'left', marginTop: '10px'}}>
                    <ColoredTag text="reviewer" color="#8DC63F"/>
                    <Typography variant="body2">
                        {task.reviewers?.map((memberId, index) => {
                            const member = team_members.find(m => m.id === memberId.toString());
                            return member ? member.name : `Unknown (ID: ${memberId})`;
                        }).join(', ')}
                    </Typography>
                </div>}
                {/* Show membersWorkOn, endDate */}
                {task?.membersWorkOn && <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'left', marginTop: '10px'}}>
                    <ColoredTag text="members work on" color="#55CAFD"/>
                    <Typography variant="body2">
                        {task.membersWorkOn?.map((memberId, index) => {
                            const member = team_members.find(m => m.id === memberId.toString());
                            return member ? member.name : `Unknown (ID: ${memberId})`;
                        }).join(', ')}
                    </Typography>
                </div>}
                {task?.endDate && <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'left', marginTop: '10px'}}>
                    <ColoredTag text="end date" color="#8DAC97"/>
                    <Typography variant="body2">
                        {formatDate(task.endDate)}
                    </Typography>
                </div>}
            </DescriptionBox>
        </div>
        <TaskEditModal key={task.id} open={open} handleClose={handleClose} task={task} onSave={handleSave}/>
        </>
    )
}