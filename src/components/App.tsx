import { Route, Switch } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import HomePage from 'pages/HomePage';
import { ETheme } from 'lib/enum/theme';
import { useRecoilValue } from 'recoil';
import { themeState } from 'atom/theme';
import SignPage from 'pages/SignPage';
import NoticePage from 'pages/NoticePage';

const App = (): JSX.Element => {
  const { LIGHT } = ETheme;
  const theme: ETheme = useRecoilValue(themeState);

  return (
    <div className={theme === LIGHT ? 'light' : 'dark'}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/github-login' component={SignPage} />
        <Route exact path='/notice' component={NoticePage} />
      </Switch>
    </div>
  );
}

export default App;
