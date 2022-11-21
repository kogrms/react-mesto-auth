import { useEffect, useMemo } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  // const [name, setName] = useState("");
  // const [link, setLink] = useState("");

  const initialFormValues = useMemo(
    () => ({
      title: {
        value: "",
        error: "",
        isValid: true,
      },
      link: {
        value: "",
        error: "",
        isValid: true,
      },
    }),
    []
  );

  const { values, setValues, handleChange } = useForm(initialFormValues);

  useEffect(() => {
    // setName("");
    // setLink("");
    setValues(initialFormValues);
  }, [isOpen, setValues, initialFormValues]);

  // function handleNewCardName(e) {
  //   setName(e.target.value);
  // }

  // function handleNewCardLink(e) {
  //   setLink(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onAddPlace({
  //     name,
  //     link,
  //   });
  // }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: values.title.value, link: values.link.value });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      isLoading={isLoading}
      isValid={
        values.title.isValid &&
        values.link.isValid &&
        values.title.value &&
        values.link.value
      }
    >
      <input
        id="place"
        type="text"
        name="place"
        className={`form__input form__input_value_place ${
          !values.title.isValid && "form__input_type_error"
        }`}
        autoComplete="off"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        onChange={handleChange}
        value={values.title.value}
      />
      <span
        id="place-error"
        className={`form__input-error ${
          !values.title.isValid && "form__input-error_visible"
        }`}
      >
        {values.title.error}
      </span>
      <input
        id="card-link"
        type="url"
        name="link"
        className={`form__input form__input_value_link ${
          !values.title.isValid && "form__input_type_error"
        }`}
        autoComplete="off"
        required
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.link.value}
      />
      <span
        id="card-link-error"
        className={`form__input-error ${
          !values.title.isValid && "form__input-error_visible"
        }`}
      >
        {values.link.error}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

// import { useEffect, useMemo } from "react";
// import PopupWithForm from "./PopupWithForm";
// import useForm from "../hooks/useForm";

// function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
//   const initialFormValues = useMemo (() => ({
//     title: {
//       value: "",
//       error: "",
//       isValid: true,
//     },
//     link: {
//       value: "",
//       error: "",
//       isValid: true,
//     },
//   }),[]);

//   const {values, setValues, handleChange} = useForm(initialFormValues);

//   useEffect(() => {
//     setValues(initialFormValues);
//   }, [isOpen, setValues, initialFormValues]);

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     onAddPlace({ title: values.title.value, link: values.link.value });
//   }

//   return (
//     <PopupWithForm
//       name="add-element"
//       title="Новое место"
//       acceptMessage="Создать"
//       onClose={onClose}
//       isOpened={isOpen}
//       onSubmit={handleSubmit}
//       isLoading={isLoading}
//       isValid={
//         values.title.isValid &&
//         values.link.isValid &&
//         values.title.value &&
//         values.link.value
//       }>
//       <input
//         className={`popup__input popup__input_type_card-title ${
//           !values.title.isValid && "popup__input_invalid"
//         }`}
//         type="text"
//         name="title"
//         placeholder="Название"
//         id="title-input"
//         minLength="2"
//         maxLength="30"
//         required
//         onChange={handleChange}
//         value={values.title.value}
//       />
//       <span
//         className={`popup__input-error title-input-error ${
//           !values.title.isValid && "popup__input-error_visible"
//         }`}>
//         {values.title.error}
//       </span>
//       <input
//         className={`popup__input popup__input_type_image-link ${
//           !values.link.isValid && "popup__input_invalid"
//         }`}
//         type="url"
//         name="link"
//         placeholder="Ссылка на картинку"
//         id="link-input"
//         required
//         onChange={handleChange}
//         value={values.link.value}
//       />
//       <span
//         className={`popup__input-error link-input-error ${
//           !values.link.isValid && "popup__input-error_visible"
//         }`}>
//         {values.link.error}
//       </span>
//     </PopupWithForm>
//   );
// }

// export default AddPlacePopup;
