import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false); // Estado para Fazendas
  const [dropdownAbertoPlacas, setDropdownAbertoPlacas] = useState(false); // Estado para Placas

  const fecharMenu = () => {
    setMenuAberto(false);
    setDropdownAberto(false);
    setDropdownAbertoPlacas(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        {/* Logo / Mascote */}
        <NavLink to="/" className="navbar-brand" onClick={fecharMenu}>
          <img 
            src="/logo.png" 
            alt="Logo Eletricitrus" 
            className="navbar-logo-img" 
          />
          <span className="navbar-title">Eletri<span className="highlight">citrus</span></span>
        </NavLink>

        {/* Botão Hambúrguer para Mobile */}
        <button 
          className={`hamburger ${menuAberto ? 'is-active' : ''}`}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links do Menu */}
        <nav className={`navbar-links ${menuAberto ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={fecharMenu}>Início</NavLink>
          <NavLink to="/calculadora" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={fecharMenu}>Calculadora</NavLink>
          
          {/* Menu Híbrido: Fazendas Solares */}
          <div className="dropdown-container-split" style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/fazendas" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={fecharMenu}>
              Fazendas Solares
            </NavLink>
            
            <div className="dropdown" onMouseLeave={() => setDropdownAberto(false)} style={{ marginLeft: '4px' }}>
              <span 
                className="dropdown-toggle" 
                onClick={() => setDropdownAberto(!dropdownAberto)}
                style={{ cursor: 'pointer', padding: '0.3rem', color: '#FBF7EE' }}
              >
                ▾
              </span>
              <ul className={`dropdown-menu ${dropdownAberto ? 'show' : ''}`}>
                <li><span style={{ fontSize: '0.8rem', color: '#D9A441', padding: '0.2rem 1rem', display: 'block' }}>Parceiros:</span></li>
                <li><NavLink to="/partners/sunmobi" className="nav-item" onClick={fecharMenu}>SunMobi</NavLink></li>
                <li><NavLink to="/partners/enerlivre" className="nav-item" onClick={fecharMenu}>Enerlivre</NavLink></li>
                <li><NavLink to="/partners/evosolar" className="nav-item" onClick={fecharMenu}>EvoSolar</NavLink></li>
                <li><NavLink to="/partners/edp" className="nav-item" onClick={fecharMenu}>EDP Soluções</NavLink></li>
              </ul>
            </div>
          </div>
          
          {/* Menu Híbrido: Placas Solares */}
          <div className="dropdown-container-split" style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/placas" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={fecharMenu}>
              Placas Solares
            </NavLink>
            
            <div className="dropdown" onMouseLeave={() => setDropdownAbertoPlacas(false)} style={{ marginLeft: '4px' }}>
              <span 
                className="dropdown-toggle" 
                onClick={() => setDropdownAbertoPlacas(!dropdownAbertoPlacas)}
                style={{ cursor: 'pointer', padding: '0.3rem', color: '#FBF7EE' }}
              >
                ▾
              </span>
              <ul className={`dropdown-menu ${dropdownAbertoPlacas ? 'show' : ''}`}>
                <li><span style={{ fontSize: '0.8rem', color: '#D9A441', padding: '0.2rem 1rem', display: 'block' }}>Categorias:</span></li>
                <li><NavLink to="/servicetypes/venda" className="nav-item" onClick={fecharMenu}>Comprar</NavLink></li>
                <li><NavLink to="/servicetypes/manutencao" className="nav-item" onClick={fecharMenu}>Manutenção</NavLink></li>
                <li><NavLink to="/servicetypes/descarte" className="nav-item" onClick={fecharMenu}>Descarte & Reciclagem</NavLink></li>
              </ul>
            </div>
          </div>

          <NavLink to="/faq" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={fecharMenu}>FAQ</NavLink>
          <NavLink to="/login" className="nav-btn-login" onClick={fecharMenu}>Entrar</NavLink>
        </nav>
      </div>
    </header>
  );
}
