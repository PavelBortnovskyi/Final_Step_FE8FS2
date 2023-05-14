package app.service;

import app.dto.rs.TweetResponse;
import app.model.Tweet;
import app.repository.TweetModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TweetService extends GeneralService<Tweet> {
}
