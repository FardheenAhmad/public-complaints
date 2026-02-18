import { useState, useEffect } from "react";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";

const ADMIN_PASSWORD = "Mahesh@1976";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [pass, setPass] = useState("");

  const reload = () => setRefresh(!refresh);

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setAdmin(true);
    }
  }, []);

  const unlockAdmin = () => {
    if (pass === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      setAdmin(true);
    } else {
      alert("Wrong password");
    }
  };

  const exitAdmin = () => {
    localStorage.removeItem("role");
    setAdmin(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>
        Complaint Portal
      </h1>

      {/* ADMIN BAR */}
      <div className="adminbar">
        {!admin ? (
          <>
            <input
              type="password"
              placeholder="Admin password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button onClick={unlockAdmin}>Admin Login</button>
          </>
        ) : (
          <>
            <span>Admin Mode Enabled</span>
            <button onClick={exitAdmin}>Exit Admin</button>
          </>
        )}
      </div>

      <ComplaintForm
        onSaved={() => {
          setEditing(null);
          reload();
        }}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      <ComplaintList
        refresh={refresh}
        onEdit={(item) => setEditing(item)}
      />

      <style>{`
        .adminbar {
          display:flex;
          gap:10px;
          align-items:center;
          background:#f1f5f9;
          padding:12px;
          border-radius:10px;
          margin-bottom:20px;
        }

        .adminbar input {
          padding:7px;
          border-radius:6px;
          border:1px solid #ccc;
        }

        .adminbar button {
          padding:7px 14px;
          border:none;
          background:#2563eb;
          color:white;
          border-radius:6px;
          cursor:pointer;
        }

        .adminbar span {
          color:#16a34a;
          font-weight:600;
        }
      `}</style>
    </div>
  );
}

export default App;
