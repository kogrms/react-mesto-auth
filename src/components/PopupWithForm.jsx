import { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ` + (isOpen ? "popup_opened" : ``)}
      onClick={handleOverlay}
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
          {!(name === "infotooltip") && (
            <button
              type="submit"
              className="form__submit-button"
              aria-label="Кнопка отправки формы"
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
