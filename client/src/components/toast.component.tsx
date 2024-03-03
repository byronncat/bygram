import clsx from 'clsx';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastMessage({
  header,
  message,
  className,
  show,
  setShow,
}: {
  className?: string;
  header: string;
  message: string;
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  return (
    <ToastContainer position="top-end" className={className}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <i className={clsx('fa-solid fa-circle-xmark', 'rounded me-2')}></i>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
