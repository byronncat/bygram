export enum StatusCode {
  // Successful request
  OK = 200,

  // Successful creation
  CREATED = 201,

  // Successful request, no content (after delete a resource)
  NO_CONTENT = 204,

  // Successful request, but the response has not been modified
  NOT_MODIFIED = 304,

  // Invalid request
  BAD_REQUEST = 400,

  // Request without authentication
  UNAUTHORIZED = 401,

  // Request without authorization
  FORBIDDEN = 403,

  // Request with invalid URL
  NOT_FOUND = 404,

  // Request with invalid method
  METHOD_NOT_ALLOWED = 405,

  // Request with conflict
  CONFLICT = 409,

  // Request with resource deleted
  GONE = 410,

  // Request with invalid precondition
  PRECONDITION_FAILED = 412,

  // Request with invalid media type
  UNSUPPORTED_MEDIA_TYPE = 415,

  // Request with invalid data
  UNPROCESSABLE_ENTITY = 422,

  // Request with rate limit exceeded
  TOO_MANY_REQUESTS = 429,

  // Server error
  INTERNAL_SERVER_ERROR = 500,
}
