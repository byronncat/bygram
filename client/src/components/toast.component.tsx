import clsx from 'clsx';
import { useState } from 'react';
import { Collapse, Toast, ToastContainer } from 'react-bootstrap';
import global from '@sass/global.sass';

function ToastMessage({
  header,
  messages,
  removeToast,
  className,
}: {
  className?: string;
  header: string;
  messages: { content: string; id: number }[];
  removeToast: (id: number) => void;
}) {
  function removeHandler(id: number) {
    removeToast(id);
  }

  return (
    <ToastContainer position="top-end" className={className}>
      {messages
        .map((message) => (
          <Toast
            key={message.id}
            onClose={() => removeHandler(message.id)}
            delay={4700}
            autohide
            className={global.toast}
          >
            <Toast.Header>
              <i className={clsx('fa-solid fa-circle-xmark', 'rounded me-2')}></i>
              <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body>{`${message.content} + ${message.id}`}</Toast.Body>
          </Toast>
        ))
        .reverse()}
    </ToastContainer>
  );
}

export default ToastMessage;
