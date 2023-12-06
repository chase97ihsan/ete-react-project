import productsData from "./productsData";

let companiesdata;

const resetData = () => {
  companiesdata = [
    {
      id: 1,
      name: "Mercedes",
      legalNumber: "DE 21 32 16 97",
      country: "Germany",
      website: "https://www.mercedes-benz.com/tr/",
    },
    {
      id: 2,
      name: "Tesla",
      legalNumber: "US 14 96 88 22",
      country: "United States",
      website: "https://www.tesla.com/tr_tr",
    },
    {
      id: 3,
      name: "Togg",
      legalNumber: "TR 90 44 15 66",
      country: "Türkiye",
      website: "https://ces2023.togg.com.tr/",
    },
    {
      id: 4,
      name: "Bianchi",
      legalNumber: "IT 06 82 15 46",
      country: "Italy",
      website: "https://www.bianchi.com/tr/",
    },
    {
      id: 5,
      name: "Ford",
      legalNumber: "US 14 96 36 78",
      country: "United States",
      website: "https://www.ford.com.tr/",
    },
    {
      id: 6,
      name: "Bayraktar",
      legalNumber: "TR 14 96 88 22",
      country: "Türkiye",
      website: "https://baykartech.com/tr/",
    },
    {
      id: 7,
      name: "Renault",
      legalNumber: "FR 26 11 48 29",
      country: "France",
      website: "https://www.renault.com.tr/",
    },
  ];
};

resetData();

const getAllCompanies = () => {
  return companiesdata;
};

const getById = (id) => {
  return companiesdata.find((d) => d.id === id);
};

const deleteById = (id) => {
  companiesdata = companiesdata.filter((c) => c.id != id);
  productsData.deleteByCompanyId(id);
  return companiesdata;
};

const create = (item) => {
  var key = "id";
  var id;
  if (companiesdata.length === 0) {
    id = 1;
  } else {
    id = companiesdata[companiesdata.length - 1].id + 1;
  }

  item = Object.assign({ [key]: id }, item);
  companiesdata.push(item);
  return companiesdata;
};

const updateById = (id, company) => {
  const index = companiesdata.findIndex((e) => e.id == id);

  if (index !== -1) {
    companiesdata[index] = company;
  }
  return companiesdata;
};

export default {
  getAllCompanies,
  getById,
  create,
  resetData,
  deleteById,
  updateById,
};
