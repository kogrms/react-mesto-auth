import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ card, onClose, onConfirmDeletion }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDeletion(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      onClose={onClose}
      isOpen={card.isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
