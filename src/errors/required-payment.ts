import { ApplicationError } from "@/protocols";

export function requiredPaymentError(): ApplicationError {
  return {
    name: "RequiredPaymentError",
    message: "Payment is required",
  };
}
