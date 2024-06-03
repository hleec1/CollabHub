import { Container } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}
export default function BordredContainer({children}: Props) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginTop: '15px',
                marginBottom: '20px',
                border: '0.5px solid #EDEDED',
                borderRadius: '5px',
                height: '80vh',
                boxShadow: 2
         }}>
            {children}
        </Container>
    )
}