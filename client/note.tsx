// const RegistrationForm: FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [confirmPassword, setConfirmPassword] = useState<string>('');
//     const [isActive, setIsActive] = useState<boolean>(false);
//     const { store } = useContext(Context);

//     const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); // Зупиняє дію за замовчуванням (відправлення форми)

//         if (password !== confirmPassword) {
//             alert('Паролі не співпадають!');
//             return;
//         }

//         store.registration(email, password);
//     }

//     const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); // Зупиняє дію за замовчуванням (відправлення форми)

//         store.login(email, password);
//     }

//     const handleToggleForm = () => {
//         setIsActive(!isActive);
//     }

//     console.log('isActive', isActive);

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

//             <input
//                 className={`form-input ${isActive ? 'active' : ''}`}
//                 onChange={e => setConfirmPassword(e.target.value)}
//                 type="password"
//                 value={confirmPassword}
//                 placeholder="Comfirm password"
//             />

//             <button
//                 className={`form-button ${isActive ? 'active' : ''}`}
//                 onClick={handleRegistration}
//             >
//                 Sign up
//             </button>

//             <button
//                 className={`form-button ${!isActive ? 'active' : ''}`}
//                 onClick={handleLogin}
//             >
//                 Sign in
//             </button>

//             <div className="sign-container">
//                 <button className='sign-button' onClick={handleToggleForm}>
//                     {!isActive ? "Sign in" : "Sign up"}
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default observer(RegistrationForm);



/* Відображаємо форму авторизації, якщо користувач не авторизований */
/* {!store.isAuth && !showRegistration && (
          <LoginForm />
        )} */

/* Відображаємо форму реєстрації, якщо користувач не авторизований і натиснута кнопка для переключення форми */
/* {!store.isAuth && showRegistration && (
          <RegistrationForm />
        )} */

/* { Показуємо посилання для переключення між формами, якщо користувач не авторизований */
// {!store.isAuth && (
//         <div className="sign-container">
//             <button className='sign-button' onClick={handleToggleForm}>
//                 {showRegistration ? "Sign in" : "Sign up"}
//             </button>
//         </div>
//     )
// }