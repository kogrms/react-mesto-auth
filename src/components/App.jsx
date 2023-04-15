// import React, { useState, useEffect, useCallback } from "react";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import AuthForm from "./AuthForm";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // let token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      api.checkToken(jwt)
      .then((res) => {
        setCurrentUser(res.data); 
        setLoggedIn(true);
        setEmail(res.data.email);
        history.push('/');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
    }
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      api.updateToken();

      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards.data);
        setCurrentUser(user.data);
        setEmail(user.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      ...card,
    });
  }

    function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete({
      isOpen: true,
      ...card,
    });
  }

  function handleUpdateUser(newUserData) {
    api
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .addNewAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleConfirmDeletion(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setCardToDelete({});
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    auth
      .signUp({ password, email })
      .then((res) => {
        if (res) {
          setEmail("");
          setPassword("");
          history.push("/login");
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth
      .signIn({ password, email })
      .then((data) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsInfoTooltipOpen(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={email} onLogout={handleLogout} />
          <Switch>
            <Route path="/sign-in">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <AuthForm
                  authFormType={"login"}
                  onSubmit={handleLoginSubmit}
                  email={email}
                  password={password}
                  onEmailChange={handleEmailChange}
                  onPasswordChange={handlePasswordChange}
                />
              )}
            </Route>
            <Route path="/sign-up">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <AuthForm
                  authFormType={"register"}
                  onSubmit={handleRegisterSubmit}
                  email={email}
                  password={password}
                  onEmailChange={handleEmailChange}
                  onPasswordChange={handlePasswordChange}
                />
              )}
            </Route>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmPopup
            card={cardToDelete}
            onClose={closeAllPopups}
            onConfirmDeletion={handleConfirmDeletion}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          {!loggedIn && (
            <InfoTooltip
              success={success}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
