import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef();

  useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="avatar-link"
        type="url"
        name="link"
        ref={avatarInput}
        className="form__input form__input_value_link"
        autoComplete="off"
        required
        placeholder="Ссылка на картинку"
      />
      <span id="avatar-link-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
