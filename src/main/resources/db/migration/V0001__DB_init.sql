CREATE SEQUENCE attachment_images_id_seq START 1;
CREATE SEQUENCE chats_id_seq START 1;
CREATE SEQUENCE messages_id_seq START 1;
CREATE SEQUENCE notifications_id_seq START 1;
CREATE SEQUENCE tweet_actions_id_seq START 1;
CREATE SEQUENCE tweets_id_seq START 1;
CREATE SEQUENCE users_id_seq START 1;

create table attachment_images (
             id bigint DEFAULT nextval('attachment_images_id_seq') NOT NULL,
             created_at timestamp, created_by varchar(255),
             updated_at timestamp,
             updated_by varchar(255),
             img_url varchar(255),
             tweet_id bigint,
             primary key (id)
);

create table chats (
             id bigint DEFAULT nextval('chats_id_seq') NOT NULL,
             created_at timestamp, created_by varchar(255),
             updated_at timestamp, updated_by varchar(255),
             initiator_user_id bigint, primary key (id)
);

create table chats_users (
             chat_id bigint not null,
             user_id bigint not null,
             primary key (chat_id, user_id)
);

create table followers (
             follower_id bigint not null,
             followed_id bigint not null,
             primary key (followed_id, follower_id)
);

create table messages (
             id bigint DEFAULT nextval('messages_id_seq') NOT NULL,
             created_at timestamp, created_by varchar(255),
             updated_at timestamp, updated_by varchar(255),
             body varchar(2048),
             sent_at timestamp,
             chat_id bigint,
             user_id bigint,
             primary key (id)
);

create table notifications (
             id bigint DEFAULT nextval('notifications_id_seq') NOT NULL,
             created_at timestamp,
             created_by varchar(255),
             updated_at timestamp,
             updated_by varchar(255),
             is_read boolean not null,
             notification_type varchar(255) not null,
             initiator_id bigint, receiver_id bigint,
             tweet_id bigint,
             primary key (id)
);

create table tweet_actions (
             id bigint DEFAULT nextval('tweet_actions_id_seq') NOT NULL,
             created_at timestamp,
             created_by varchar(255),
             updated_at timestamp,
             updated_by varchar(255),
             action_type varchar(255),
             tweet_id bigint,
             user_id bigint,
             primary key (id)
);

create table tweets (
             id bigint DEFAULT nextval('tweets_id_seq') NOT NULL,
             created_at timestamp,
             created_by varchar(255),
             updated_at timestamp,
             updated_by varchar(255),
             body varchar(2048),
             tweet_type varchar(255) not null,
             parent_tweet bigint,
             user_id bigint,
             rating_model_id bigint,
             primary key (id)
);

create table users (
             id bigint DEFAULT nextval('users_id_seq') NOT NULL,
             created_at timestamp,
             created_by varchar(255),
             updated_at timestamp,
             updated_by varchar(255),
             avatar_img_url varchar(255),
             bio varchar(255),
             date_of_birth date,
             email varchar(255) not null,
             full_name varchar(255) not null,
             header_img_url varchar(255),
             is_verified boolean not null,
             location varchar(255),
             password varchar(255) not null,
             refresh_token varchar(255),
             token_used boolean,
             user_tag varchar(255) not null,
             primary key (id)
);

alter table users add constraint UK_user_mail unique (email);

alter table users add constraint UK_user_tag unique (user_tag);

alter table attachment_images add constraint FK_images_tweet_id foreign key (tweet_id) references tweets;

alter table chats add constraint FK_chat_initiator_user_id foreign key (initiator_user_id) references users;

alter table chats_users add constraint FK_user_id foreign key (user_id) references users;

alter table chats_users add constraint FK_chat_id foreign key (chat_id) references chats;

alter table followers add constraint FK_followed_user_id foreign key (followed_id) references users;

alter table followers add constraint FK_follower_user_id foreign key (follower_id) references users;

alter table messages add constraint FK_message_chat_id foreign key (chat_id) references chats;

alter table messages add constraint FK_author_user_id foreign key (user_id) references users;

alter table notifications add constraint FK_notification_initiator_user_id foreign key (initiator_id) references users;

alter table notifications add constraint FK_notification_receiver_user_id foreign key (receiver_id) references users;

alter table notifications add constraint FK_notifications_tweet_id foreign key (tweet_id) references tweets on delete cascade;

alter table tweet_actions add constraint FK_actions_tweet_id foreign key (tweet_id) references tweets on delete cascade;

alter table tweet_actions add constraint FK_action_user_id foreign key (user_id) references users;

alter table tweets add constraint FK_parent_tweet foreign key (parent_tweet) references tweets;

alter table tweets add constraint FK_tweet_user_id foreign key (user_id) references users;