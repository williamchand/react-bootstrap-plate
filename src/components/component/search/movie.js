import React, { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../../../context/search';
import { Card, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const movieList = [
  {
    en: {
      Title: "Captain Marvel",
      Plot: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
    },
    id: {
      Title: "Kapten Marvel",
      Plot: "Carol Danvers menjadi salah satu pahlawan terkuat di alam semesta saat Bumi terjebak di tengah perang galaksi antara dua ras alien.",
    }
  },
  {
    en: {
      Title: "Spiderman",
      Plot: "On a school trip, high school senior Peter Parker visits a Columbia University genetics laboratory, where he is bitten by a genetically engineered 'super spider' that escaped from containment and seemingly falls ill after returning home."
    },
    id: {
      Title: "Spiderman",
      Plot: "Dalam perjalanan sekolah, senior sekolah menengah Peter Parker mengunjungi laboratorium genetika Universitas Columbia, di mana ia digigit oleh 'laba-laba super' rekayasa genetika yang lolos dari penahanan dan tampaknya jatuh sakit setelah kembali ke rumah.",
    }
  },
  {
    en: {
      Title: "Twilight",
      Plot: "It focuses on the development of a personal relationship between teenager Bella Swan (Kristen Stewart) and vampire Edward Cullen (Robert Pattinson), and the subsequent efforts of Edward and his family to keep Bella safe from a separate group of hostile vampires."
    },
    id: {
      Title: "Twilight",
      Plot: "Ini berfokus pada pengembangan hubungan pribadi antara remaja Bella Swan (Kristen Stewart) dan vampir Edward Cullen (Robert Pattinson), dan upaya selanjutnya dari Edward dan keluarganya untuk menjaga Bella aman dari kelompok vampir bermusuhan yang terpisah.",
    }
  },
  {
    en: {
      Title: "The Incredibles 2",
      Plot: "After the death of Syndrome, the Incredibles and Frozone battle the Underminer. They prevent him from destroying City Hall but are unable to stop him from robbing a bank and escaping."
    },
    id: {
      Title: "The Incredibles 2",
      Plot: "Setelah Syndrome mati, Incredibles dan Frozone bertempur melawan Underminer. Mereka mencegahnya dari menghancurkan Balai Kota tetapi tidak dapat menghentikannya untuk merampok bank dan melarikan diri.",
    }
  },
];

function MovieView() {
  const {t, i18n} = useTranslation();
  const [search] = useContext(SearchContext);
  const [movie, setMovie] = useState({});
  const searchMovie = search => {
    return movieList.find(movie => movie['en'].Title.toLowerCase().includes(search.toLowerCase()) || 
                                  movie['id'].Title.toLowerCase().includes(search.toLowerCase()));
  };
  useEffect(() => {
    setMovie({});
    if (search.movie) {
      const movie = searchMovie(search.movie);
      setMovie(movie ? movie : {error: 'Error not found'});
    }
  },[search, setMovie, i18n.language]);

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        {movie['en'] && (
          <Card>
            <Card.Body>
              <Card.Title>{movie[i18n.language].Title}</Card.Title>
                <Card.Text>
                  {movie[i18n.language].Plot}
                </Card.Text>
            </Card.Body>
          </Card>
        )}
        {movie['error'] && (
          <Alert variant='warning'>
            {t('moviePage.error')}
          </Alert>
        )}
      </Col>
    </Row>
  );
}

export default MovieView;
