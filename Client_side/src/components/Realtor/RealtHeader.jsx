import { CloseButton, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { FaPersonShelter } from "react-icons/fa6";

const ReturnToLogin = (navigate) => {
    localStorage.setItem('elogin', '');
    localStorage.setItem('epassword', '');
    localStorage.setItem('ekey', '');
    localStorage.setItem('uid', '');
    localStorage.setItem('uname', '');
    navigate('/');
}

export default function RealtHeader({uname}) {
    const navigate = useNavigate();
    
    return <header className="top-0 w-full flex p-3! text-2xl! bg-[#0d9488]">
        <div className="flex">
            <div className="flex items-center font-medium!">ЛИЧНЫЙ КАБИНЕТ РИЭЛТОРА</div>
            <div className="flex items-center bg-black p-1! ml-2! rounded-md">
                <FaPersonShelter className="h-6! w-6! p-1!"/>
                <div className="flex items-center font-bold! p-1! text-base!">{uname}</div>
            </div>
        </div>
        <Stack className="flex justify-center ml-auto!">
            <CloseButton onClick={() => ReturnToLogin(navigate)} variant="subtle" className="self-end" />
        </Stack>
    </header>
}