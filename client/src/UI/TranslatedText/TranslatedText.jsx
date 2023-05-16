import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

function TranslatedText({ text }) {
  const [translatedText, setTranslatedText] = useState('');

  async function translateText() {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);
    encodedParams.set('target', 'uk');
    encodedParams.set('source', 'en');

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '5205c93c34msh4c2c8b99c8bcf5cp160c5fjsn36de5d9ce4ad',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'self-start',
      }}
    >
      {translatedText.length !== 0 ? (
        <Button variant="text" onClick={translateText}>
          Translate Tweet
        </Button>
      ) : (
        false
      )}

      <Typography variant="body" sx={{ fontSize: '15px' }}>
        {translatedText !== '' ? translatedText : false}
      </Typography>
    </Box>
  );
}

export default TranslatedText;
