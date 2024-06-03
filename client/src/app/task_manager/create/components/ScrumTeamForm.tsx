"use client"

import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, InputLabel, Menu, MenuItem, Modal, Select, SelectChangeEvent, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import { team_members } from "@/common_mockups/team_members";
import { sprint_cycles, scrum_cycles, scrum_places, selected_scrum_options } from "../mockups/scrum_options";
import { useRouter } from "next/navigation";

interface Props {
    isEdit?: boolean,
    children?: ReactNode
}

export default function ScrumTeamForm({isEdit = false, children}: Props) {
    const [scrumMasterId, setScrumMasterId] = React.useState('');
    const [sprintCycle, setSprintCycle] = React.useState('');
    const [scrumCycle, setScrumCycle] = React.useState('');
    const [scrumPlace, setScrumPlace] = React.useState('');
    const [automaticAddition, setAutomaticAddition] = React.useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const router = useRouter();

    const handleScrumMasterIdChange = (event: SelectChangeEvent) => {
        setScrumMasterId(event.target.value as string);
    };
    
    const handleSprintCycleChange = (event: SelectChangeEvent) => {
        setSprintCycle(event.target.value as string);
    };

    const handleScrumCycleChange = (event: SelectChangeEvent) => {
        setScrumCycle(event.target.value as string);
    };

    const handleScrumPlaceChange = (event: SelectChangeEvent) => {
        setScrumPlace(event.target.value as string);
    };

    const handleAutomaticAdditionChange = (event: SelectChangeEvent) => {
        setAutomaticAddition(automaticAddition => !automaticAddition);
    };

    const handleSubmit = () => {
        // TODO: form validation
        // TODO: Scrum 팀 생성 API 호출 -> 생성된 scrumTeamId 받아오기
        const scrumTeamId = 1;  // 임시 데이터
        if (!isEdit)    router.push(`/task_manager/${scrumTeamId}`)
        else {
            // TODO: 저장완료 모달 띄우기
            handleOpen();
        }
    }

    useEffect(() => {
        if (isEdit) fetchData();
    }, [isEdit]);
      
    const fetchData = () => {
        // TODO: Edit 모드에서 해당 스크럼 팀의 설정 가져오기
        setScrumMasterId(String(selected_scrum_options.scrum_master));
        setSprintCycle(String(selected_scrum_options.sprint_cycle));
        setScrumCycle(String(selected_scrum_options.scrum_cycle));
        setScrumPlace(String(selected_scrum_options.scrum_place));
        setAutomaticAddition(Boolean(selected_scrum_options.automatic_addition));
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent:'center',
        alignItems: 'center'
      };

    return (
        <>
        <FormGroup sx={{width: '100%'}}>
            <Typography variant="h6" sx={{paddingBottom: '20px', paddingTop: '20px', color: '#333333'}}>Scrum Options</Typography>
            <FormControl fullWidth sx={{paddingBottom: '20px'}} required>
                <InputLabel id="select-scrum_master">Scrum Master</InputLabel>
                <Select
                    labelId="select-scrum_master"
                    id="scrum_master"
                    value={scrumMasterId}
                    label="Scrum Master"
                    onChange={handleScrumMasterIdChange}
                >
                    {team_members.map((member, index) => (
                        <MenuItem key={index} value={member.id}>{member.name} <span className="text-gray">({member.studentId})</span></MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{paddingBottom: '40px'}} required>
                <InputLabel id="select-sprint_cycle">Sprint Cycle</InputLabel>
                <Select
                    labelId="select-sprint_cycle"
                    id="sprint_cycle"
                    value={sprintCycle}
                    label="Sprint Cycle"
                    onChange={handleSprintCycleChange}
                >
                    {sprint_cycles.map((cycle, index) => (
                        <MenuItem key={index} value={String(cycle.value)}>{cycle.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h6" sx={{paddingBottom: '20px', paddingTop: '20px', color: '#333333'}}>Daily Scrum Options</Typography>
            <FormControl fullWidth sx={{paddingBottom: '20px'}} required>
                <InputLabel id="select-scrum_cycle">Scrum Cycle</InputLabel>
                <Select
                    labelId="select-scrum_cycle"
                    id="scrum_cycle"
                    value={scrumCycle}
                    label="Scrum Cycle"
                    onChange={handleScrumCycleChange}
                >
                    {scrum_cycles.map((cycle, index) => (
                        <MenuItem key={index} value={cycle.value}>{cycle.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{paddingBottom: '20px'}} required>
                <InputLabel id="select-scrum_place">Offline vs. Online</InputLabel>
                <Select
                    labelId="select-scrum_place"
                    id="scrum_place"
                    value={scrumPlace}
                    label="Scrum Place"
                    onChange={handleScrumPlaceChange}
                >
                    {scrum_places.map((place, index) => (
                        <MenuItem key={index} value={place.value}>{place.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Container sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: 0, gap: '20px'}}>
                <p className="text-gray" style={{textAlign: 'left', fontSize: '14px', }}>Automatically add meeting schedule to the calendar</p>
                <FormControlLabel control={<Switch defaultChecked value={automaticAddition} 
                onChange={handleAutomaticAdditionChange} />} 
                label={automaticAddition ? "Active" : "Deactive"}
                sx={{marginRight: 0}}
            />
            </Container>
            {!isEdit ? <Button type="submit" onClick={handleSubmit} variant="contained" sx={{
                    width: '100%',
                    marginTop: '40px',
                    }}>START SCRUM TEAM</Button> : 
                    <Button type="submit" onClick={handleSubmit} variant="contained" sx={{
                        marginTop: '40px',
                        width: "auto"
                    }}>SAVE</Button>
            }
        </FormGroup>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" fontSize={'18px'}>
                    Changes have been saved.
                </Typography>
                <Button variant="outlined" sx={{fontSize: "15px"}} onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
        </>
    )
}