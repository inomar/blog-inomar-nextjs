import { Head, Main, NextScript } from 'next/document';
import NextDocument from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import Ogp from '../lib/ogp';
import '../styles/main.scss';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal();
    }
  }

  render() {
    return(
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico"></link>
          <Ogp />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}