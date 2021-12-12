import type { ValidationError } from "joi";

export function handleError(error: ValidationError) {
  console.error(error);
  throw error;
}
