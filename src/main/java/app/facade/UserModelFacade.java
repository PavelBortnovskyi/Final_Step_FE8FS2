package app.facade;

import app.dto.rq.UserModelRequest;
import app.dto.rs.UserModelResponse;
import app.model.UserModel;

import javax.annotation.PostConstruct;

public class UserModelFacade extends GeneralFacade<UserModel, UserModelRequest, UserModelResponse> {
    @PostConstruct
    public void init() {
        super.getMm().typeMap(UserModel.class, UserModelResponse.class)
                .addMapping(src -> src.getFollowers().size(), UserModelResponse::setCountUserFollowers)
                .addMapping(src -> src.getFollowing().size(), UserModelResponse::setCountUserFollowings);
    }
}
