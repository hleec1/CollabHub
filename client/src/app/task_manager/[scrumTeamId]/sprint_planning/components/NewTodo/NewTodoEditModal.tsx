import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, ButtonGroup, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Divider } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TaskType, Status } from '@/common_mockups/todos';
import { team_members } from '@/common_mockups/team_members';

interface Props {
    open: boolean;
    handleClose: () => void;
    task: TaskType;
    onSave: (data: TaskType) => void;
    onMove2Backlog: (data: TaskType) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent:'center',
    alignItems: 'center'
  };

const NewTodoEditModal: React.FC<Props> = ({ open, handleClose, task, onSave, onMove2Backlog }) => {
    const { control, handleSubmit } = useForm<TaskType>({
        defaultValues: {...task},
    });

    const onSubmit: SubmitHandler<TaskType> = data => {
        onSave(data);
        handleClose();
    };

    const handleTodo2Backlog = (data: TaskType) => {
        onMove2Backlog(data);
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-task-modal-title"
            aria-describedby="edit-task-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Controller for content */}
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Content"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                />
                <Controller
                        name="responsibleParties"
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Responsible Parties</InputLabel>
                                <Select
                                    {...field}
                                    multiple
                                    label="Responsible Parties"
                                >
                                    {team_members.map((member, index) => (
                                        <MenuItem key={index} value={member.id}>
                                            {member.name} <span className="text-gray">({member.studentId})</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '15px' }}>
                    <Button variant="outlined" sx={{ fontSize: '15px', width: '45%' }} onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button type="submit" variant="contained" sx={{ fontSize: '15px', width: '45%' }}>
                        SAVE
                    </Button>
                </div>
                <Button variant="outlined" color='secondary' sx={{width: '100%'}} onClick={() => handleTodo2Backlog(task)}>
                    Move back to backlog
                </Button>
            </Box>
        </Modal>
    );
};

export default NewTodoEditModal;
