export function Header(props) {
  return (
    <div
      className="m-0 mx-2 m-sm-2 pt-2 d-flex flex-row justify-content-between align-items-center"
      id="header"
    >
      <img src="/img/logo128.png" height="35" alt="Sudoclue logo"/>
      <h5 className="fw-bold m-0 text-center">SUDO-CLUE ADMIN</h5>
      <div className="d-flex flex-row" onClick={()=>props.logout()}>
        <i className="bi bi-box-arrow-right"></i>
      </div>
    </div>
  );
}
