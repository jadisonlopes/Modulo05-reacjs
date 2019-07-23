import styled from 'styled-components';

export const Title = styled.h1`
  color: ${props => (props.error ? 'red' : '#FFF')};
`;
