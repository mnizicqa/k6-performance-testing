import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
  },
};

export default function () {
  http.get("https://run.mocky.io/v3/011d6b25-28c4-4933-b954-50d6c95252ca");
  http.get(
    "https://run.mocky.io/v3/43bd631e-4e09-458d-946c-3c8b08e7dfee?mocky-delay=ms"
  );
}
