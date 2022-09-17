import { createHash } from "crypto";

export const hash = (str: string) => createHash("sha256").update(str).digest("hex");
