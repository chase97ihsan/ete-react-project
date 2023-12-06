import companiesData from "./companiesData";

let productsData;
const resetData = () => {
  productsData = [
    {
      id: 1,
      companyId: 1,
      name: "Amg",
      category: "Car",
      amount: 30000,
      companyName: "Mercedes",
    },
    {
      id: 2,
      companyId: 2,
      name: "Model T",
      category: "Car  (Electric)",
      amount: 70000,
      companyName: "Tesla",
    },
    {
      id: 3,
      companyId: 3,
      name: "Anadolu",
      category: "Car  (Electric)",
      amount: 15000,
      companyName: "Togg",
    },
    {
      id: 4,
      companyId: 4,
      name: "Mountain Bike",
      category: "Bicycle",
      amount: "8000",
      companyName: "Bianchi",
    },
    {
      id: 5,
      companyId: 5,
      name: "Mustang",
      category: "Car",
      amount: "38000",
      companyName: "Ford",
    },
    {
      id: 6,
      companyId: 6,
      name: "Akıncı",
      category: "Military vehicle",
      amount: "85",
      companyName: "Bayraktar",
    },
    {
      id: 7,
      companyId: 6,
      name: "Kızıl Elma",
      category: "Military vehicle",
      amount: "1",
      companyName: "Bayraktar",
    },
    {
      id: 8,
      companyId: 7,
      name: "Clio E-tech",
      category: "Car (hybrid)",
      amount: "55000",
      companyName: "Renault",
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

const deleteByCompanyId = (id) => {
  productsData = productsData.filter((c) => c.companyId != id);
  console.log(productsData);
  return productsData;
};

const updateById = (id, product) => {
  const index = productsData.findIndex((e) => e.id == id);
  if (index !== -1) {
    productsData[index] = product;
  }
  return productsData;
};

const findCompany = (item) => {
  var company;
  var companyName;
  company = companiesData
    .getAllCompanies()
    .find((c) => c.id == Number(item.companyId));
  if (company == undefined || company == null) {
    companyName = "No Company";
  } else {
    companyName = company.name;
  }

  return companyName;
};

const create = (item) => {
  var key = "id";
  var id;
  if (productsData.length === 0) {
    id = 1;
  } else {
    id = productsData[productsData.length - 1].id + 1;
  }
  item.companyName = findCompany(item);
  item = Object.assign({ [key]: id }, item);
  productsData.push(item);
  return productsData;
};

export default {
  getAll,
  getById,
  create,
  resetData,
  deleteById,
  updateById,
  deleteByCompanyId,
};
