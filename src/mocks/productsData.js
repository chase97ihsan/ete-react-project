let productsData;

const resetData = () => {
  productsData = [
    {
      id: 1,
      companyId: 1,
      name: "Amg",
      category: "Vehicle",
      amount: 30000,
      amountUnit: "Piece",
    },
    {
      id: 2,
      companyId: 2,
      name: "Model T",
      category: "Vehicle",
      amount: 70000,
      amountUnit: "Piece",
    },
    {
      id: 3,
      companyId: 3,
      name: "Anadolu",
      category: "Vehicle",
      amount: 15000,
      amountUnit: "Piece",
    },
    {
      id: 4,
      companyId: 4,
      name: "Mountain Bike",
      category: "Light vehicle",
      amount: "8000",
      amountUnit: "Piece",
    },
    {
      id: 5,
      companyId: 5,
      name: "Mustang",
      category: "Vehicle",
      amount: "5500",
      amountUnit: "Piece",
    },
    {
      id: 6,
      companyId: 6,
      name: "Akıncı",
      category: "Military vehicle",
      amount: "85",
      amountUnit: "Piece",
    },
    {
      id: 7,
      companyId: 6,
      name: "Kızıl Elma",
      category: "Military vehicle",
      amount: "1",
      amountUnit: "Piece",
    },
  ];
};

resetData();

const getAll = () => {
  return productsData;
};

const getById = (id) => {
  return productsData.find((d) => d.id === id);
};

const deleteById = (id) => {
  productsData = productsData.filter((c) => c.id != id);
  return productsData;
};

const updateById = (id, product) => {
  if (id !== -1) {
    productsData[id - 1] = product;
  }
  return productsData;
};

const create = (item) => {
  var id = productsData[productsData.length - 1].id + 1;
  var key = "id";
  item = Object.assign({ [key]: id }, item);
  productsData.unshift(item);
  return productsData;
};

module.exports = {
  getAll,
  getById,
  create,
  resetData,
  deleteById,
  updateById,
};
