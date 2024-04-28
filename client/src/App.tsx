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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('localStorage.getItem', localStorage.getItem('token'))
      store.checkAuth();
    }
  }, [store]);

  const handleToggleForm = () => {
    setShowRegistration(prevState => !prevState);
  };

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      console.log('response.data', response.data);

    } catch (error) {
      console.log('getUsers', error);
      alert(`Користувач не авторизований!`);
    }
  }

  if (store.isLoading) {
    return <div>Завантаження...</div>
  }

  if (!store.isAuth) {
    console.log('!store.isAuth', !store.isAuth)
    return (
      <div className="auth-page">
        {/* Відображаємо форму авторизації, якщо користувач не авторизований або форму реєстрації, якщо користувач не авторизований і натиснута кнопка для переключення форми */}
        {!store.isAuth && !showRegistration ? (
          <LoginForm />
        ) : (
          <RegistrationForm />
        )}

        {/* { Показуємо посилання для переключення між формами, якщо користувач не авторизований */}
        <div className="sign-container">
          <button className='sign-button' onClick={handleToggleForm}>
            {showRegistration ? "Sign in" : "Sign up"}
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="App" >
      <h3>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРЕЗУЙТЕСЬ!'}</h3>
      <h3>{store.user.isActivated ? 'Акаунт підтверджений по пошті' : 'ПІДТВЕРДІТЬ АКАУНТ!'}</h3>
      <button className='app-button' onClick={() => store.logout()}>logout</button>

      <button className='app-button' onClick={getUsers}>Get users</button>

      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);