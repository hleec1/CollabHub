import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, ButtonGroup, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Divider } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Status, TaskType } from '@/common_mockups/todos';

interface Props {
    open: boolean;
    handleClose: () => void;
    onSave: (data: string) => void;
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

const ProductBacklogAddModal: React.FC<Props> = ({ open, handleClose, onSave }) => {
    const { control, handleSubmit } = useForm<TaskType>(
        {defaultValues: {id: -1, status: Status.UNK, content: ''}
    }
    );

    const onSubmit: SubmitHandler<TaskType> = data => {
        onSave(data.content);
        handleClose();
    };
    
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
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" sx={{ fontSize: '15px', width: '80px' }} onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button type="submit" variant="contained" sx={{ fontSize: '15px', width: '80px' }}>
                        ADD
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ProductBacklogAddModal;
