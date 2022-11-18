import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({ onClose, isOpen, success }) {
  return (
    <PopupWithForm name="infotooltip" onClose={onClose} isOpen={isOpen}>
      <img
        src={success ? successImage : failImage}
        alt={success ? "Регистрация успешна!" : "Ошибка регистрации"}
        className="popup__registration-image"
      />
      <h3 className="popup__registration-message">
        {success
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </h3>
    </PopupWithForm>
  );
}

export default InfoTooltip;
