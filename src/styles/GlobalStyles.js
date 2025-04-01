import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Attendu

export const Nav = styled.nav`
  font-family: 'Inter', sans-serif;
  background: #2c3e50;
  padding: 1rem;
  text-align: center;
`;

export const NavLink = styled(Link)`
  color: #ecf0f1;
  margin: 0 1rem;
  text-decoration: none;
  &:hover {
    color: #3498db;
  }
`;

export const Container = styled.div`
  padding: 2rem;
`;