import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './RemovePopup.scss';

export interface RemovePopupProps {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const RemovePopup = ({ name, onClose, onConfirm }: RemovePopupProps) => {
  const rootEl = document.querySelector('#root');

  return rootEl
    ? createPortal(
        <Fragment>
          <div className="overlay" onClick={onClose}></div>

          <div className="remove-window">
            <div className="remove-window-title">
              <h3>Remove a student?</h3>
            </div>
            <div className="remove-window-text">
              Are you sure you want to remove student named "{name}". This action can't be undo.
            </div>
            <div className="remove-window-btn-box">
              <button className="remove-window-btn remove-window-btn-cancel" onClick={onClose}>
                cancel
              </button>
              <button className="remove-window-btn remove-window-btn-remove" onClick={onConfirm}>
                remove
              </button>
            </div>
          </div>
        </Fragment>,
        rootEl
      )
    : null;
};
