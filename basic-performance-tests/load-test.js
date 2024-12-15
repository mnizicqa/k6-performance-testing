import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    {
      duration: "20s",
      target: 1000,
    },
    {
      duration: "1m",
      target: 1000,
    },
    {
      duration: "20s",
      target: 0,
    },
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  http.get("https://test.k6.io/contacts.php");
  sleep(2);
  http.get("https://test.k6.io/news.php");
  sleep(2);
}
