import { Link } from "react-router-dom";
function AuthForm({
  authFormType,
  onSubmit,
  email,
  password,
  onEmailChange,
  onPasswordChange,
}) {
  return (
    <form className="auth-form" name={authFormType} onSubmit={onSubmit}>
      <div className="auth-form__input-container">
        <h2 className="auth-form__title">
          {authFormType === "login" ? "Вход" : "Регистрация"}
        </h2>
        <input
          className="auth-form__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="auth-form__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div className="auth-form__submit-container">
        <button
          className="auth-form__submit-button"
          type="submit"
          aria-label="Кнопка отправки формы"
        >
          {authFormType === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
        {authFormType === "register" && (
          <p className="auth-form__cta">
            Уже зарегистрированы?{" "}
            <Link className="auth-form__cta-link" to="sign-in">
              Войти
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default AuthForm;
