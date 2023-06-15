CREATE TEMP TABLE inserted_ids (id SERIAL, chat_id bigint);

WITH inserted_rows AS (
  INSERT INTO public.chats (id, created_at, created_by, updated_at, updated_by, initiator_user_id)
  VALUES
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:55.498276', null, TIMESTAMP '2023-06-12 14:34:55.498276', null, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:55.818281', null, TIMESTAMP '2023-06-12 14:34:55.818281', null, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:56.094198', null, TIMESTAMP '2023-06-12 14:34:56.094198', null, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:56.279372', null, TIMESTAMP '2023-06-12 14:34:56.279372', null, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:56.559782', null, TIMESTAMP '2023-06-12 14:34:56.559782', null, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:56.746646', null, TIMESTAMP '2023-06-12 14:34:56.746646', null, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:56.926846', null, TIMESTAMP '2023-06-12 14:34:56.926846', null, 4),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:57.105950', null, TIMESTAMP '2023-06-12 14:34:57.105950', null, 5)
  RETURNING id
)
INSERT INTO inserted_ids (chat_id)
SELECT id
FROM inserted_rows;

DO $$
DECLARE
  chat_id_1 bigint;
  chat_id_2 bigint;
  chat_id_3 bigint;
  chat_id_4 bigint;
  chat_id_5 bigint;
  chat_id_6 bigint;
  chat_id_7 bigint;
  chat_id_8 bigint;
BEGIN
  SELECT chat_id INTO chat_id_1
  FROM inserted_ids
  WHERE id = 1;

  SELECT chat_id INTO chat_id_2
  FROM inserted_ids
  WHERE id = 2;

  SELECT chat_id INTO chat_id_3
  FROM inserted_ids
  WHERE id = 3;

  SELECT chat_id INTO chat_id_4
  FROM inserted_ids
  WHERE id = 4;

  SELECT chat_id INTO chat_id_5
  FROM inserted_ids
  WHERE id = 5;

  SELECT chat_id INTO chat_id_6
  FROM inserted_ids
  WHERE id = 6;

  SELECT chat_id INTO chat_id_7
  FROM inserted_ids
  WHERE id = 7;

  SELECT chat_id INTO chat_id_8
  FROM inserted_ids
  WHERE id = 8;

INSERT INTO public.chats_users (chat_id, user_id)
VALUES
    (chat_id_1, 2),
    (chat_id_2, 3),
    (chat_id_3, 4),
    (chat_id_4, 3),
    (chat_id_5, 5),
    (chat_id_6, 4),
    (chat_id_7, 2),
    (chat_id_8, 1),
    (chat_id_8, 2),
    (chat_id_8, 3),
    (chat_id_8, 4);

