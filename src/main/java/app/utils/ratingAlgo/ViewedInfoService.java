package app.utils.ratingAlgo;

import app.model.Tweet;
import app.service.UserModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class ViewedInfoService {
  private ViewedPersonInfoRepository viewedPersonInfoRepository;

  public boolean addView(Tweet tweet, HttpServletRequest request){
    request.getRemoteAddr();
    ViewedPersonInfo viewedPersonInfo = new ViewedPersonInfo();
    viewedPersonInfo.setTweet(tweet);
    if (request.getAttribute("userId") != null) viewedPersonInfo.setUserId((Long) request.getAttribute("userId"));
    else viewedPersonInfo.setPersonIp(request.getRemoteAddr());
    System.out.println(viewedPersonInfo);
    viewedPersonInfoRepository.save(viewedPersonInfo);
    return true;
  }
}
