CREATE TABLE rating_tweets (
  tweet_id BIGINT PRIMARY KEY,
  rating DOUBLE PRECISION NOT NULL
);

CREATE SEQUENCE rating_tweets_id_seq START 1;