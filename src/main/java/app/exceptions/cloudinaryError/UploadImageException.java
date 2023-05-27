package app.exceptions.cloudinaryError;

import app.exceptions.httpError.BadRequestException;

public class UploadImageException extends BadRequestException {

  public UploadImageException(String msg) {
    super("Error upload image. " + msg);
  }

}

