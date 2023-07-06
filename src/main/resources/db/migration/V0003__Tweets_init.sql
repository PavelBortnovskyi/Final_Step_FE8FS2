INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.138204', null, TIMESTAMP '2023-05-30 18:45:31.138204', null, 'Вчора відвідав виставку фотографій. Талановитість безмежна!', 'TWEET', null, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.392204', null, TIMESTAMP '2023-05-30 18:45:31.392204', null, 'Nature is the best artist!', 'TWEET', null, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.537203', null, TIMESTAMP '2023-05-30 18:45:31.537203', null, 'Як вам ландшафтний дизайн?))', 'TWEET', null, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.608534', null, TIMESTAMP '2023-05-30 18:45:32.608534', null, 'Kyiv! #Ukraine', 'QUOTE_TWEET', 1, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.880577', null, TIMESTAMP '2023-05-30 18:45:32.880577', null, 'Want to join you!', 'REPLY', 1, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.198836', null, TIMESTAMP '2023-05-30 18:45:33.198836', null, 'Just look at this!', 'RETWEET', 1, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.485369', null, TIMESTAMP '2023-05-30 18:45:33.485369', null, 'Love this castles!', 'QUOTE_TWEET', 2, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.760847', null, TIMESTAMP '2023-05-30 18:45:33.760847', null, 'In Italy there is the highest mountain in Europe - Mont Blanc (a "white mountain"). This peak is located on the border between France and Germany in the Western Alps. There are only three active volcanoes In Europe: Etna, Stromboli and Vesuvius. All of them are located in south part of Italy. Moreover, Etna is the most active volcano in the world.  More than 40 million tourists visit Italy annually and the country is on the 4th place in the world according to this statistics. There are more than 3,000 museums throughout the country. The cello, the violin and the piano were invented there. The place is unique because on streetы there are no any homeless animals and orphanages in the country. There are two dwarfish states on its territory. The Italians are wine fans - the average resident of Italy drinks more than 26 liters of wine every year. The average life expectancy of the locals is 79.5 years.', 'REPLY', 2, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.988499', null, TIMESTAMP '2023-05-30 18:45:33.988499', null, 'Nice!', 'RETWEET', 2, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.300531', null, TIMESTAMP '2023-05-30 18:45:34.300531', null, 'Love this colours!', 'QUOTE_TWEET', 4, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.529247', null, TIMESTAMP '2023-05-30 18:45:34.529247', null, 'Tell me more about this!', 'REPLY', 4, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.785908', null, TIMESTAMP '2023-05-30 18:45:34.785908', null, 'Saved)', 'RETWEET', 4, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.065689', null, TIMESTAMP '2023-05-30 18:45:35.065689', null, 'My beautifull country! Forward to victory! #StandWithUkraine', 'TWEET', null, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.344603', null, TIMESTAMP '2023-05-30 18:45:35.344603', null, 'Just booked tickets for an upcoming music festival. Cant wait to dance all night! #FestivalGoer', 'TWEET', null, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.734986', null, TIMESTAMP '2023-05-30 18:45:35.734986', null, 'Cant wait for the weekend! Planning a road trip with friends. #AdventureAwaits', 'TWEET', null, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.932016', null, TIMESTAMP '2023-05-30 18:45:35.932016', null, 'Had an amazing time exploring a new hiking trail today. Nature is breathtaking! #OutdoorAdventures', 'TWEET', null, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.126192', null, TIMESTAMP '2023-05-30 18:45:36.126192', null, 'Запланував невелику екскурсію на вихідні. Трохи пригод і нових вражень!', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.356653', null, TIMESTAMP '2023-05-30 18:45:36.356653', null, 'Сьогодні провів весь день на природі. Так спокійно і красиво!', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.628961', null, TIMESTAMP '2023-05-30 18:45:36.628961', null, 'Подорожуючи, відкрив для себе нові країни та культури. Світ такий дивовижний!', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.969894', null, TIMESTAMP '2023-05-30 18:45:36.969894', null, 'Вчора відвідав технологічну конференцію. Багато нової інформації!', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:37.196665', null, TIMESTAMP '2023-05-30 18:45:37.196665', null, 'Гарний краєвид! Але дуже недоречно сіли аккумулятори у коптері, тоже не зміг зафіксувати все те що хотів. Тількі у клітинах мозку залишилося)', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:37.422815', null, TIMESTAMP '2023-05-30 18:45:37.422815', null, 'Завітав до бабусі. Дуже скучив за нею.', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:37.645847', null, TIMESTAMP '2023-05-30 18:45:37.645847', null, 'Пасторальна картина, так би і залишився...', 'TWEET', null, 5),
    (DEFAULT, TIMESTAMP '2023-07-05 11:48:58.441442', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 11:48:58.441442', 'keller.a@ukr.net', 'Привіт, це мій перший твіт.', 'TWEET', null, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 11:51:06.034315', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:51:06.034315', 'bortnovskyi.pavlo@gmail.com', 'Завжди захоплювала краса цих металевих пташок. Але сумно що зазвичай людство створює такі речі для винищення собі подібних...', 'TWEET', null, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 11:52:34.964303', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:52:34.964303', 'bortnovskyi.pavlo@gmail.com', 'SCI-FI worlds beauty', 'TWEET', null, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 11:55:00.182298', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:55:00.182298', 'bortnovskyi.pavlo@gmail.com', 'Open space attraction)', 'TWEET', null, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 11:56:46.060389', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:56:46.060389', 'bortnovskyi.pavlo@gmail.com', 'Що нас чекає за горизонтом?)', 'TWEET', null, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 11:58:31.998713', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:58:31.998713', 'bortnovskyi.pavlo@gmail.com', 'Вітаю у нашому застосунку!', 'REPLY', 24, 6);

    SELECT setval('public.tweets_id_seq', 39, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 12:36:53.436178', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 12:36:53.436178', 'art.shev00@gmail.com', '', 'TWEET', null, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 12:37:21.294648', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 12:37:21.294648', 'art.shev00@gmail.com', '', 'TWEET', null, 8);

    SELECT setval('public.tweets_id_seq', 43, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:37:07.726130', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 13:37:07.726130', 'valanir.work@gmail.com', 'Welcone to twitter😊', 'TWEET', null, 10),
    (DEFAULT, TIMESTAMP '2023-07-05 13:39:39.581504', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:39:39.581504', 'art.shev00@gmail.com', 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users via ransomware; or interrupting normal business processes', 'TWEET', null, 8);

    SELECT setval('public.tweets_id_seq', 47, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:42:54.562898', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:42:54.562898', 'art.shev00@gmail.com', 'Ransomware is a type of malicious software or malware. It encrypts a victim''s data, after which the attacker demands a ransom. Once the ransom is paid, the attacker sends a decryption key to restore access to the victim''s data. The ransom can range from a few hundred dollars to millions of dollars. Typically, payment is demanded in the form of a cryptocurrency, such as bitcoins.', 'REPLY', 45, 8);

     SELECT setval('public.tweets_id_seq', 49, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:43:50.409197', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:43:50.409197', 'art.shev00@gmail.com', '', 'REPLY', 45, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 13:50:28.141601', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 13:50:28.141601', 'valanir.work@gmail.com', 'Дав угла на бричці', 'TWEET', null, 10);

    SELECT setval('public.tweets_id_seq', 52, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:51:56.539001', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 13:51:56.539001', 'budanovKiril@gmail.com', 'Хлопчику, ти тут будеш мені розповідати про секретність ?😐 Не сміши людей', 'REPLY', 45, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 13:56:24.888760', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:56:24.888760', 'bortnovskyi.pavlo@gmail.com', 'Ассоціації з картинкою)', 'REPLY', 45, 6);

     SELECT setval('public.tweets_id_seq', 55, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:59:12.254490', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:59:12.254490', 'bortnovskyi.pavlo@gmail.com', 'Топ коммент)', 'REPLY', 53, 6);

     SELECT setval('public.tweets_id_seq', 57, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:02:15.751357', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:02:15.751357', 'budanovKiril@gmail.com', 'Мені здається ти хочеш запропонувати офер шановним чоловікам які зробили цей сайт😑😑😑', 'TWEET', null, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 14:13:11.237200', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:13:11.237200', 'budanovKiril@gmail.com', 'З бородою норм чи нє ? ', 'TWEET', null, 11);

    SELECT setval('public.tweets_id_seq', 60, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:16:38.163060', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 14:16:38.163060', 'valanir.work@gmail.com', 'До захисту залишилося 2 години, надіюсь сервер не впаде', 'TWEET', null, 10);

    SELECT setval('public.tweets_id_seq', 62, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:20:11.717704', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:20:11.717704', 'Joe@gmail.com', 'Дивись, в мене там є хлопці розумні, програмісти, треба їх пристроїти кудись, вони тобі і віндовс поставлять і принтер полагодять якщо треба, а я тобі за це F16 декілька привезу🫡', 'TWEET', null, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:26:04.046866', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:26:04.046866', 'Joe@gmail.com', 'Думаю купити франшизу і в нас АТБ відкрити', 'TWEET', null, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:30:56.247051', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:30:56.247051', 'Joe@gmail.com', 'Хочеш покажу як абрамс стріляє ?', 'TWEET', null, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:33:11.320091', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:33:11.320091', 'Joe@gmail.com', 'Кирилко, ну такий файний хлопчина був, воно тобі треба ? ', 'REPLY', 59, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:33:36.336981', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:33:36.336981', 'Joe@gmail.com', 'Хочеш покажу ?', 'REPLY', 28, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:52.396823', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:52.396823', 'Joe@gmail.com', 'А шо тут натискати? ', 'REPLY', 44, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:53.772600', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:34:53.772600', 'bortnovskyi.pavlo@gmail.com', 'Звісно)', 'REPLY', 67, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:10.041880', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:10.041880', 'keller.a@ukr.net', '', 'RETWEET', 63, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:13.616435', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:13.616435', 'keller.a@ukr.net', '', 'RETWEET', 65, 7);

     SELECT setval('public.tweets_id_seq', 72, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:46:01.504311', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:46:01.504311', 'panroman@gmail.com', 'Закінчив курси розробника і програмного забезпечення, буду пробував якось помаленько, з Божою поміччю пропхатися туда в то ото айті', 'TWEET', null, 13);

    SELECT setval('public.tweets_id_seq', 74, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:49:26.815850', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:49:26.815850', 'keller.a@ukr.net', '😀😂', 'REPLY', 58, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:50:34.563338', 'poplavok@gmail.com', TIMESTAMP '2023-07-05 14:50:34.563338', 'poplavok@gmail.com', 'Кому забацати корпоратив?', 'TWEET', null, 15),
    (DEFAULT, TIMESTAMP '2023-07-05 14:50:42.256213', 'poplavok@gmail.com', TIMESTAMP '2023-07-05 14:50:42.256213', 'poplavok@gmail.com', 'Кропива ти моя кропива', 'TWEET', null, 15),
    (DEFAULT, TIMESTAMP '2023-07-05 14:51:20.969954', 'poplavok@gmail.com', TIMESTAMP '2023-07-05 14:51:20.969954', 'poplavok@gmail.com', 'Юний орел. ти йди від джерел до джерел', 'TWEET', null, 15),
    (DEFAULT, TIMESTAMP '2023-07-05 14:51:35.291724', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:51:35.291724', 'keller.a@ukr.net', 'Не "надіюсь", а "сподіваюсь"', 'REPLY', 61, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:54:47.820348', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:54:47.820348', 'panroman@gmail.com', 'Ну я їм кажу, мені вже шістдєсять років, оформляйте зразу на сіньйора', 'TWEET', null, 13),
    (DEFAULT, TIMESTAMP '2023-07-05 14:55:35.117352', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:55:35.117352', 'panroman@gmail.com', 'Я перепрошую шановний, ти знаєш хто її чоловік ? ', 'REPLY', 65, 13),
    (DEFAULT, TIMESTAMP '2023-07-05 14:57:36.731156', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:57:36.731156', 'panroman@gmail.com', 'Пане Кирило, при всій повазі, але вас так до церкви на Великдень не впустять', 'REPLY', 59, 13);

    SELECT setval('public.tweets_id_seq', 83, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 15:18:16.033169', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:18:16.033169', 'slavikovskyi.a@gmail.com', '', 'TWEET', null, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:19:45.274949', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:19:45.274949', 'slavikovskyi.a@gmail.com', 'тоді я тімлід', 'REPLY', 80, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:34:38.045827', 'panroman@gmail.com', TIMESTAMP '2023-07-05 15:34:38.045827', 'panroman@gmail.com', '', 'RETWEET', 84, 13),
    (DEFAULT, TIMESTAMP '2023-07-05 15:34:39.380337', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 15:34:39.380337', 'portnov.dmitry1@gmail.com', '', 'RETWEET', 84, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 15:35:12.630832', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 15:35:12.630832', 'portnov.dmitry1@gmail.com', '', 'RETWEET', 63, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 15:35:23.197006', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 15:35:23.197006', 'bortnovskyi.pavlo@gmail.com', 'Looking nice', 'REPLY', 84, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 15:38:26.826922', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:38:26.826922', 'slavikovskyi.a@gmail.com', 'Італія😁', 'TWEET', null, 9);

    SELECT setval('public.tweets_id_seq', 91, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 15:42:42.192589', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:42:42.192589', 'slavikovskyi.a@gmail.com', 'Шо за хлопці нам допомогають😄', 'REPLY', 58, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:44:10.074643', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 15:44:10.074643', 'art.shev00@gmail.com', 'Чи можна мені в вашу команду??', 'REPLY', 58, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 15:44:21.489908', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 15:44:21.489908', 'bortnovskyi.pavlo@gmail.com', 'Дякую пане Кирил)', 'REPLY', 58, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 16:16:17.514116', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 16:16:17.514116', 'art.shev00@gmail.com', '', 'TWEET', null, 8);

    SELECT setval('public.tweets_id_seq', 96, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:24.614141', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:27:24.614141', 'slavikovskyi.a@gmail.com', 'твіт 2', 'TWEET', null, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:43.847410', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 17:27:43.847410', 'art.shev00@gmail.com', '', 'RETWEET', 97, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:46.106613', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 17:27:46.106613', 'portnov.dmitry1@gmail.com', '', 'RETWEET', 97, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:51.814244', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 17:27:51.814244', 'keller.a@ukr.net', '', 'RETWEET', 97, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:54.342839', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 17:27:54.342839', 'valanir.work@gmail.com', 'після війни одразу поїду', 'REPLY', 97, 10),
    (DEFAULT, TIMESTAMP '2023-07-05 17:28:28.991291', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 17:28:28.991291', 'keller.a@ukr.net', 'круть', 'REPLY', 97, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 17:28:40.828040', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:28:40.828040', 'slavikovskyi.a@gmail.com', '', 'TWEET', null, 9);

    SELECT setval('public.tweets_id_seq', 104, true);

INSERT INTO public.tweets (id, created_at, created_by, updated_at, updated_by, body, tweet_type, parent_tweet, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 17:29:08.482393', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:29:08.482393', 'slavikovskyi.a@gmail.com', '', 'RETWEET', 58, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:30:06.756536', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:30:06.756536', 'slavikovskyi.a@gmail.com', 'квот твіт', 'QUOTE_TWEET', 58, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:30:37.745682', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:30:37.745682', 'slavikovskyi.a@gmail.com', 'коментар', 'REPLY', 106, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:31:28.066322', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:31:28.066322', 'slavikovskyi.a@gmail.com', 'Олексій', 'REPLY', 58, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:32:19.821105', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:32:19.821105', 'slavikovskyi.a@gmail.com', '', 'RETWEET', 40, 9);

INSERT INTO public.attachment_images (id, created_at, created_by, updated_at, updated_by, img_url, tweet_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.245205', null, TIMESTAMP '2023-05-30 18:45:31.245205', null, 'https://telegraf.com.ua/static/storage/thumbs/1044x587/1/62/86daad98-939aa3eb076510417e7e31a1a9026621.webp', 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.442202', null, TIMESTAMP '2023-05-30 18:45:31.442202', null, 'https://pon.org.ua/uploads/posts/2022-03/1646311695_1fc5f435c3b935ac.jpg', 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.442202', null, TIMESTAMP '2023-05-30 18:45:31.442202', null, 'https://defence-ua.com/media/illustration/articles/9466300c0918bfff.jpg', 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.442202', null, TIMESTAMP '2023-05-30 18:45:31.442202', null, 'https://ecopolitic.com.ua/wp-content/uploads/2022/03/shutterstock_2119226741-750x500.jpg', 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.442202', null, TIMESTAMP '2023-05-30 18:45:31.442202', null, 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2021-01/Iguassu-Falls.jpg', 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.442202', null, TIMESTAMP '2023-05-30 18:45:31.442202', null, 'https://vandruy.by/wp-content/uploads/2018/08/201302121832369554-min.jpeg', 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.595203', null, TIMESTAMP '2023-05-30 18:45:31.595203', null, 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2021-01/Mu-Cang-Chai-2.jpg', 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.595203', null, TIMESTAMP '2023-05-30 18:45:31.595203', null, 'https://avatars.dzeninfra.ru/get-zen_doc/5227693/pub_6129441efb292907169c3d89_6129447cd1cfb8354455b4da/scale_1200', 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:31.786753', null, TIMESTAMP '2023-05-30 18:45:31.786753', null, 'https://images.unian.net/photos/2022_06/1656498356-7655.jpg', 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.003678', null, TIMESTAMP '2023-05-30 18:45:32.003678', null, 'https://avatars.dzeninfra.ru/get-zen_doc/48747/pub_5bd5d54745d57300ab3d07ef_5bd5dcf1844db800aa5b5f81/scale_1200', 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.003678', null, TIMESTAMP '2023-05-30 18:45:32.003678', null, 'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2018/06/10-Kawachi_Fuji_Garden-e1528946732331.jpg', 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.003678', null, TIMESTAMP '2023-05-30 18:45:32.003678', null, 'https://harpersbazaar.kz/wp-content/uploads/2022/04/shutterstock_733724497-740x370.jpg', 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.226818', null, TIMESTAMP '2023-05-30 18:45:32.226818', null, 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2021-04/Neuschwanstein-castle_0.jpg', 7),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.226818', null, TIMESTAMP '2023-05-30 18:45:32.226818', null, 'https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/2021-04/Chambord-castle.jpg', 7),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.226818', null, TIMESTAMP '2023-05-30 18:45:32.226818', null, 'https://i.ytimg.com/vi/VYhn1XQvCV4/sddefault.jpg', 7),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.226818', null, TIMESTAMP '2023-05-30 18:45:32.226818', null, 'https://lifeglobe.net/x/entry/1307/16_3.jpg', 7),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.454620', null, TIMESTAMP '2023-05-30 18:45:32.454620', null, 'https://n1s1.hsmedia.ru/7f/d4/a5/7fd4a5e5457a59c575df1fa38d8be61e/1920x1152_0xac120003_12726234471666876992.jpeg', 8),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.454620', null, TIMESTAMP '2023-05-30 18:45:32.454620', null, 'https://avatars.dzeninfra.ru/get-zen_doc/1641049/pub_5d1b66cd3b4cd800adc731f8_5d1b76b27b832900ad7f4d33/scale_1200', 8),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.733319', null, TIMESTAMP '2023-05-30 18:45:32.733319', null, 'https://images.unian.net/photos/2022_06/1656498361-1772.jpg', 8),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:32.974837', null, TIMESTAMP '2023-05-30 18:45:32.974837', null, 'https://images.unian.net/photos/2022_06/1656498362-4940.jpg', 10),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.063061', null, TIMESTAMP '2023-05-30 18:45:33.063061', null, 'https://images.unian.net/photos/2022_06/1656498361-1772.jpg', 10),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.287101', null, TIMESTAMP '2023-05-30 18:45:33.287101', null, 'https://images.unian.net/photos/2022_06/1656498363-1526.jpg', 11),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.620557', null, TIMESTAMP '2023-05-30 18:45:33.620557', null, 'https://images.unian.net/photos/2022_06/1656498364-2927.jpg', 13),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:33.849317', null, TIMESTAMP '2023-05-30 18:45:33.849317', null, 'https://images.unian.net/photos/2022_06/1656498365-9664.jpg', 13),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.077472', null, TIMESTAMP '2023-05-30 18:45:34.077472', null, 'https://images.unian.net/photos/2022_06/1656497311-2625.jpg', 13),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.164996', null, TIMESTAMP '2023-05-30 18:45:34.164996', null, 'https://images.unian.net/photos/2022_06/1656496721-2719.jpg', 13),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.391339', null, TIMESTAMP '2023-05-30 18:45:34.391339', null, 'https://images.unian.net/photos/2022_06/1656497311-5608.jpg', 14),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.618560', null, TIMESTAMP '2023-05-30 18:45:34.618560', null, 'https://images.unian.net/photos/2022_06/1656497312-3436.jpg', 15),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:34.904625', null, TIMESTAMP '2023-05-30 18:45:34.904625', null, 'https://images.unian.net/photos/2022_06/1656497313-7631.jpg ', 16),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.192059', null, TIMESTAMP '2023-05-30 18:45:35.192059', null, 'https://images.unian.net/photos/2022_06/1656497314-5114.jpg', 17),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.459015', null, TIMESTAMP '2023-05-30 18:45:35.459015', null, 'https://images.unian.net/photos/2022_06/1656497315-9664.jpg', 18),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:35.547256', null, TIMESTAMP '2023-05-30 18:45:35.547256', null, 'https://images.unian.net/photos/2022_06/1656497134-7822.jpg', 18),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.216520', null, TIMESTAMP '2023-05-30 18:45:36.216520', null, 'https://images.unian.net/photos/2021_08/1629469199-3761.jpg', 21),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.445838', null, TIMESTAMP '2023-05-30 18:45:36.445838', null, 'https://images.unian.net/photos/2021_08/1629471815-9795.jpg', 22),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:36.801664', null, TIMESTAMP '2023-05-30 18:45:36.801664', null, 'https://images.unian.net/photos/2020_11/1605089297-6848.jpg', 23),
    (DEFAULT, TIMESTAMP '2023-07-05 11:51:07.314308', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:51:07.314308', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688557866/TWEETER_v1/user_id_6/tweets/tweet_id_25/img_1.jpg', 25),
    (DEFAULT, TIMESTAMP '2023-07-05 11:52:39.315217', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:52:39.315217', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688557955/TWEETER_v1/user_id_6/tweets/tweet_id_26/img_1.jpg', 26),
    (DEFAULT, TIMESTAMP '2023-07-05 11:52:39.342249', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:52:39.342249', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688557957/TWEETER_v1/user_id_6/tweets/tweet_id_26/img_3.jpg', 26),
    (DEFAULT, TIMESTAMP '2023-07-05 11:52:39.370051', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:52:39.370051', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688557958/TWEETER_v1/user_id_6/tweets/tweet_id_26/img_4.jpg', 26),
    (DEFAULT, TIMESTAMP '2023-07-05 11:52:39.397092', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:52:39.397092', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688557956/TWEETER_v1/user_id_6/tweets/tweet_id_26/img_2.jpg', 26),
    (DEFAULT, TIMESTAMP '2023-07-05 11:55:04.923735', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:55:04.923735', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688558100/TWEETER_v1/user_id_6/tweets/tweet_id_27/img_1.jpg', 27),
    (DEFAULT, TIMESTAMP '2023-07-05 11:55:04.949318', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:55:04.949318', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688558104/TWEETER_v1/user_id_6/tweets/tweet_id_27/img_4.jpg', 27),
    (DEFAULT, TIMESTAMP '2023-07-05 11:55:04.974578', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:55:04.974578', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688558101/TWEETER_v1/user_id_6/tweets/tweet_id_27/img_2.jpg', 27),
    (DEFAULT, TIMESTAMP '2023-07-05 11:55:04.999947', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:55:04.999947', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688558103/TWEETER_v1/user_id_6/tweets/tweet_id_27/img_3.jpg', 27),
    (DEFAULT, TIMESTAMP '2023-07-05 11:56:47.143858', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 11:56:47.143858', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688558206/TWEETER_v1/user_id_6/tweets/tweet_id_28/img_1.jpg', 28);

    SELECT setval('public.attachment_images_id_seq', 57, true);

INSERT INTO public.attachment_images (id, created_at, created_by, updated_at, updated_by, img_url, tweet_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 12:36:54.455125', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 12:36:54.455125', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688560614/TWEETER_v1/user_id_8/tweets/tweet_id_40/img_1.jpg', 40),
    (DEFAULT, TIMESTAMP '2023-07-05 12:37:22.141854', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 12:37:22.141854', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688560641/TWEETER_v1/user_id_8/tweets/tweet_id_41/img_1.jpg', 41);

    SELECT setval('public.attachment_images_id_seq', 60, true);

INSERT INTO public.attachment_images (id, created_at, created_by, updated_at, updated_by, img_url, tweet_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:39:40.693485', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:39:40.693485', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688564380/TWEETER_v1/user_id_8/tweets/tweet_id_45/img_1.jpg', 45),
    (DEFAULT, TIMESTAMP '2023-07-05 13:43:51.585107', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:43:51.585107', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688564630/TWEETER_v1/user_id_8/tweets/tweet_id_50/img_1.jpg', 50),
    (DEFAULT, TIMESTAMP '2023-07-05 13:50:29.437914', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 13:50:29.437914', 'valanir.work@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688565028/TWEETER_v1/user_id_10/tweets/tweet_id_51/img_1.jpg', 51);

    SELECT setval('public.attachment_images_id_seq', 64, true);

INSERT INTO public.attachment_images (id, created_at, created_by, updated_at, updated_by, img_url, tweet_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:56:25.947977', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:56:25.947977', 'bortnovskyi.pavlo@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688565385/TWEETER_v1/user_id_6/tweets/tweet_id_54/img_1.jpg', 54),
    (DEFAULT, TIMESTAMP '2023-07-05 14:02:17.297651', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:02:17.297651', 'budanovKiril@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688565736/TWEETER_v1/user_id_11/tweets/tweet_id_58/img_1.jpg', 58),
    (DEFAULT, TIMESTAMP '2023-07-05 14:13:12.138904', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:13:12.138904', 'budanovKiril@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688566391/TWEETER_v1/user_id_11/tweets/tweet_id_59/img_1.jpg', 59),
    (DEFAULT, TIMESTAMP '2023-07-05 14:20:12.780918', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:20:12.780918', 'Joe@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688566812/TWEETER_v1/user_id_12/tweets/tweet_id_63/img_1.jpg', 63),
    (DEFAULT, TIMESTAMP '2023-07-05 14:26:04.975597', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:26:04.975597', 'Joe@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688567164/TWEETER_v1/user_id_12/tweets/tweet_id_64/img_1.jpg', 64),
    (DEFAULT, TIMESTAMP '2023-07-05 14:30:57.373584', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:30:57.373584', 'Joe@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688567456/TWEETER_v1/user_id_12/tweets/tweet_id_65/img_1.jpg', 65),
    (DEFAULT, TIMESTAMP '2023-07-05 14:46:02.576388', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:46:02.576388', 'panroman@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688568362/TWEETER_v1/user_id_13/tweets/tweet_id_73/img_1.jpg', 73),
    (DEFAULT, TIMESTAMP '2023-07-05 14:51:21.924113', 'poplavok@gmail.com', TIMESTAMP '2023-07-05 14:51:21.924113', 'poplavok@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688568681/TWEETER_v1/user_id_15/tweets/tweet_id_78/img_1.jpg', 78),
    (DEFAULT, TIMESTAMP '2023-07-05 14:54:48.749653', 'panroman@gmail.com', TIMESTAMP '2023-07-05 14:54:48.749653', 'panroman@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688568888/TWEETER_v1/user_id_13/tweets/tweet_id_80/img_1.jpg', 80),
    (DEFAULT, TIMESTAMP '2023-07-05 15:18:17.713574', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:18:17.713574', 'slavikovskyi.a@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688570297/TWEETER_v1/user_id_9/tweets/tweet_id_84/img_1.jpg', 84),
    (DEFAULT, TIMESTAMP '2023-07-05 15:38:29.360219', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:38:29.360219', 'slavikovskyi.a@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688571507/TWEETER_v1/user_id_9/tweets/tweet_id_90/img_1.jpg', 90),
    (DEFAULT, TIMESTAMP '2023-07-05 15:38:29.386394', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:38:29.386394', 'slavikovskyi.a@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688571508/TWEETER_v1/user_id_9/tweets/tweet_id_90/img_2.jpg', 90),
    (DEFAULT, TIMESTAMP '2023-07-05 16:16:20.637129', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 16:16:20.637129', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688573780/TWEETER_v1/user_id_8/tweets/tweet_id_95/img_3.jpg', 95),
    (DEFAULT, TIMESTAMP '2023-07-05 16:16:20.668051', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 16:16:20.668051', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688573779/TWEETER_v1/user_id_8/tweets/tweet_id_95/img_2.jpg', 95),
    (DEFAULT, TIMESTAMP '2023-07-05 16:16:20.698659', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 16:16:20.698659', 'art.shev00@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688573778/TWEETER_v1/user_id_8/tweets/tweet_id_95/img_1.jpg', 95),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:25.549049', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:27:25.549049', 'slavikovskyi.a@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688578045/TWEETER_v1/user_id_9/tweets/tweet_id_97/img_1.jpg', 97),
    (DEFAULT, TIMESTAMP '2023-07-05 17:28:42.000501', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:28:42.000501', 'slavikovskyi.a@gmail.com', 'http://res.cloudinary.com/dojrbfnaz/image/upload/v1688578121/TWEETER_v1/user_id_9/tweets/tweet_id_103/img_1.jpg', 103);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:37.874406', null, TIMESTAMP '2023-05-30 18:45:37.874406', null, 'LIKE', 1, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:37.975519', null, TIMESTAMP '2023-05-30 18:45:37.975519', null, 'LIKE', 2, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.108611', null, TIMESTAMP '2023-05-30 18:45:38.108611', null, 'LIKE', 3, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.209233', null, TIMESTAMP '2023-05-30 18:45:38.209233', null, 'LIKE', 1, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.304021', null, TIMESTAMP '2023-05-30 18:45:38.304021', null, 'LIKE', 2, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.399350', null, TIMESTAMP '2023-05-30 18:45:38.399350', null, 'LIKE', 3, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.534652', null, TIMESTAMP '2023-05-30 18:45:38.534652', null, 'LIKE', 7, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.671466', null, TIMESTAMP '2023-05-30 18:45:38.671466', null, 'LIKE', 7, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.807081', null, TIMESTAMP '2023-05-30 18:45:38.807081', null, 'LIKE', 7, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:38.963193', null, TIMESTAMP '2023-05-30 18:45:38.963193', null, 'LIKE', 10, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.106848', null, TIMESTAMP '2023-05-30 18:45:39.106848', null, 'LIKE', 11, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.240436', null, TIMESTAMP '2023-05-30 18:45:39.240436', null, 'LIKE', 12, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.375714', null, TIMESTAMP '2023-05-30 18:45:39.375714', null, 'LIKE', 13, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.510908', null, TIMESTAMP '2023-05-30 18:45:39.510908', null, 'LIKE', 14, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.645318', null, TIMESTAMP '2023-05-30 18:45:39.645318', null, 'LIKE', 15, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.782866', null, TIMESTAMP '2023-05-30 18:45:39.782866', null, 'LIKE', 16, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:39.949213', null, TIMESTAMP '2023-05-30 18:45:39.949213', null, 'LIKE', 17, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.086168', null, TIMESTAMP '2023-05-30 18:45:40.086168', null, 'LIKE', 18, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.220538', null, TIMESTAMP '2023-05-30 18:45:40.220538', null, 'LIKE', 19, 5),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.355691', null, TIMESTAMP '2023-05-30 18:45:40.355691', null, 'LIKE', 20, 1),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.494714', null, TIMESTAMP '2023-05-30 18:45:40.494714', null, 'LIKE', 21, 2),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.629989', null, TIMESTAMP '2023-05-30 18:45:40.629989', null, 'LIKE', 22, 3),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:40.774380', null, TIMESTAMP '2023-05-30 18:45:40.774380', null, 'LIKE', 23, 4),
    (DEFAULT, TIMESTAMP '2023-05-30 18:45:41.465594', null, TIMESTAMP '2023-05-30 18:45:41.465594', null, 'LIKE', 23, 1);

    SELECT setval('public.tweet_actions_id_seq', 52, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 11:49:05.979709', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 11:49:05.979709', 'keller.a@ukr.net', 'LIKE', 24, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 12:22:55.063900', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 12:22:55.063900', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 18, 6);

    SELECT setval('public.tweet_actions_id_seq', 71, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 12:23:06.443348', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 12:23:06.443348', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 13, 6);

    SELECT setval('public.tweet_actions_id_seq', 74, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:02:21.694117', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:02:21.694117', 'art.shev00@gmail.com', 'LIKE', 19, 8);

    SELECT setval('public.tweet_actions_id_seq', 84, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:04:43.282746', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 13:04:43.282746', 'art.shev00@gmail.com', 'LIKE', 20, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 13:37:13.370963', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 13:37:13.370963', 'valanir.work@gmail.com', 'LIKE', 44, 10),
    (DEFAULT, TIMESTAMP '2023-07-05 13:37:16.826546', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 13:37:16.826546', 'valanir.work@gmail.com', 'BOOKMARK', 44, 10);

    SELECT setval('public.tweet_actions_id_seq', 89, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:52:03.811638', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:52:03.811638', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 45, 6);

SELECT setval('public.tweet_actions_id_seq', 91, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 13:52:59.366085', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 13:52:59.366085', 'budanovKiril@gmail.com', 'LIKE', 50, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 13:54:43.826316', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 13:54:43.826316', 'budanovKiril@gmail.com', 'LIKE', 53, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 13:56:35.619693', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:56:35.619693', 'bortnovskyi.pavlo@gmail.com', 'BOOKMARK', 45, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 13:56:54.624528', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:56:54.624528', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 41, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 13:58:45.093458', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 13:58:45.093458', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 53, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:03:39.451962', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 14:03:39.451962', 'valanir.work@gmail.com', 'LIKE', 58, 10);

SELECT setval('public.tweet_actions_id_seq', 97, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:07:05.504342', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 14:07:05.504342', 'valanir.work@gmail.com', 'BOOKMARK', 51, 10),
    (DEFAULT, TIMESTAMP '2023-07-05 14:07:06.196637', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 14:07:06.196637', 'valanir.work@gmail.com', 'LIKE', 51, 10);

SELECT setval('public.tweet_actions_id_seq', 100, true);

INSERT INTO public.tweet_actions (id, created_at, created_by, updated_at, updated_by, action_type, tweet_id, user_id)
VALUES
    (DEFAULT, TIMESTAMP '2023-07-05 14:09:07.272519', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:09:07.272519', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 44, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:13:49.638062', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:13:49.638062', 'budanovKiril@gmail.com', 'LIKE', 45, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 14:13:53.695072', 'budanovKiril@gmail.com', TIMESTAMP '2023-07-05 14:13:53.695072', 'budanovKiril@gmail.com', 'LIKE', 41, 11),
    (DEFAULT, TIMESTAMP '2023-07-05 14:28:04.960103', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:28:04.960103', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 63, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:33:02.905982', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:33:02.905982', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 64, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:33:07.284819', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:33:07.284819', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 65, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:15.256933', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:15.256933', 'Joe@gmail.com', 'LIKE', 61, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:18.223645', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:18.223645', 'Joe@gmail.com', 'LIKE', 59, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:21.756575', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:21.756575', 'Joe@gmail.com', 'LIKE', 58, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:25.664477', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:25.664477', 'Joe@gmail.com', 'LIKE', 51, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:34:30.864124', 'Joe@gmail.com', TIMESTAMP '2023-07-05 14:34:30.864124', 'Joe@gmail.com', 'LIKE', 45, 12),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:02.436480', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:02.436480', 'keller.a@ukr.net', 'LIKE', 65, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:05.714978', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:05.714978', 'keller.a@ukr.net', 'LIKE', 64, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:08.174040', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:08.174040', 'keller.a@ukr.net', 'LIKE', 63, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:40:32.726041', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:40:32.726041', 'keller.a@ukr.net', 'LIKE', 58, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 14:47:27.309000', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 14:47:27.309000', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 73, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 14:52:37.229145', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 14:52:37.229145', 'keller.a@ukr.net', 'LIKE', 29, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 15:17:16.662254', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:17:16.662254', 'slavikovskyi.a@gmail.com', 'BOOKMARK', 80, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:17:26.151057', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:17:26.151057', 'slavikovskyi.a@gmail.com', 'BOOKMARK', 78, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:17:30.305098', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 15:17:30.305098', 'portnov.dmitry1@gmail.com', 'LIKE', 80, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 15:19:38.831450', 'panroman@gmail.com', TIMESTAMP '2023-07-05 15:19:38.831450', 'panroman@gmail.com', 'LIKE', 84, 13),
    (DEFAULT, TIMESTAMP '2023-07-05 15:19:49.410520', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 15:19:49.410520', 'slavikovskyi.a@gmail.com', 'LIKE', 80, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 15:35:01.611821', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 15:35:01.611821', 'portnov.dmitry1@gmail.com', 'LIKE', 58, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 15:35:11.932056', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 15:35:11.932056', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 84, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 15:42:49.476506', 'bortnovskyi.pavlo@gmail.com', TIMESTAMP '2023-07-05 15:42:49.476506', 'bortnovskyi.pavlo@gmail.com', 'LIKE', 58, 6),
    (DEFAULT, TIMESTAMP '2023-07-05 17:22:55.263878', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:22:55.263878', 'slavikovskyi.a@gmail.com', 'BOOKMARK', 95, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:23:00.976316', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:23:00.976316', 'slavikovskyi.a@gmail.com', 'BOOKMARK', 63, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:39.441228', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 17:27:39.441228', 'valanir.work@gmail.com', 'LIKE', 97, 10),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:42.828861', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 17:27:42.828861', 'art.shev00@gmail.com', 'LIKE', 97, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:46.480293', 'art.shev00@gmail.com', TIMESTAMP '2023-07-05 17:27:46.480293', 'art.shev00@gmail.com', 'BOOKMARK', 97, 8),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:49.521159', 'portnov.dmitry1@gmail.com', TIMESTAMP '2023-07-05 17:27:49.521159', 'portnov.dmitry1@gmail.com', 'LIKE', 97, 14),
    (DEFAULT, TIMESTAMP '2023-07-05 17:27:52.719759', 'keller.a@ukr.net', TIMESTAMP '2023-07-05 17:27:52.719759', 'keller.a@ukr.net', 'LIKE', 97, 7),
    (DEFAULT, TIMESTAMP '2023-07-05 17:28:33.655024', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:28:33.655024', 'slavikovskyi.a@gmail.com', 'LIKE', 97, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:32:23.988211', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:32:23.988211', 'slavikovskyi.a@gmail.com', 'BOOKMARK', 40, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:32:31.862949', 'slavikovskyi.a@gmail.com', TIMESTAMP '2023-07-05 17:32:31.862949', 'slavikovskyi.a@gmail.com', 'LIKE', 40, 9),
    (DEFAULT, TIMESTAMP '2023-07-05 17:33:06.041106', 'valanir.work@gmail.com', TIMESTAMP '2023-07-05 17:33:06.041106', 'valanir.work@gmail.com', 'LIKE', 41, 10);