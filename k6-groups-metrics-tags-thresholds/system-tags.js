import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    "http_req_duration{status:200}": ["p(95)<1000"],
    "http_req_duration{status:201}": ["p(95)<1000"],
  },
};

export default function () {
  http.get("https://run.mocky.io/v3/10b1f3a5-b3ed-4e2b-be18-50f1c8fe1fed");
  http.get(
    "https://run.mocky.io/v3/5ba1d8dd-9a26-4cf7-8a50-bef3398e8365?mocky-delay=2000ms"
  );
}
