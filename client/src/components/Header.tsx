'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter, usePathname } from 'next/navigation';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Header() {
    const router = useRouter();
    const pathName = usePathname();

    // TODO: auth 확인
    const auth = true;

    const handleBackClick = React.useCallback(() => {
        router.back();
    }, [router]);

    const handleAccountCircleClick = () => {
        router.push('/mypage')  // TODO: 마이페이지 경로 확인
    }

    let pageTitle = "CollabHub"; // 기본 페이지 제목

    const firstPathSegment = pathName.split('/')[1];
    // 라우팅 경로에 따라 페이지 제목 설정
    switch (firstPathSegment) {
        case 'chat':
            pageTitle = 'Chat'
            break;
        case 'mypage':
            pageTitle = 'My Page'
            break;
        case 'scheduler':
            pageTitle = 'Scheduler'
            break;
        case 'task_manager':
            pageTitle = 'Task Manager'
            break;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#3E5C48' }}>
            <Toolbar>
            <IconButton
                onClick={handleBackClick}
                size="large"
                edge="start"
                color="inherit"
                aria-label="go back"
                sx={{ mr: 2 }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                {pageTitle}
            </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccountCircleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
        </AppBar>
        </Box>
    );
}