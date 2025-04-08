import { Button, Card, Field, Input, Stack, Alert } from "@chakra-ui/react"
import { PasswordInput } from "../ui/password-input"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../services/requests"

export default function Registration() {
    const [alert, setAlert] = useState(0);

    const[login, setLogin] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[passwordRepeat, setPasswordRepeat] = useState("");

    const navigate = useNavigate();

    const Register = () => {
        const fetchData = async () => {
            let response = await CreateUser(login, username, password);
            if (response.status===200) {
                setAlert(response.data.statusCode);
                setTimeout(() => {
                    setAlert(0);
                }, "3000");
                if(response.data.statusCode === 2) {
                    setLogin("");
                    setUsername("");
                    setPassword("");
                    setPasswordRepeat("");
                }
            } else {
                console.log(response);
            }
        }
        fetchData();
    }

    return (<><Card.Root maxWidth="sm" margin="auto">
        <Card.Header>
          <Card.Title>Регистрация нового пользователя</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" width="full">
            <Field.Root>
              <Field.Label>Логин</Field.Label>
              <Card.Description fontSize="smaller" lineHeight="1.2">
                Придумайте простой и запоминающийся логин. В дальнейшем он будет использоваться для входа
              </Card.Description>
              <Input border="1px solid gray" value={login} placeholder="Vasya_Pupkin_2003" onChange={(event) => setLogin(event.target.value)}/>
            </Field.Root>
            <Field.Root>
              <Field.Label>Никнейм</Field.Label>
              <Card.Description fontSize="smaller" lineHeight="1.2">
                Имя пользователя, которое будет отображаться в личном кабинете
              </Card.Description>
              <Input border="1px solid gray" value={username} placeholder="Василий Пупкин" onChange={(event) => setUsername(event.target.value)}/>
            </Field.Root>
            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <Card.Description fontSize="smaller" lineHeight="1.2">
                Выберите такой пароль, чтобы он не был слишком коротким и содержал цифры и заглавные буквы
              </Card.Description>
              <Stack width="100%">
                <PasswordInput border="1px solid gray" value={password} onChange={(e) => setPassword(e.target.value) } width="100%" size="md" />
                <PasswordStrengthBar
                    shortScoreWord="Пароль слишком короткий"
                    scoreWords={['Слабый пароль', 'Слабый пароль', 'Удовлетворительный пароль', 'Надёжный пароль', 'Сильный пароль']}
                    password={password} 
                />
              </Stack>
            </Field.Root>
            <Field.Root invalid={password !== passwordRepeat}>
              <Field.Label>Повторите пароль</Field.Label>
              <PasswordInput border="1px solid gray" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} size="md" />
              <Field.ErrorText>Пароли не совпадают</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="space-between">
          <Button
            variant="outline"
            disabled={(password !== passwordRepeat) || password==="" || login==""|| username==""}
            onClick={() => Register()}>
            Зарегестрироваться
          </Button>
          <Button variant="solid" onClick={() => navigate('/')}>На главную</Button>
        </Card.Footer>
      </Card.Root>
        {
            (alert===1)? (
            <Alert.Root
                status="error"
                display="flex"
                position="fixed"
                bottom="2"
                width="fit-content"
                alignSelf="center">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>
                    Ошибка!
                </Alert.Title>
                <Alert.Description>
                    Такой логин уже используется. Попробуйте ввести другие данные
                </Alert.Description>
            </Alert.Content>
            </Alert.Root>) : <></>
        }
        {
            (alert===2)? (<Alert.Root
                    status="success"
                    variant="solid"
                    display="flex"
                    position="fixed"
                    bottom="2"
                    width="fit-content"
                    alignSelf="center">
                <Alert.Indicator />
                <Alert.Title>Аккаунт успешно создан!</Alert.Title>
            </Alert.Root>) : <></>
        }
        </>
)}