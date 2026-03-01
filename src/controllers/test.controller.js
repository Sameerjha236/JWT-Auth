import { getTestMessage } from "../services/test.service.js";

export function testController(req, res) {
  const message = getTestMessage();
  res.send({ message });
}
