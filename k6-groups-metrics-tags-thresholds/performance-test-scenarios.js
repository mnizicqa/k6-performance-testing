import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95) < 200"],
    http_req_duration: ["max < 2000"],
    http_req_failed: ["rate < 0.1"],
    http_reqs: ["count > 30"],
    http_reqs: ["rate < 5"],
    vus_max: ["value <= 10"],
    checks: ["rate >= 0.99"],
  },
};

export default function () {
  const res = http.get(
    "https://test.k6.io/" + (exec.scenario.iterationInTest === 1 ? "foo" : "")
  );
  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is startpage": (r) =>
      r.body.includes("Collection of simple web-pages"),
  });
  sleep(2);
}
