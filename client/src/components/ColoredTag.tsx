import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
    text: string,
    color: string,
}

export default function ColoredTag({text, color = ''}: Props) {
    const theme = useTheme()

    return (
        <Typography
            variant="body2"
            sx={{
                backgroundColor: color,
                borderRadius: '10px',
                lineHeight: '25px',
                padding: '0 8px',
                color: '#FFFFFF'
            }}
        >{text}
        </Typography>
    )
}