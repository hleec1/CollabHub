import { Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@mui/material/styles";

interface Props {
    text: string,
    color: string,
    onDelete: () => void;
}

export default function ColoredTagDeletable({text, color = '', onDelete}: Props) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: color,
                borderRadius: '10px',
                padding: '4px 8px',
                color: '#FFFFFF',
                lineHeight: '25px',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    flexGrow: 1
                }}
            >
                {text}
            </Typography>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={onDelete}
                sx={{
                    color: '#FFFFFF',
                    padding: '0 4px',
                }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}