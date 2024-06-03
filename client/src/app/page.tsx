import { Auth } from "@/utils/auth/Auth";

export default async function Home() {
  
  // TODO: auth, 로그인 여부 확인하는 api 호출
  await Auth();

  return (
    <></>
  );
}
