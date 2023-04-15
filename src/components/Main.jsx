import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);
  let cardsElements = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ))

  return (
    <main className="content">
          <>
            <section className="profile">
              <div className="profile__avatar-container">
                <button
                  onClick={onEditAvatar}
                  type="button"
                  className="profile__avatar-edit-button"
                  aria-label="Кнопка изменения аватара"
                ></button>
                <img
                  className="profile__avatar"
                  src={currentUser.avatar}
                  alt="Аватар"
                />
              </div>
              <div className="profile__info">
                <div className="profile__name-wrap">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button
                    onClick={onEditProfile}
                    type="button"
                    className="profile__edit-button"
                    aria-label="Кнопка редактирования профиля"
                  ></button>
                </div>
                <p className="profile__position">{currentUser.about}</p>
              </div>
              <button
                onClick={onAddPlace}
                type="button"
                className="profile__add-button"
                aria-label="Кнопка добавления фотографии"
              ></button>
            </section>
            <section className="cards">
              <ul className="cards__container">
                {cardsElements}
              </ul>
            </section>
          </>
    </main>
  );
}

export default Main;
