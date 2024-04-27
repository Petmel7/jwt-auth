import React, { FC, useContext, useState } from "react";
import { Context } from "..";
import { observer } from 'mobx-react-lite';

// const LoginForm: FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const { store } = useContext(Context);

//     const handleLogin = () => {
//         store.login(email, password);
//     }

//     return (
//         <form className="form">
//             <input
//                 className="form-input"
//                 onChange={e => setEmail(e.target.value)}
//                 type="text"
//                 value={email}
//                 placeholder="Email"
//             />

//             <input
//                 className="form-input"
//                 onChange={e => setPassword(e.target.value)}
//                 type="password"
//                 value={password}
//                 placeholder="Password"
//             />

//             <button className="form-button" onClick={handleLogin}>Sign in</button>
//         </form>
//     )
// }

// export default observer(LoginForm);