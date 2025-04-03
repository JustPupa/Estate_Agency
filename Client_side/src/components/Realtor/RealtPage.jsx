import { useState, useEffect } from "react";
import { Stack, Alert } from "@chakra-ui/react"
import { getUserData } from "../../services/requests"
import RealtHeader from "./RealtHeader";
import CreateEstateForm from "./CreateEstate";
import RealtEstates from "./RealtEstates";

export default function RealtPage() {
    const [elogin] = useState(localStorage.getItem('elogin'));
    const [epassword] = useState(localStorage.getItem('epassword'));
    const [ekey] = useState(localStorage.getItem('ekey'));
    const [uid] = useState(localStorage.getItem('uid'));
    const [uname] = useState(localStorage.getItem('uname'));
    const [status, setStatus] = useState('0');
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [categoriesNames, setCategoriesNames] = useState([]);
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
                setCategoriesIds(response.data.ctgids);
                setCategoriesNames(response.data.ctgstr)
                setEstates(response.data.estates);
            } else if (response.status===200) {
                setStatus('-1');
            }
        }
        getPageContent();
    }, [])

    if (status === "-1") return (<h1>Page is not available</h1>);

    return status==='0'? (
        <h1>Loading...</h1>
    ) : (<>
         <RealtHeader uname={uname} />
         <CreateEstateForm notifyEstateAdded={setIsAddedEstate} setEstates={setEstates}/>
         <RealtEstates 
            estates={estates} 
            setEstates={setEstates} 
            notifyEstateSaved={setIsSavedEstate} 
            notifyEstateRemoved={setIsRemovedEstate}
        />
        {
        isSavedEstate? (<Stack gap="4" width="full" className="fixed w-auto! left-[50%] bottom-2 z-10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Успешно сохранено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
        {
        isAddedEstate? (<Stack gap="4" width="full" className="fixed w-auto! left-[50%] bottom-2 z-10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Успешно добавлено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
        {
        isRemovedEstate? (<Stack gap="4" width="full" className="fixed w-auto! left-[50%] bottom-2 z-10">
            <Alert.Root status="success">
                <Alert.Indicator />
                <Alert.Title>Объявление удалено!</Alert.Title>
            </Alert.Root>
            </Stack>) : (<></>)
        }
    </>)
};