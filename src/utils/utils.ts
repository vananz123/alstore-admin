import { AxiosError, HttpStatusCode, isAxiosError } from "axios";

export function isAxiosBadRequestError<BadRequestError>(
    error: unknown,
  ): error is AxiosError<BadRequestError> {
    return (
      isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
    );
  }
  
  export function isAxiosUnauthoriedError<UnauthoriedError>(
    error: unknown,
  ): error is AxiosError<UnauthoriedError> {
    return (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    );
  }