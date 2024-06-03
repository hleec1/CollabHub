"use client"

import { useRouter } from "next/navigation"

export default function ChatPage() {
    // 잘못된 접근
    // main page로 redirect
    const router = useRouter();
    router.push('/');
    return <></>
}