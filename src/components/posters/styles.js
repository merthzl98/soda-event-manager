import styled from "styled-components";

export const DragIconWrapper = styled.div`
  display: inline-block;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    padding-right: 1rem;
  }
`;
export const ListContainer = styled.div`
  min-width: 15rem;
  padding: 24px;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #aaaaaa;
`;
export const ListItem = styled.div`
  color: #444444;
  padding: 0.8rem 0.3rem;
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  background: white;
`;
