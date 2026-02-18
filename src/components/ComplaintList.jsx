import { useEffect, useState } from "react";
import axios from "axios";

const API =
  "https://69959f48b081bc23e9c3db2b.mockapi.io/api/v1/complaints";

function ComplaintList({ refresh, onEdit }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId") || "user_1";

  const load = async () => {
    let url = API;

    if (role !== "admin") {
      url = `${API}?ownerId=${userId}`;
    }

    const res = await axios.get(url);
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  const viewDetails = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    setSelected(res.data);
  };

  return (
    <>
      <div className="card-grid">
        {data.map((c) => (
          <div key={c.id} className="card">
            <div className="top">
              <img src={c.avatar} alt="" />
              <div>
                <h4>{c.name}</h4>
                <p>{c.mobile}</p>
              </div>
            </div>

            <h5>{c.problem}</h5>
            <p className="desc">{c.description}</p>

            <div className="meta">
              {c.location} • {c.pincode}
            </div>

            {role === "admin" && (
              <div className="owner">
                Owner: {c.ownerId}
              </div>
            )}

            <div className="btns">
              <button className="view" onClick={() => viewDetails(c.id)}>
                View
              </button>

              {(role === "admin" || c.ownerId === userId) && (
                <>
                  <button className="edit" onClick={() => onEdit(c)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => remove(c.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal">
          <div className="modal-card">
            <h3>{selected.name}</h3>
            <img src={selected.avatar} alt="" />
            <p><b>Mobile:</b> {selected.mobile}</p>
            <p><b>Location:</b> {selected.location}</p>
            <p><b>Pincode:</b> {selected.pincode}</p>
            <p><b>Problem:</b> {selected.problem}</p>
            <p>{selected.description}</p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        .card-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:16px;
        }

        .card {
          background:white;
          padding:18px;
          border-radius:12px;
          box-shadow:0 3px 14px rgba(0,0,0,0.08);
        }

        .top {
          display:flex;
          gap:10px;
          align-items:center;
          margin-bottom:10px;
        }

        .top img {
          width:42px;
          height:42px;
          border-radius:50%;
        }

        h5 { color:#2563eb; margin:6px 0; }

        .desc { font-size:14px; color:#555; }

        .meta { font-size:12px; color:#777; }

        .owner {
          font-size:11px;
          color:#999;
          margin-top:4px;
        }

        .btns {
          margin-top:10px;
          display:flex;
          gap:6px;
        }

        .btns button {
          flex:1;
          border:none;
          padding:6px;
          border-radius:6px;
          cursor:pointer;
          color:white;
          font-size:12px;
        }

        .view { background:#0ea5e9; }
        .edit { background:#f59e0b; }
        .delete { background:#dc2626; }

        .modal {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .modal-card {
          background:white;
          padding:25px;
          border-radius:12px;
          width:320px;
          text-align:center;
        }

        .modal-card img {
          width:70px;
          border-radius:50%;
          margin:10px 0;
        }

        .modal-card button {
          margin-top:12px;
          padding:8px 16px;
          border:none;
          background:#2563eb;
          color:white;
          border-radius:6px;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}

export default ComplaintList;
