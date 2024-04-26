import React, { FC, useContext, useState } from "react";
import { Context } from "..";
import { observer } from 'mobx-react-lite';

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { store } = useContext(Context);

    const handleRegistration = () => {
        if (password !== confirmPassword) {
            alert('Паролі не співпадають!');
            return;
        }

        store.registration(email, password);
        // alert('Успішна реєстрація');
    }
    return (
        <form className="form">
            <input
                className="form-input"
                onChange={e => setEmail(e.target.value)}
                type="text"
                value={email}
                placeholder="Email"
            />

            <input
                className="form-input"
                onChange={e => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Password"
            />

            <input
                className="form-input"
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                value={confirmPassword}
                placeholder="Comfirm password"
            />

            <button className="form-button" onClick={handleRegistration}>Sign up</button>
        </form>
    )
}

export default observer(RegistrationForm);