import { redirect } from "next/navigation";

export async function Auth() {
    const token = null;   // TODO: token 불러오기
    if (token) {
        // 이미 로그인된 상태
    } else {
        redirect("/main");  // TODO: login 화면으로 redirect되도록 설정하기
    }
}