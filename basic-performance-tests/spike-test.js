import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    {
      duration: "1m",
      target: 5000,
    },
    {
      duration: "30s",
      target: 0,
    },
  ],
};

export default () => {
  http.get("https://test.k6.io");
  sleep(1);
};
