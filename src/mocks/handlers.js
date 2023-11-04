import companiesData from "./companiesData";
import productsData from "./productsData";
import { http, HttpResponse } from "msw";
import credentials from "./credentials";

function authenticator(re) {
  const { Authorization } = re.headers;
  const { mockToken } = credentials;

  if (
    Authorization === mockToken ||
    localStorage.getItem("mockToken") === localStorage.getItem("token")
  ) {
    return true;
  } else {
    return false;
  }
}

export const handlers = [
  http.post("http://localhost:9000/auth/register", async ({ request }) => {
    console.log(request);
    let newUser = await request.json();
    newUser = {
      ["id"]: credentials.users.length + 1,
      ...newUser,
    };
    credentials.users.push(newUser);

    return HttpResponse.json(credentials.users);
  }),

  http.post("http://localhost:9000/auth/login", async ({ request }) => {
    let newRequest = await request.json();
    console.log(newRequest);
    const userToken = credentials.createToken(50);
    credentials.mockToken = userToken;
    localStorage.setItem("mockToken", credentials.mockToken);
    let validUser = credentials.users.filter(
      (u) => u.email === newRequest.email && newRequest.password === u.password
    );

    if (validUser.length > 0) {
      return HttpResponse.json({ token: userToken });
    } else {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Incorrect email / password combination.",
      });
    }
  }),
  // Intercept the "GET /resource" request.
  http.post("http://localhost:9000/company/", ({ request }) => {
    console.log(request);

    return HttpResponse.json(companiesData.getAll());

    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
  }),
  http.get("http://localhost:9000/products/", () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return HttpResponse.json(productsData.getAll());
  }),
];
