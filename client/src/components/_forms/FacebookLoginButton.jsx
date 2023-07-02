import React, { useEffect } from 'react';

export const FacebookLoginButton = () => {
  useEffect(() => {
    const loadFacebookSDK = () => {
      // Загрузка Facebook SDK
      window.fbAsyncInit = function () {
        FB.init({
          appId: 'ваш_app_id',
          cookie: true,
          xfbml: true,
          version: 'v12.0',
        });

        // После загрузки SDK вызываем функцию для проверки статуса входа
        checkLoginStatus();
      };

      // Загрузка SDK
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    const checkLoginStatus = () => {
      /* global FB */
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    const statusChangeCallback = (response) => {
      if (response.status === 'connected') {
        const accessToken = response.authResponse.accessToken;

        // Отправка токена доступа на сервер
        fetch(
          'https://final-step-fe2fs8tw.herokuapp.com/api/v1/auth/login/oauth2/code/facebook',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token: accessToken }),
          }
        )
          .then((response) => {
            // Обработка ответа от сервера
            // Можно выполнить редирект или выполнить другие действия
          })
          .catch((error) => {
            console.error('Ошибка при отправке данных на сервер', error);
          });
      }
    };

    // Ожидание загрузки Facebook SDK
    window.addEventListener('fbSdkLoaded', checkLoginStatus);

    // Если Facebook SDK уже загружен, запускаем проверку статуса входа
    if (window.FB) {
      checkLoginStatus();
    } else {
      // Если Facebook SDK еще не загружен, загружаем его
      loadFacebookSDK();
    }
  }, []);

  const handleLoginClick = () => {
    /* global FB */
    FB.login();
  };

  return <button onClick={handleLoginClick}>Войти через Facebook</button>;
};
