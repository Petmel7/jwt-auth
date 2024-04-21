import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import './index.css';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

  const handleToggleForm = () => {
    setShowRegistration(prevState => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('localStorage.getItem', localStorage.getItem('token'))
      store.checkAuth()
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);

    } catch (error) {
      console.log('getUsers', error);
    }
  }

  if (store.isLoading) {
    return <div>Завантаження...</div>
  }

  // if (!store.isAuth) {
  //   console.log('!store.isAuth', !store.isAuth)
  //   return (
  //     <>
  //       <LoginForm />
  //       <RegistrationForm />
  //     </>
  //   )
  // }

  if (!store.isAuth) {
    console.log('!store.isAuth', !store.isAuth)
    return (
      <div className="auth-page">
        {/* Відображаємо форму авторизації, якщо користувач не авторизований */}
        {!store.isAuth && !showRegistration && (
          <LoginForm />
        )}

        {/* Відображаємо форму реєстрації, якщо користувач не авторизований і натиснута кнопка для переключення форми */}
        {!store.isAuth && showRegistration && (
          <RegistrationForm />
        )}

        {/* Показуємо посилання для переключення між формами, якщо користувач не авторизований */}
        {!store.isAuth && (
          <div className="sign-container">
            <button className='sign-button' onClick={handleToggleForm}>
              {showRegistration ? "Sign in" : "Sign up"}
            </button>
          </div>
        )}

        {/* Повідомлення, що користувач вже авторизований */}
        {store.isAuth && (
          <div>Ви вже авторизовані</div>
        )}
      </div>
    )
  }

  return (
    <div className="App" >
      <h1>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРЕЗУЙТЕСЬ!'}</h1>
      {/* <h1>{store.isActivated ? 'Акаунт підтверджений по пошті' : 'ПІДТВЕРДІТЬ АКАУНТ!'}</h1> */}
      <button onClick={() => store.logout()}>logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);