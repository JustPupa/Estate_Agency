import { Flex, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { FaPersonShelter } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

const ReturnToLogin = (navigate) => {
    localStorage.setItem('elogin', '');
    localStorage.setItem('epassword', '');
    localStorage.setItem('ekey', '');
    localStorage.setItem('uid', '');
    localStorage.setItem('uname', '');
    navigate('/');
}

export default function RealtHeader() {
    const navigate = useNavigate();
    
    return <Flex top="0" width="full" padding="3" fontSize="2xl" bgColor="#0d9488">
        <Flex>
            <Flex alignItems="center" fontWeight="medium">
                ЛИЧНЫЙ КАБИНЕТ РИЭЛТОРА
            </Flex>
            <Flex alignItems="center" bgColor="black" padding="1" marginLeft="1" borderRadius="md">
                <Box height="7" width="7" padding="1">
                    <FaPersonShelter className="h-full w-full"/>
                </Box>
            </Flex>
            <Flex alignItems="center" fontWeight="bold" padding="1">
                {localStorage.getItem('uname')}
            </Flex>
        </Flex>
        <Flex justifyContent="center" marginLeft="auto">
            <Box
                alignItems="center"
                bgColor="black"
                width="1.8em"
                height="1.8em"
                borderRadius="md"
                padding="6px"
                paddingRight="3px"
                cursor="pointer">
                <ImExit
                    onClick={() => ReturnToLogin(navigate)}
                    className="w-full h-full hover:brightness-[0.5] hover:scale-[1.1]" 
                />
            </Box>
        </Flex>
    </Flex>
}