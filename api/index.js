import { handleRequest } from "./nativeApp.js";

export default function handler(req, res) {
  return handleRequest(req, res);
}
