import ExpandableText from "./components/ExpandableText";
import { description_list } from "./constants/description_list";
import CreateButton from "./components/CreateButton";
import StyledContainer from "@/components/StyledContainer";

export default function TaskManagerPage() {
    
    // Team 메인에서 진입한 경우
        const is_from_main = true;
        // Scrum Team 생성된 상태 - Scrum board 페이지로 바로 라우팅
    // Team 메인에서 진입하지 않은 경우
        // "create scrum team" button 빼고 보여주기
        // is_from_main = false;

    return (
        <StyledContainer>
            <h3>INTRODUCTION TO SCRUM</h3>
            <p style={{textAlign: 'center', lineHeight: '25px'}}>
                Scrum is an agile framework for managing work, ideal for complex projects. 
                It focuses on teamwork, iterative progress, and continuous improvement.
            </p>
            {is_from_main && <CreateButton/>}
            {description_list.map((description, index) => (
                <ExpandableText key={index} title={description.title} contents={description.contents} />
            ))}
        </StyledContainer>
    );
  }