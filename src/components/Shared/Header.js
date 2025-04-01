// src/components/Shared/Header.js
// Ce fichier contient le composant Header, qui affiche une barre de navigation.
// Il inclut un menu burger pour mobile avec les options "Contact", "Connexion", et "Inscription".

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser l’en-tête avec navigation.
 */
import React, { useState } from 'react'; // Ajoute useState pour gérer l’état du menu burger
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from './Theme';

/*
 * PARTIE 2 : STYLES DE L’EN-TÊTE
 * Cette partie stylise l’en-tête, le logo, les liens de navigation, et le menu burger.
 */
const HeaderStyled = styled.header.withConfig({ shouldForwardProp: (prop) => prop !== 'isProfile' })`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  background: ${props => (props.isProfile ? theme.colors.darkGreen : 'transparent')};
  height: ${props => (props.isProfile ? '10vh' : 'auto')};
  @media (max-width: 480px) {
    padding: 0.5rem;
    flex-direction: row; // Garde row pour mobile, mais on ajuste le contenu
    height: auto;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0.75rem;
    height: ${props => (props.isProfile ? '8vh' : 'auto')};
  }
`;

const BurgerButton = styled.button`
  display: none; // Caché par défaut sur grand écran
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.yellow};
  cursor: pointer;
  margin-left: 1rem;
  z-index: 3; // Devant le logo
  @media (max-width: 480px) {
    display: block; // Visible sur mobile
  }
`;

const BurgerMenu = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')}; // Affiche ou cache selon l’état
  position: absolute;
  top: 100%; // Juste sous l’en-tête
  left: 0;
  width: 100%;
  background: ${theme.colors.darkGreen};
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  z-index: 2; // Devant le reste du contenu
  @media (min-width: 481px) {
    display: none; // Caché sur grand écran
  }
`;

const Logo = styled(NavLink)`
  font-family: ${theme.fonts.chicle};
  font-size: 2rem;
  color: ${theme.colors.yellow};
  text-decoration: none;
  margin-left: 2rem; // Décalé pour laisser place au burger sur mobile
  margin-top: 0.5rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-left: 3rem; // Plus d’espace pour le burger
    margin-top: 0.25rem;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.8rem;
    margin-left: 1.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
  @media (max-width: 480px) {
    display: none; // Cache la navigation classique sur mobile
  }
  @media (min-width: 481px) and (max-width: 768px) {
    gap: 0.75rem;
    margin-right: 1.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-family: ${theme.fonts.inter};
  color: ${theme.colors.white};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  ${({ isActive }) => isActive && `
    color: ${theme.colors.yellow};
    pointer-events: none;
  `}
  @media (max-width: 480px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 1rem;
  }
`;

const HighlightBox = styled(NavLink)`
  background: ${({ isActive }) => (isActive ? theme.colors.yellow : 'rgba(0, 0, 0, 0.3)')};
  color: ${theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  @media (max-width: 480px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0.4rem 0.75rem;
  }
`;

const BurgerNavLink = styled(NavLink)`
  font-family: ${theme.fonts.inter};
  color: ${theme.colors.white};
  text-decoration: none;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  &:hover {
    color: ${theme.colors.yellow};
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT HEADER
 */
const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');
  const [isBurgerOpen, setIsBurgerOpen] = useState(false); // État pour ouvrir/fermer le menu burger

  console.log("Header - isLoggedIn:", isLoggedIn);

  const isUserLoggedIn = isLoggedIn !== undefined ? isLoggedIn : false;

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen); // Inverse l’état du menu burger
  };

  return (
    <HeaderStyled isProfile={isProfilePage}>
      {/* Bouton burger devant le logo */}
      <BurgerButton onClick={toggleBurger}>☰</BurgerButton>
      <Logo to="/">Connectify</Logo>

      {/* Menu burger pour mobile */}
      <BurgerMenu isOpen={isBurgerOpen}>
        <BurgerNavLink to="/contact" onClick={toggleBurger}>Contact</BurgerNavLink>
        <BurgerNavLink to="/auth" onClick={toggleBurger}>Connexion</BurgerNavLink>
        <BurgerNavLink to="/inscription" onClick={toggleBurger}>Inscription</BurgerNavLink>
      </BurgerMenu>

      {/* Navigation classique pour desktop */}
      <Nav key={isUserLoggedIn ? "logged-in" : "logged-out"}>
        {isUserLoggedIn ? (
          <>
            <StyledNavLink to="/profile" end>Profil</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
            <HighlightBox to="/auth" onClick={onLogout}>Déconnexion</HighlightBox>
          </>
        ) : (
          <>
            <StyledNavLink to="/" end>Accueil</StyledNavLink>
            <StyledNavLink to="/auth">Connexion</StyledNavLink>
            <HighlightBox to="/inscription">Inscription</HighlightBox>
          </>
        )}
      </Nav>
    </HeaderStyled>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 */
export default Header;