import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, ButtonGroup, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Divider } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TaskType, Status } from '@/common_mockups/todos';
import { team_members } from '@/common_mockups/team_members';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface Props {
    open: boolean;
    handleClose: () => void;
    task: TaskType;
    onSave: (data: TaskType) => void;
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

const ProductBacklogEditModal: React.FC<Props> = ({ open, handleClose, task, onSave }) => {
    const { control, handleSubmit } = useForm<TaskType>({
        defaultValues: {...task, responsibleParties: []},
    });

    const onSubmit: SubmitHandler<TaskType> = data => {
        onSave(data);
        handleClose();
    };
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-task-modal-title"
            aria-describedby="edit-task-modal-description"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" sx={{ fontSize: '15px' }} onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button type="submit" variant="contained" sx={{ fontSize: '15px' }}>
                        move to todo
                    </Button>
                </div>
            </Box>
            </LocalizationProvider>
            
            
        </Modal>
    );
};

export default ProductBacklogEditModal;
