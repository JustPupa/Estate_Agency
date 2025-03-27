import { Input, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react";

export default function CreateSpecForm({ onCreate }) {
    const [spec, setSpec] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setSpec(null);
        onCreate(spec);
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Создание заметки</h3>
            <Input 
                placeholder='Название' 
                onChange={(e) => setSpec({...spec, title: e.target.value})} 
            />
            <Textarea
                placeholder='Описание'
                onChange={(e) => setSpec({...spec, description: e.target.value})} 
            />
            <Button type="submit">Создать</Button>
        </form>
    );
}