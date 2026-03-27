import Navbar from "./helper/navbar";

export default function BibliothequePage() {
  const gradient: React.CSSProperties = {
    height: "100vh",
    background: "linear-gradient(180deg, #12171a 60%, #4c0303 100%)",
    overflowX: "hidden",
    overflowY: "hidden"
  };
  const sidebar: React.CSSProperties = {
    height:"100vh",
    background: "#24282f",
    overflowY: "scroll"
  };
  return (
    <div style={gradient}>
      <Navbar></Navbar>
      <div className="container-fluid"></div>

      <div className="row">
        <div className="col-2 text-center text-white" style={sidebar}>
          <p>test</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
          <p>test2</p>
        </div>

        <div className="col-10 text-white justify-content-center d-flex">
          <p>test3</p>
        </div>
      </div>
    </div>
  );
}
