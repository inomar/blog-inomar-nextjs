import App from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import NextNprogress from 'nextjs-progressbar';

import Theme from '../lib/Theme';
import GlobalStyle from '../lib/grobalStyles';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Theme>
        <GlobalStyle />
        <NextNprogress color="#275EAF" />
        <Component {...pageProps} />
      </Theme>
    )
  }
}


export default withGA('UA-93818826-2', Router)(MyApp);
