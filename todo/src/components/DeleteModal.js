import React from "react";
import PropTypes from "prop-types";
import styles from "./DeleteModal.module.css";

const DeleteModal = (props) => {
  const { onClose, onDelete } = props;
  return (
    <div id="id01" className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>Delete Task</h1>
          <div onClick={onClose} className={styles.close} title="Close Modal">
            &times;
          </div>
        </div>
        <div className={styles.content}>
          <p>Are you sure you want to delete this task?</p>
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose} type="button" className={styles.cancelbtn}>
            Cancel
          </button>
          <button onClick={onDelete} type="button" className={styles.deletebtn}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteModal;
