import NavBar from "./NavBar"

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1692px', height: '62px' }}>
      <h1  style={{ margin: '0', marginLeft: '20px', marginTop: '20px', fontSize: '48px' }}>Bite and Blog</h1>
      <NavBar style={{ flex: '0 0 auto' }} />
    </header>
  );
}

export default Header;
