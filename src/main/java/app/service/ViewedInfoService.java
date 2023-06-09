package app.service;

import app.model.ViewedInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class ViewedInfoService extends GeneralService<ViewedInfo>{
    public void add(Long tweetId, HttpServletRequest request){}
    public Integer coutViews(Long tweetId){
        int count = 2;
        return count;
    }
}
