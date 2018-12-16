import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: 3px solid var(--primary);
  color: var(--primary);
  font-size: 1rem;
  border-radius: 3px;
  padding: 1rem 3rem;
  text-transform: uppercase;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

export default Button;
