import { Avatar, Badge, Container } from "@mui/material";
import { team_members } from "@/common_mockups/team_members";

export default function MembersStatusView() {
    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginTop: '10px',
                marginBottom: '10px',
                border: '0.5px solid #EDEDED',
                borderRadius: '5px',
                height: '60px',
                overflowX: 'scroll',
                overflowY: 'hidden',
                backgroundColor: '#F7F7F7'
         }}>
            {team_members.map((member) => {
                return <Container key={member.id} sx={{
                            margin: 0,
                            padding: 0,
                            position: 'relative',
                            marginRight: '10px',
                         }}>
                        <Avatar alt="Profile" src={`/images/${member.profileImage}.png`} sx={{ width: 40, height: 40, border: '0.5px solid #A3D165' }} />
                        <Badge
                            variant="dot"
                            sx={{
                                position: 'absolute', // 절대적인 위치 설정
                                bottom: '6px',
                                right: '10px',
                                "& .MuiBadge-badge": {
                                    backgroundColor: member.status ? "#4ECB71" : "#D9D9D9",
                                    border: member.status ? "" : "1px solid #777777"
                                  }
                            }}
                        />
                    </Container>
            })}
        </Container>
    )
}