import companiesData from "./companiesData";
import productsData from "./productsData";
import { http, HttpResponse } from "msw";
import credentials from "./credentials";

function authenticator() {
  const mockToken = localStorage.getItem("mockToken"); // => Sayfa render edilse dahi localStorage dan ulaşılabilen backToken.(Token eşleştirme için)
  const decodedToken = atob(mockToken);
  let userToken = JSON.parse(localStorage.getItem("Token")).token; // => Login olan userın Local storage de tuttuğu token değeri
  if (decodedToken.length > 0 && userToken.length > 0) {
    if (decodedToken === userToken) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function register(newUser) {
  const existingMember = credentials.users.find(
    (m) => m.email === newUser.email
  );
  if (existingMember === undefined) {
    newUser = {
      ["id"]: credentials.users.length + 1,
      ...newUser,
    };
    credentials.users.push(newUser);
    return HttpResponse.json(true);
  } else {
    return new HttpResponse(null, {
      status: 409,
      statusText: "Incorrect email / password combination.",
    });
  }
}

function logIn(validUser) {
  let isValidUser = credentials.users.filter(
    //Kullanıcı üye mi?
    (u) => u.email === validUser.email && validUser.password === u.password
  );

  if (isValidUser && isValidUser.length > 0) {
    const userToken = credentials.createToken(50); // Token yaratma
    const encodedToken = btoa(userToken);
    localStorage.setItem("mockToken", encodedToken);
    return HttpResponse.json({ token: userToken });
  } else if (isValidUser && isValidUser.length == 0) {
    return new HttpResponse(null, {
      status: 401,
      statusText: "Unregistered user Incorrect email / password combination.",
    });
  }
}

function logOut() {
  if (localStorage.getItem("mockToken")) {
    return localStorage.removeItem("mockToken");
  }
}

export const handlers = [
  http.post("http://localhost:3000/auth/register", async ({ request }) => {
    let newUser = await request.json();
    const response = await register(newUser);
    return response;
  }),

  http.post("http://localhost:3000/auth/login", async ({ request }) => {
    let newRequest = await request.json();
    const response = await logIn(newRequest);
    return response;
  }),

  http.post("http://localhost:3000/auth/logout", () => {
    if (authenticator()) {
      logOut();
      return new HttpResponse(null, {
        status: 200,
        statusText: "Logout successful",
      });
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.get("http://localhost:3000/company/", () => {
    if (authenticator()) {
      return HttpResponse.json(companiesData.getAllCompanies());
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.post("http://localhost:3000/company/create", async ({ request }) => {
    let newRequest = await request.json();
    if (authenticator()) {
      return HttpResponse.json(companiesData.create(newRequest));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.delete("http://localhost:3000/company/:id", ({ params }) => {
    if (authenticator()) {
      return HttpResponse.json(companiesData.deleteById(params.id));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.put("http://localhost:3000/company/:id", async ({ request, params }) => {
    let newRequest = await request.json();
    if (authenticator()) {
      return HttpResponse.json(companiesData.updateById(params.id, newRequest));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.get("http://localhost:3000/products/", () => {
    if (authenticator()) {
      return HttpResponse.json(productsData.getAll());
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.post("http://localhost:3000/product/create", async ({ request }) => {
    let newRequest = await request.json();
    if (authenticator()) {
      return HttpResponse.json(productsData.create(newRequest));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.delete("http://localhost:3000/product/:id", ({ params }) => {
    if (authenticator()) {
      return HttpResponse.json(productsData.deleteById(params.id));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),

  http.put("http://localhost:3000/product/:id", async ({ request, params }) => {
    let newRequest = await request.json();
    if (authenticator()) {
      return HttpResponse.json(productsData.updateById(params.id, newRequest));
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  }),
];
