import { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  useEffect(() => {
    if (!card.isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [card.isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_image ${card.isOpen && "popup_opened"}`}
      onClick={handleOverlay}
    >
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
