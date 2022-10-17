function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.isOpen && "popup_opened"}`}>
      <div className="popup__container_type_image popup__container">
        <button
          type="button"
          onClick={onClose}
          className="popup__close_type_image popup__close"
          aria-label="Кнопка закрытия окна просмотра фотографии"
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
