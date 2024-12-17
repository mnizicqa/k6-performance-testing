import http from "k6/http";
import { check } from "k6";

const credentials = JSON.stringify({
  username: "test_" + Date.now(),
  password: "secretpass_" + Date.now(),
});

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function () {
  http.post("https://test-api.k6.io/user/register/", credentials, headers);

  let res = http.post(
    "https://test-api.k6.io/auth/token/login/",
    credentials,
    headers
  );

  const accessToken = res.json().access;
  console.log(accessToken);
}
