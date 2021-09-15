import { Response, Request } from "express";

export const check = (_req: Request, res: Response) => {
  res.status(200).send({ status: "ok" });
};
