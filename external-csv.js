import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const userCredentials = new SharedArray("Users With Credentials", function () {
  return papaparse.parse(open("./users.csv"), { header: true }).data;
});

export default function () {
  userCredentials.forEach((item) => console.log(item.username));
}
