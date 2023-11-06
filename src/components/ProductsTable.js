import { useContext, useEffect, useState } from "react";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { ProductContext } from "../contexts/ProductContext";
import ProductAdd from "./ProductAdd";

export default function ProductsTable({ head, body, searchable }) {
  const [sorting, setSorting] = useState(false);
  const [search, setSearch] = useState("");
  const [productModal, setProductModal] = useState(false);

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

  if (!body || body?.length === 0 || body == {}) {
    return <div className="empty-page">It's a empty</div>;
  }

  function toggle() {
    setProductModal(!productModal);
  }

  const closeModal = () => {
    setProductModal(false);
  };

  return (
    <>
      <button
        className="create"
        onClick={() => {
          toggle();
        }}
      >
        <h3>New Product</h3>{" "}
        <div>
          <i
            className="fa-solid fa-circle-plus fa-2xl"
            style={{ marginTop: "23px" }}
          ></i>
        </div>
      </button>
      {productModal && <ProductAdd onClose={closeModal} />}

      {searchable && (
        <div className="search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search in the table"
            className="search-input"
          />
        </div>
      )}
      <div className="table">
        <table>
          <thead>
            <tr>
              {head.map((h, key) => (
                <th width={h?.width} className="table-headers" key={key}>
                  <div className="table-header">
                    {h.name}
                    {h.sortable && (
                      <button
                        onClick={() => {
                          if (sorting?.key === key) {
                            setSorting({
                              key,
                              orderBy:
                                sorting.orderBy === "asc" ? "desc" : "asc",
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
                            <FaSortDown size={14} />
                          ) : (
                            <FaSortUp size={14} />
                          ))}
                        {sorting?.key !== key && <FaSort size={14} />}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((items, key) => (
              <tr key={key}>
                {items.map((item, key) => (
                  <td className="items" key={key}>
                    {Array.isArray(item) ? (
                      <div className="item">{item}</div>
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
    </>
  );
}
