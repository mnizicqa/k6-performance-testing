import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("https://self-signed.badssl.com/");
  sleep(1);
}
