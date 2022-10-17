import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="name"
        type="text"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        className="form__input form__input_value_name"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
      />
      <span id="name-error" className="form__input-error"></span>
      <input
        id="position"
        type="text"
        name="position"
        value={description || ""}
        onChange={handleChangeDescription}
        className="form__input form__input_value_position"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
      />
      <span id="position-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
