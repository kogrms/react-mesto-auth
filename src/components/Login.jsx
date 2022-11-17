function Login({ onSubmit, email, password, onEmailChange, onPasswordChange }) {
  return (
    <form className="auth-form" name="login" onSubmit={onSubmit}>
      <div className="auth-form__input-container">
        <h2 className="auth-form__title">Вход</h2>
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
          Войти
        </button>
      </div>
    </form>
  );
}

export default Login;
