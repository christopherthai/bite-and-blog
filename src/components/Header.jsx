import NavBar from "./NavBar"
function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: '0' }}>Bite and Blog</h1>
      <NavBar style={{ flex: '0 0 auto' }} />
    </header>
  );
}

export default Header;
