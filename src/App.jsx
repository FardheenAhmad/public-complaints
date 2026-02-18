import { useState } from "react";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Complaint Portal</h1>

      <ComplaintForm onAdded={() => setRefresh(!refresh)} />
      <ComplaintList refresh={refresh} />
    </div>
  );
}

export default App;
