import { Container } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}
export default function StyledFullContainer({children}: Props) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingTop: '20px',
                paddingBottom: '20px',
         }}>
            {children}
        </Container>
    )
}