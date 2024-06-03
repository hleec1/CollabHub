import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, ButtonGroup, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Divider } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TaskType, Status } from '@/common_mockups/todos';
import { team_members } from '@/common_mockups/team_members';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

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

const TaskEditModal: React.FC<Props> = ({ open, handleClose, task, onSave }) => {
    const { control, handleSubmit } = useForm<TaskType>({
        defaultValues: task,
    });

    const onSubmit: SubmitHandler<TaskType> = data => {
        onSave(data);
        handleClose();
    };

    const [status, setStatus] = useState<Status>(task.status);
    
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(Number(event.target.value) as Status);
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-task-modal-title"
            aria-describedby="edit-task-modal-description"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth sx={{paddingBottom: '20px'}} required>
                    <InputLabel id="select-statusr">Status</InputLabel>
                    <Select
                        labelId="select-status"
                        id="status"
                        defaultValue={String(task.status)}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={1}>Todo</MenuItem>
                        <MenuItem value={2}>In Progress</MenuItem>
                        <MenuItem value={3}>On Review</MenuItem>
                        <MenuItem value={4}>Done</MenuItem>
                    </Select>
                </FormControl>
                <Divider sx={{width: '100%'}}/>
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
                {status > 0 && (
                    // Controller for responsibleParties
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
                )}
                {status > 1 && (
                    // Controller for taskDuration
                    <>
                    <Typography variant='subtitle1' sx={{textAlign: 'left', width: '100%', paddingLeft: '5px', color: '#757575'}}>Task Duration</Typography>
                    <Controller
                        name="taskDuration"
                        control={control}
                        defaultValue={task.taskDuration ?? [new Date(), new Date()]}
                        render={({ field }) => (
                            <Box display="flex" gap="16px">
                            {field.value && field.value.map((date, index) => (
                                <DatePicker
                                    key={index}
                                    label={index == 0 ? 'Start' : 'End'}
                                    value={dayjs(date)}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        if (field.value) {
                                            const newDates = [...field.value];
                                            newDates[index] = date?.toDate() ?? new Date();
                                            //newDates[index] = dayjs(date);
                                            field.onChange(newDates);
                                        }
                                        
                                        
                                    }}
                                />
                            ))}
                            </Box>
                        )}
                    />
                    </>
                    
                )}
                {status > 2 && (
                    // Controller for membersWorkOn
                    <Controller
                    name="membersWorkOn"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Members worked on</InputLabel>
                            <Select
                                {...field}
                                multiple
                                label="Members worked on"
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
                )}
                {status > 2 && (
                    // Controller for reviewers
                    <Controller
                    name="reviewers"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Reviewers</InputLabel>
                            <Select
                                {...field}
                                multiple
                                label="Reviewers"
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
                )}
                {status > 3 && (
                    // Controller for endDate
                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue={task.endDate ?? new Date()}
                        render={({ field }) => (
                            (
                                <DatePicker
                                    label='Completed Date'
                                    sx={{width: '100%'}}
                                    value={dayjs(field.value)}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                />
                            ))
                            }
                    />
                )}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" sx={{ fontSize: '15px', width: '80px' }} onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button type="submit" variant="contained" sx={{ fontSize: '15px', width: '80px' }}>
                        SAVE
                    </Button>
                </div>
            </Box>
            </LocalizationProvider>
            
            
        </Modal>
    );
};

export default TaskEditModal;
