import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const States = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding-top: 30px;
`;

export const Page = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding-top: 30px;
`;

export const Button = styled.button.attrs(props => ({
  disabled: props.visivel,
}))`
  font-weight: bold;
  height: 35px;
  border-radius: 10px;
  width: 100px;
  background: #7159c1;
  color: #fff;

  ${props =>
    props.ativo &&
    css`
      background: #576574;
    `}

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 14px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #7159c1;
          color: #eee;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
