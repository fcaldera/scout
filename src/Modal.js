import styled from 'styled-components';
import ReactModal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root'); //Avoid accesibility warning
  ReactModal.defaultStyles.overlay.backgroundColor = '#282c34';
}

const Modal = styled(ReactModal)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.5rem;
  padding: 2rem;
  background: '#282c34';
  border: none;
`;

export default Modal;
