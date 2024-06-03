import StyledContainer from "@/components/StyledContainer";
import { Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import StartSprintButton from "./components/StartSprintButton";
import BordredContainer from "./components/BorderedContainer";
import AddFromProductBacklog from "./components/AddFromProduct/AddFromProductBacklog";
import TaskListsContainer from "./components/TaskListsContainer";

interface Props {
    params: { scrumTeamId: number};
}

export default function ScrumMainPage({params: { scrumTeamId }}: Props) {
    return (
        <StyledContainer>
            <Typography variant="h6" sx={{paddingBottom: '20px', paddingTop: '20px', color: '#092412', width: '100%'}}>
                Sprint Planning
            </Typography>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'left',
            }}>
                <CheckIcon sx={{color: '#092412', width: '25px', height: '25px', margin: '10px'}}/>
                <Typography sx={{color: '#999999', fontSize: '15px', lineHeight: '25px'}}>
                    Move things to do in the product backlog, or add new things to do.
                </Typography>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'left',
                paddingTop: '20px'
            }}>
                <CheckIcon sx={{color: '#092412', width: '25px', height: '25px', margin: '10px'}}/>
                <Typography sx={{color: '#999999', fontSize: '15px', lineHeight: '25px'}}>
                After the Sprint cycle, incomplete tasks are moved back to the product backlog.
                </Typography>
            </div>
            <TaskListsContainer/>
            <StartSprintButton scrumTeamId={scrumTeamId}/>
        </StyledContainer>    
    )
}