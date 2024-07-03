import Button from "./Button";
import Modal from "./Modal";
import "./DeleteNoteModal.css";

type DeleteNoteModalProps = {
  isOpen: boolean;
  handleCloseDeleteNoteModal: () => void;
  deleteNote: () => void;
};

export default function DeleteNoteModal({
  isOpen,
  handleCloseDeleteNoteModal,
  deleteNote
}: DeleteNoteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={handleCloseDeleteNoteModal}>
      <p>Are you sure that you want to delete this note?</p>
      <div id="yes-no-btns">
        <Button className="modal-btn" id="no-btn" onClick={handleCloseDeleteNoteModal} text="No" />
        <Button className="modal-btn" id="yes-btn" onClick={deleteNote} text="Yes" />
      </div>
    </Modal>
  );
}
