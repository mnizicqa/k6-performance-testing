import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus:1,
  duration: "10s",
  cloud: {
    projectID: 3731474
  }
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
