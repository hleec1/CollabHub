"use client"

import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useRef, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { descriptionContentType } from "../constants/description_list";

interface Props {
    title: string,
    contents: descriptionContentType[],
    children?: ReactNode,
}

const DescriptionBox = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    maxHeight: 0,
}));

export default function ExpandableText({title, contents, children}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    
    const toggleExpand = () => {
        setIsExpanded(isExpanded => !isExpanded);
    };

    return (
        <div style={{marginTop: '20px'}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${theme.palette.primary.main}`}} onClick={toggleExpand}>
                <Typography variant="h6" sx={{lineHeight: '45px'}}>
                    {title}
                </Typography>
                {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            <DescriptionBox
                sx={{
                maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
                paddingTop: '10px'
                }}
                ref={contentRef}
            >
                {contents.map((content, index) => (
                    <div key={index}>
                        <Typography variant="body2" sx={{lineHeight: '25px'}}>
                            <span style={{fontWeight: 600}} className="text-gray">{content.subtitle}: </span>
                            <span className="text-gray">{content.content}</span>
                        </Typography>
                    </div>
                ))}
            </DescriptionBox>
        </div>
    )
}