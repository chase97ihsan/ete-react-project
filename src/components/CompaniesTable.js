import { useContext, modalRef, useState, bootstrap } from "react";
import { FaSortDown, FaSortUp, FaSort, FaBootstrap } from "react-icons/fa";
import { CompanyContext } from "../contexts/CompanyContext";
import CompanyAdd from "./CompanyAdd";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CompaniesTable({ head, body, searchable }) {
  const [sorting, setSorting] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData =
    body &&
    body
      .filter((items) =>
        items.some((item) =>
          (item?.key || item)
            .toString()
            .toLocaleLowerCase("TR")
            .includes(search.toLocaleLowerCase("TR"))
        )
      )
      .sort((a, b) => {
        if (sorting?.orderBy === "asc") {
          return (a[sorting.key]?.key || a[sorting.key])
            .toString()
            .localeCompare(b[sorting.key]?.key || b[sorting.key]);
        }
        if (sorting?.orderBy === "desc") {
          return b[sorting.key].toString().localeCompare(a[sorting.key]);
        }
      });

  if (!body || body == {}) {
    return <div className="empty-page">It's empty</div>;
  }

  return (
    <div>
      <div className="create">
        <button
          type="button"
          className="btn btn-primary d-flex"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <h4>Create</h4>{" "}
          <i
            className="fa-solid fa-circle-plus fa-2xl ms-1"
            style={{ marginTop: "18px" }}
          ></i>
        </button>
      </div>

      <div className="container d-flex justify-content-center text-center position-relative">
        <div
          className="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog   "
            style={{
              width: "28rem",
            }}
          >
            <div className="modal-content">
              <div className="modal-header text-center  ">
                <h3
                  className="modal-title text-secondary ms-5 ps-4 "
                  id="staticBackdropLabel"
                >
                  Add a new company
                </h3>
                <button
                  type="button"
                  className="btn-close  mb-4 bg-secondary border-dark  "
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"> {<CompanyAdd />}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="input-group mt-4 mb-2">
        <span className="input-group-text">
          <i className="fas fa-search "></i>
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search in the table"
          className="form-control"
        />
      </div>

      <table className="table table-dark  table-striped">
        <thead className="table-dark border border-info border-3 text-nowrap">
          <tr>
            {head.map((h, key) => (
              <th
                width={h?.width}
                className={h.width ? "col ps-5" : "col"}
                key={key}
              >
                {h.name}
                {h.sortable && (
                  <div className="d-inline ms-1">
                    <button
                      className="btn btn-light"
                      style={{ fontSize: "6px" }}
                      onClick={() => {
                        if (sorting?.key === key) {
                          setSorting({
                            key,
                            orderBy: sorting.orderBy === "asc" ? "desc" : "asc",
                          });
                        } else {
                          setSorting({
                            key,
                            orderBy: "asc",
                          });
                        }
                      }}
                    >
                      {sorting?.key === key &&
                        (sorting.orderBy === "asc" ? (
                          <FaSortDown size={11} />
                        ) : (
                          <FaSortUp size={11} />
                        ))}
                      {sorting?.key !== key && <FaSort size={11} />}
                    </button>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((items, rowIndex) => (
            <tr key={rowIndex}>
              {items.map((item, cellIndex) => (
                <td key={cellIndex}>
                  {Array.isArray(item) ? (
                    <div className="btn-group gap-1 text-nowrap">{item}</div>
                  ) : cellIndex === items.length - 2 ? (
                    <a href={items[items.length - 2]} target="_blank">
                      {item}
                    </a>
                  ) : (
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