INSERT INTO public.messages (id, created_at, created_by, updated_at, updated_by, body, sent_at, chat_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:57.582253', null, TIMESTAMP '2023-06-12 14:34:57.582253', null, 'Hi my friend!', TIMESTAMP '2023-06-12 14:34:57.578355', chat_id_1, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:34:59.749341', null, TIMESTAMP '2023-06-12 14:34:59.749341', null, 'Aloha!', TIMESTAMP '2023-06-12 14:34:59.748442', chat_id_1, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:01.903579', null, TIMESTAMP '2023-06-12 14:35:01.903579', null, 'How are you today?!', TIMESTAMP '2023-06-12 14:35:01.903579', chat_id_1, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:04.223736', null, TIMESTAMP '2023-06-12 14:35:04.223736', null, 'I am fine, thanks!', TIMESTAMP '2023-06-12 14:35:04.223736', chat_id_1, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:06.398560', null, TIMESTAMP '2023-06-12 14:35:06.398560', null, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', TIMESTAMP '2023-06-12 14:35:06.397558', chat_id_1, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:06.534899', null, TIMESTAMP '2023-06-12 14:35:06.534899', null, 'Wake up, Neo!', TIMESTAMP '2023-06-12 14:35:06.534899', chat_id_2, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:08.687871', null, TIMESTAMP '2023-06-12 14:35:08.687871', null, 'Wake up , Matrix has you!', TIMESTAMP '2023-06-12 14:35:08.687063', chat_id_2, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:10.836159', null, TIMESTAMP '2023-06-12 14:35:10.836159', null, 'Follow the white rabbit, Neo', TIMESTAMP '2023-06-12 14:35:10.835334', chat_id_2, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:12.981015', null, TIMESTAMP '2023-06-12 14:35:12.981015', null, 'Again? My Kung-Fu is still more powerfully than yours, go away!', TIMESTAMP '2023-06-12 14:35:12.981015', chat_id_2, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:15.131018', null, TIMESTAMP '2023-06-12 14:35:15.131018', null, 'Booooring...', TIMESTAMP '2023-06-12 14:35:15.130182', chat_id_2, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:15.268750', null, TIMESTAMP '2023-06-12 14:35:15.268750', null, 'Доброго вечора, ми з України!', TIMESTAMP '2023-06-12 14:35:15.268750', chat_id_3, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:17.422037', null, TIMESTAMP '2023-06-12 14:35:17.422037', null, 'https://www.youtube.com/watch?v=BvgNgTPTkSo', TIMESTAMP '2023-06-12 14:35:17.421239', chat_id_3, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:19.572680', null, TIMESTAMP '2023-06-12 14:35:19.572680', null, 'Слава Україні!', TIMESTAMP '2023-06-12 14:35:19.572680', chat_id_3, 4),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:21.741026', null, TIMESTAMP '2023-06-12 14:35:21.741026', null, 'Дратуті!', TIMESTAMP '2023-06-12 14:35:21.740227', chat_id_4, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:23.893897', null, TIMESTAMP '2023-06-12 14:35:23.893897', null, 'І тобі привіт.', TIMESTAMP '2023-06-12 14:35:23.892896', chat_id_4, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:26.042225', null, TIMESTAMP '2023-06-12 14:35:26.042225', null, 'Комарів бойових погодував?', TIMESTAMP '2023-06-12 14:35:26.042225', chat_id_4, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:28.183140', null, TIMESTAMP '2023-06-12 14:35:28.183140', null, 'Качок-перехоплювачів відправив?', TIMESTAMP '2023-06-12 14:35:28.182132', chat_id_4, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:30.327073', null, TIMESTAMP '2023-06-12 14:35:30.327073', null, 'Авжеж!', TIMESTAMP '2023-06-12 14:35:30.327073', chat_id_4, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:30.465689', null, TIMESTAMP '2023-06-12 14:35:30.465689', null, 'こんにちは兄弟！', TIMESTAMP '2023-06-12 14:35:30.465689', chat_id_5, 5),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:32.605350', null, TIMESTAMP '2023-06-12 14:35:32.605350', null, '散歩に行く？', TIMESTAMP '2023-06-12 14:35:32.604542', chat_id_5, 5),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:34.758611', null, TIMESTAMP '2023-06-12 14:35:34.758611', null, 'Haluatko lisää näitä pehmeitä tuoreita pullia?)))', TIMESTAMP '2023-06-12 14:35:34.758611', chat_id_6, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:36.904471', null, TIMESTAMP '2023-06-12 14:35:36.904471', null, 'Kuoren kanssa!', TIMESTAMP '2023-06-12 14:35:36.903663', chat_id_6, 4),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:39.042279', null, TIMESTAMP '2023-06-12 14:35:39.042279', null, 'आज मैंने नोब्स के लिए एक और गाइड लिखी!', TIMESTAMP '2023-06-12 14:35:39.042279', chat_id_7, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:41.191939', null, TIMESTAMP '2023-06-12 14:35:41.191939', null, 'तो आप एक नोब हैं', TIMESTAMP '2023-06-12 14:35:41.191075', chat_id_7, 4),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:43.343356', null, TIMESTAMP '2023-06-12 14:35:43.343356', null, 'Hello everyone!', TIMESTAMP '2023-06-12 14:35:43.343356', chat_id_8, 5),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:45.484775', null, TIMESTAMP '2023-06-12 14:35:45.484775', null, 'Hi!', TIMESTAMP '2023-06-12 14:35:45.483908', chat_id_8, 4),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:47.635958', null, TIMESTAMP '2023-06-12 14:35:47.635958', null, 'Hello!', TIMESTAMP '2023-06-12 14:35:47.635958', chat_id_8, 3),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:49.789339', null, TIMESTAMP '2023-06-12 14:35:49.789339', null, 'Howdy!', TIMESTAMP '2023-06-12 14:35:49.789339', chat_id_8, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:51.935747', null, TIMESTAMP '2023-06-12 14:35:51.935747', null, 'Hail!', TIMESTAMP '2023-06-12 14:35:51.935747', chat_id_8, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:54.087742', null, TIMESTAMP '2023-06-12 14:35:54.087742', null, 'How is project?', TIMESTAMP '2023-06-12 14:35:54.087742', chat_id_8, 1),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:56.237774', null, TIMESTAMP '2023-06-12 14:35:56.237774', null, 'OMG', TIMESTAMP '2023-06-12 14:35:56.237774', chat_id_8, 2),
    (DEFAULT, TIMESTAMP '2023-06-12 14:35:58.383279', null, TIMESTAMP '2023-06-12 14:35:58.383279', null, '#sdf%5658**@@@^', TIMESTAMP '2023-06-12 14:35:58.382308', chat_id_8, 4);
    RETURN;
END $$;