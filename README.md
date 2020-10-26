# React Bootstrap Plate [![Netlify Status](https://api.netlify.com/api/v1/badges/c87ca310-3b6e-4786-8746-d8219bd2cc6f/deploy-status)](https://app.netlify.com/sites/awesome-brattain-372325/deploys)
React Bootstrap Plate is a React with Bootstrap integration framework to help beginners start learning web apps through the most basic tutorials.

## Overview
In this tutorial, we will create a web application that displays a list of movies using the OMDb API. This application will be able to accept keyword input and respond by displaying movies that match the keywords. The main thing we're going to explore is how:
- Create single page application.
- Create multi language page.
- Interaction between react and data.

## Prerequisite
- Download and install Node v8.10+, npm v5.6+ and Yarn v1.2.0+.
- Download and install JDK.
- Download and install Visual Studio Code.
- Create github account.
- Create netlify account.

### Create React App
This project using [Create React App](https://github.com/facebook/create-react-app) as base.

`npx create-react-app template-react-bootstrap`

### React-i18next
[React-i18next](https://react.i18next.com/) is the best language internationalization framework for which React / React Native is based on i18next.

`yarn add react-i18next i18next i18next-http-backend i18next-browser-languagedetector`

### React Router
Declarative URL routing using [React Router](https://reactrouter.com/).

`yarn add react-router react-router-dom`

### React Bootstrap
React-Bootstrap replaces Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unnecessary dependencies like jQuery.
Install dependencies from libraries [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction).

`yarn add react-bootstrap bootstrap react-router-bootstrap`

## Tutorial

### Add browserRouter to src/index.js
[BrowserRouter](https://reactrouter.com/web/api/BrowserRouter) HTML5 history API (pushState, replaceState, and popstate event) to keep your UI in sync with URLs.
```
import { BrowserRouter as Router } from 'react-router-dom';
...................
<React.StrictMode>
  <Router>
    <App />
  </Router>
</React.StrictMode>
```

### Photo profile image asset
Add photo profile image asset at public/assets/creators.jpg.

### Internationalization configuration
Configuration [i18n](https://react.i18next.com/latest/using-with-hooks) with file src/i18n.js with content.
```
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'id',
      debug: true,
      interpolation: {
        escapeValue: false,
      }
    });

export default i18n;
```
Add file to application src/index.js `import './i18n';`.

### Language translation collection 
Put collection language translation asset at public/locales/{language_code}/translation.json.

Version indonesian
```
{
	"header": {
    "logo": "React Bootstrap",
    "home": "Rumah",
    "search": "Pencarian"
	},
	"homePage": {
		"title": "Info kreator",
		"description": "Halo, perkenalkan aku william sebagai pembuat template react bootstrap. Aku berharap kode yang telah dibuat dapat membantu orang-orang memulai bekerja dengan react."
	},
	"searchPage": {
    "search": "Cari",
		"placeHolder": "Nama film"
	},
	"moviePage": {
		"error": "Error film tidak dapat ditemukan"
	}
}
```
Version english
```
{
	"header": {
    "logo": "React Bootstrap",
    "home": "Home",
    "search": "Search"
	},
	"homePage": {
		"title": "Creators info",
		"description": "Hello, I am William as the react bootstrap template creator. I hope the code I created will help people get started working with React."
	},
	"searchPage": {
		"search": "Search",
		"placeHolder": "Movie's name"
	},
	"moviePage": {
		"error": "Error movie's not found"
	}
}
```

### Move file App.* to components folder
Move file App.* to components folder.
At src/index.js change file source import `import App from './components/App';`.

### Initialization App.js
Initialization file App.js with internationalization and router.
```
import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  if (location.pathname === '/') {
    return <Redirect to="/home" />;
  }

  return (
    <Suspense fallback="loading">
      <div className="App">
        <Switch>
          <Route path="/">
          </Route>
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
```

### Application Navigation
Add [navigation](https://react-bootstrap.github.io/components/navs/) feature through src/components/header/index.js.
```
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import './index.css';

function Header() {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className="header">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/home">{t('header.logo')}</Navbar.Brand>
        <Nav className="mr-auto" activeKey={history.location.pathname}>
          <LinkContainer to="/home"><Nav.Link href="/home">{t('header.home')}</Nav.Link></LinkContainer>
          <LinkContainer to="/search"><Nav.Link href="/search">{t('header.search')}</Nav.Link></LinkContainer>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
```
import header through src/components/App.js.
```
import Header from './header';
...................
  <Route path="/">
    <Header />
  </Route>
...................
```

### Choose language using navigation
Choose language using dropdown bootstrap at navigation src/components/header/index.js.
```
...................
  const { t, i18n } = useTranslation();
  const handleLanguage = (language) => i18n.changeLanguage(language);

  return (
    ...................
        <Navbar.Brand href="/home">{t('header.logo')}</Navbar.Brand>
        <Nav className="mr-auto" activeKey={history.location.pathname}>
          ...................
        </Nav>
        <NavDropdown className="language ml-auto" title={i18n.language.toUpperCase()} id="nav-dropdown" onSelect={handleLanguage} alignRight>
          <NavDropdown.Item eventKey="id">ID</NavDropdown.Item>
          <NavDropdown.Item eventKey="en">EN</NavDropdown.Item>
        </NavDropdown>
    ...................
  );
}

export default Header;
```
Add style page src/components/header/index.css.
```
.language > a {
  color: #FFFFFF;
}
```

### Application content
Add content every URL route at application through src/components/content/index.js.
```
import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Content() {
  return (
    <Container>
      <Switch>
        <Route path="/home">
        </Route>
        <Route path="/search">
        </Route>
      </Switch>
    </Container>
  );
}

export default Content;
```

### Add homepage
Add homepage to load profile using [card](https://react-bootstrap.github.io/components/cards/) src/components/component/home/index.js.
```
import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <Card className="mt-5 mx-auto" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/assets/creators.jpg"} />
        <Card.Body>
          <Card.Title>{t('homePage.title')}</Card.Title>
          <Card.Text>
            {t('homePage.description')}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;
```
import homepage at src/components/content/index.js.
```
import HomePage from '../component/home';
...................
<Route path="/home">
  <HomePage />
</Route>
```

### Create search context
create search [context](https://reactjs.org/docs/context.html) src/context/search/reducer.js.
```
const cases = {
  MOVIE_VALUE: (state, payload) => ({
    ...state,
    movie: payload,
  })
};

const reducer = (state, action) => {
  return cases[action.type](state, action.payload);
};

export default reducer;
```
Call it at src/context/search/index.js.
```
import React, { createContext, useReducer } from 'react';
import { node } from 'prop-types';
import reducer from './reducer';

const defaultState = {};

export const SearchContext = createContext();

export function SearchProvider(props){
  const [state, dispatch] = useReducer(reducer, defaultState);
  const {children} = props;

  return <SearchContext.Provider value={[state, dispatch]}>{children}</SearchContext.Provider>;
}

SearchProvider.propTypes = {
  children: node.isRequired,
};
```

### Input search component
Build component to do input search [useState](https://reactjs.org/docs/hooks-state.html) dan [grup input](https://react-bootstrap.github.io/components/input-group/) bootstrap src/components/component/search/search.js.
```
import React, { useContext, useState } from 'react';

import { SearchContext } from '../../../context/search';
import { InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function SearchView() {
  const { t } = useTranslation();
  const [, searchDispatch] = useContext(SearchContext);
  const [movieName, setMovieName] = useState(''); 
  const searchInput = () => {
    searchDispatch({ type: 'MOVIE_VALUE', payload: movieName})
  }
  const handleKeyPress = (target) => {
    if(target.charCode===13){
      searchInput();    
    } 
  }

  return (
    <Row className="mt-3">
      <Col md={{ span: 4, offset: 4 }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={t('searchPage.placeHolder')}
            aria-label={t('searchPage.placeHolder')}
            aria-describedby="basic-addon2"
            onChange={value => setMovieName(value.target.value)}
            onKeyPress={handleKeyPress}
          />
          <InputGroup.Append>
            <Button onClick={searchInput}>{t('searchPage.search')}</Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default SearchView;
```

### Component output search
Build component to show output search [useEffect](https://reactjs.org/docs/hooks-effect.html) and data src/components/component/search/movie.js.
```
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
```
### Add search page
Add search page with route URL component src/components/component/search/index.js.
```
import React from 'react';

import MovieView from './movie';
import SearchView from './search';
import { SearchProvider } from '../../../context/search'

function SearchPage() {
  return (
    <SearchProvider>
      <SearchView />
      <MovieView />
    </SearchProvider>
  );
}

export default SearchPage;
```
import search page at src/components/content/index.js.
```
import SearchPage from '../component/search';
...................
<Route path="/search">
  <SearchPage />
</Route>
```

### Deactivate debug mode React-i18next
Deactivate debug mode React-i18next by changing configuration src/i18n.js `debug: false`.

### Functionality PWA 
If you want the application to work offline and load pages faster, add [PWA] (https://bit.ly/CRA-PWA) in the src/index.js file, change it to `serviceWorker.register();`.

### `yarn start`
Runs the app in development mode.<br />
Open http://localhost:3000 to view it in the browser.
The page will automatically reload if you make changes to the code.<br />
You will see the build errors and lint warnings in the console.

### Deployment
Application Deployment will using [netlify](https://www.netlify.com/) framework.
- Login to netlify account.
- Click new site from github.
- Connect with github account.
- Choose repository that you want to deploy.
- Setting build command `yarn build` and publish directory `build/`.
- Access example site at [https://awesome-brattain-372325.netlify.app/home](https://awesome-brattain-372325.netlify.app/home).
