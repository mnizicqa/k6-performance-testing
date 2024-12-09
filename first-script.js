import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
};

export default () => {
  http.get("https://test.k6.io");
  sleep(1);
};
