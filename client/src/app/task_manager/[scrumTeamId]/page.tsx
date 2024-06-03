"use client"

import { useRouter } from "next/navigation";

interface Props {
    params: { scrumTeamId: number};
}
export default function ScrumMainPage({params: { scrumTeamId }}: Props) {
    const router = useRouter();

    // TODO: scrumTeamId에 해당하는 team의 sprint가 진행중인지 확인해서 리다이렉트
    const isInProgress = false  //true;
    if (isInProgress) router.push(`/task_manager/${scrumTeamId}/scrum_board`);
    else   router.push(`/task_manager/${scrumTeamId}/sprint_planning`);
 
    return <></>
}