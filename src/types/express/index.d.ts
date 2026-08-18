declare namespace Express {
  export interface Request {
    firebaseUserId?: string;
    /**
     * Populated by the Google Cloud Functions Framework, which buffers the
     * entire request body (including multipart bodies) before handing the
     * request to the Express app. See UploadFileMiddleware.
     */
    rawBody?: Buffer;
  }
}
