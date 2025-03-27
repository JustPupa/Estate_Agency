import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"
import { OnLogin, Authorize } from "../services/requests"
import { PasswordInput } from "./ui/password-input"

const onLogin = () => {
    const fetchData = async () => {
        let login = document.querySelector('#loginInp').value;
        let password = document.querySelector('#passwordInp').value;
        let logresponse = await OnLogin(login, password);
        if (logresponse.status===200) {
          console.log('success login!');
          let authresponse = await Authorize(logresponse.data.crlogin, logresponse.data.crpassword, logresponse.data.cookie);
          if (authresponse.status===200) {
            console.log('success authorization!');
            console.log(authresponse);
          }
        }
    }
    fetchData();
};

export const Login = () => (
    <Card.Root maxW="sm">
    <Card.Header>
      <Card.Title>Войдите в систему</Card.Title>
      <Card.Description>
        Или зарегестрируйтесь, если у вас нет аккаунта
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>Логин</Field.Label>
          <Input id="loginInp" placeholder="Введите логин"/>
        </Field.Root>
        <Field.Root>
          <Field.Label>Пароль</Field.Label>
          <PasswordInput id="passwordInp" placeholder="Введите пароль" size="md" />
        </Field.Root>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline" onClick={onLogin}>Далее</Button>
      <Button variant="solid">Регистрация</Button>
    </Card.Footer>
  </Card.Root>
)