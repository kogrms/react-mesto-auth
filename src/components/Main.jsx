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
  onCardDelete,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext);
  // const cardsElements = isLoading === true ? ([]) : (
  //   cards.map((card) => (
  //     <Card
  //       key={card._id}
  //       onCardClick={onCardClick}
  //       card={card}
  //       onCardLike={onCardLike}
  //       onCardDelete={onCardDelete}
  //     />
  //   ))
  // );
  let cardsElements = []
  if (isLoading === false) {
    console.log('CARD isLoading', isLoading)
    cardsElements = cards.map((card) => (
      <Card
        key={card._id}
        onCardClick={onCardClick}
        card={card}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    ))
  }


  return (
    <main className="content">
      {isLoading
        ? ( <p>Loading...</p> )
        : (
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
              <ul className="cards__container">{cardsElements}</ul>
            </section>
          </>
      )}
    </main>
  );
}

export default Main;
