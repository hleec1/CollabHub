import StyledContainer from "@/components/StyledContainer";
import BorderedContainer from "./components/BorderedContainer";
import ProductBacklogList from "./components/ProductBacklogList";
import { Typography } from "@mui/material";

export default function ProductBacklogPage() {
    return (
        <StyledContainer>
            <Typography variant="h6" sx={{width: '100%', textAlign: 'left', paddingLeft: '30px'}}>Product Backlog</Typography>
            <BorderedContainer>
                <ProductBacklogList/>
            </BorderedContainer>
        </StyledContainer>
    )
}