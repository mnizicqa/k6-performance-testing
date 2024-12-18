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

  http.get("https://test-api.k6.io/my/crocodiles/", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  res = http.post(
    "https://test-api.k6.io/my/crocodiles/",
    JSON.stringify({
      name: "Super Croc",
      sex: "M",
      date_of_birth: "1920-09-13",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  const crocodileId = res.json().id;

  res = http.get(`https://test-api.k6.io/my/crocodiles/${crocodileId}/`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "crocodile id": (r) => r.json().id === crocodileId,
  });
}
