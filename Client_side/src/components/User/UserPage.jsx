import { useState, useEffect } from "react";
import {
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react"
import { getUserData } from "../../services/requests"
import UserPageFilter from "../User/UserPageFilter"
import UserEstates from "./UserEstates";
import '../../styles/UserPage.css'

export default function UserPage() {
   const [elogin] = useState(localStorage.getItem('elogin'));
   const [epassword] = useState(localStorage.getItem('epassword'));
   const [ekey] = useState(localStorage.getItem('ekey'));
   const [uid] = useState(localStorage.getItem('uid'));
   const [status, setStatus] = useState('-1');
   const [categories, setCategories] = useState([]);
   const [estates, setEstates] = useState([]);
   const [favorites, setFavorites] = useState([]);

   useEffect(() => {
        const getPageContent = async () => {
            let response = await getUserData(elogin,epassword,ekey);
            if (response.status===200) {
                localStorage.setItem('uid', response.data.user.id);
                setStatus('1');
                setCategories(response.data.categories);
                setEstates(response.data.estates);
                setFavorites(response.data.favourites);
            }
        }
        getPageContent();
    }, [])
   return status==='1'? (
    <>
        <UserPageFilter categories={categories} setEstates={setEstates} />
        <UserEstates estates={estates} favorites={favorites} setFavorites={setFavorites} uid={uid}/>
    </>
    ) 
    : (
        <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Загрузка пользовательских данных...</Text>
        </VStack>
    );
};