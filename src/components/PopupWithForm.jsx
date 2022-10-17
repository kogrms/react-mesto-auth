function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  return (
    <div
      className={`popup popup_type_${name} ` + (isOpen ? "popup_opened" : ``)}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Кнопка закрытия попапа"
        ></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className="form"
          name={`${name}-form`}
          action="#"
          method="get"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="form__submit-button"
            aria-label="Кнопка отправки формы"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
