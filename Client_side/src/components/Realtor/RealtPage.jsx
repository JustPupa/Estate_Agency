import { useState, useEffect } from "react";
import { 
    Stack,
    Alert,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react"
import { getUserData } from "../../services/requests"
import RealtHeader from "./RealtHeader";
import CreateEstateForm from "./CreateEstate";
import RealtEstates from "./RealtEstates";

export default function RealtPage() {
    const [elogin] = useState(localStorage.getItem('elogin'));
    const [epassword] = useState(localStorage.getItem('epassword'));
    const [ekey] = useState(localStorage.getItem('ekey'));
    const [uname] = useState(localStorage.getItem('uname'));

    const [status, setStatus] = useState('0');
    const [estates, setEstates] = useState([]);

    const [isAddedEstate, setIsAddedEstate] = useState(false);
    const [isSavedEstate, setIsSavedEstate] = useState(false);
    const [isRemovedEstate, setIsRemovedEstate] = useState(false);

    useEffect(() => {
        const getPageContent = async () => {
            let response = await getUserData(elogin,epassword,ekey);
            if (response.status===200) {
                setStatus('1');
                localStorage.setItem('uid', response.data.user.id);
                localStorage.setItem('uname', response.data.user.name);
                setEstates(response.data.estates);
            } else if (response.status===200) {
                setStatus('-1');
            }
        }
        getPageContent();
    }, [])

    if (status === "-1") return (<h1>Page is not available</h1>);

    return status==='0'? (
        <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Загрузка данных...</Text>
        </VStack>
    ) : (<>
         <RealtHeader />
         <CreateEstateForm notifyEstateAdded={setIsAddedEstate} setEstates={setEstates}/>
         <RealtEstates
            estates={estates}
            setEstates={setEstates}
            notifyEstateSaved={setIsSavedEstate}
            notifyEstateRemoved={setIsRemovedEstate}
        />
        {
        isSavedEstate? (<Stack gap="4" position="fixed" width="auto" left="50%" bottom="2" zIndex="10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Успешно сохранено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
        {
        isAddedEstate? (<Stack gap="4" position="fixed" width="auto" left="50%" bottom="2" zIndex="10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Успешно добавлено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
        {
        isRemovedEstate? (<Stack gap="4" position="fixed" width="auto" left="50%" bottom="2" zIndex="10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Объявление удалено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
    </>)
};