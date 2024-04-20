import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store]);

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

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }
  return (
    <div className="App" >
      <h1>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРЕЗУЙТЕСЬ'}</h1>
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
