import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "" : "card__delete_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        type="button"
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
        aria-label="Кнопка удаления фотографии"
      ></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__info">
        <h3 className="card__heading">{card.name}</h3>
        <div className="card__likes-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            aria-label="Кнопка оценки фотографии"
          ></button>
          <p className="card__likes-amount">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
