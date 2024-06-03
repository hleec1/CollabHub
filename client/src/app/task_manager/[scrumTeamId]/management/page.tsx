import StyledContainer from "@/components/StyledContainer";
import ScrumTeamForm from "../../create/components/ScrumTeamForm";

export default function ScrumTeamManagementPage() {
    return (
    <StyledContainer>
        <ScrumTeamForm isEdit={true}/>    
    </StyledContainer>)
}