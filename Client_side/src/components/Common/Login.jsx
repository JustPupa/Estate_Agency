import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { cryptCredentials } from "../../services/requests";

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = () => {
      const fetchData = async () => {
          let logresponse = await cryptCredentials(login, password);
          if (logresponse.status===200) {
            localStorage.setItem('elogin', logresponse.data.crlogin);
            localStorage.setItem('epassword', logresponse.data.crpassword);
            localStorage.setItem('ekey', logresponse.data.cookie);
            if (logresponse.data.role === 1) {
              navigate('/client');
            } else if (logresponse.data.role === 2) {
              navigate('/realt');
            };
          }
      }
      fetchData();
    };

    const onRegistration = () => {
      navigate('/registration');
    }

    return (
    <Card.Root maxWidth="sm" margin="auto">
    <Card.Header>
      <Card.Title>Войдите в систему</Card.Title>
      <Card.Description>
        Или зарегестрируйтесь, если у вас нет аккаунта
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" width="full">
        <Field.Root>
          <Field.Label>Логин</Field.Label>
          <Input id="loginInp" placeholder="Введите логин" onChange={(event) => setLogin(event.target.value)}/>
        </Field.Root>
        <Field.Root>
          <Field.Label>Пароль</Field.Label>
          <PasswordInput id="passwordInp" placeholder="Введите пароль" size="md" onChange={(event) => setPassword(event.target.value)} />
        </Field.Root>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline" onClick={onLogin}>Далее</Button>
      <Button variant="solid" onClick={onRegistration}>Регистрация</Button>
    </Card.Footer>
  </Card.Root>
)}