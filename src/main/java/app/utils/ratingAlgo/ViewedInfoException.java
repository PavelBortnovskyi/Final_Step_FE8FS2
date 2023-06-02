package app.utils.ratingAlgo;

import app.exceptions.httpError.BadRequestException;

public class ViewedInfoException extends BadRequestException {
  public ViewedInfoException() {

    super("Viewed info already saved");
  }

}
