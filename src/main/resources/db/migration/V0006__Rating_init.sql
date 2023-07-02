CREATE SEQUENCE rating_tweets_id_seq START 1;
CREATE TABLE rating_tweets (
  id bigint DEFAULT nextval('rating_tweets_id_seq') NOT NULL,
  created_at timestamp, created_by varchar(255),
  updated_at timestamp,
  updated_by varchar(255),
  tweet_id bigint,
  rating DOUBLE PRECISION NOT NULL,
  primary key (id)

);