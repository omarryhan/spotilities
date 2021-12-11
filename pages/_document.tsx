/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import Document, {
  DocumentContext, Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      const page = originalRenderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
      const styleTags = sheet.getStyleElement();
      return await { ...page, styleTags };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html
        lang="en"
      >
        <Head>
          {/* @ts-expect-error idk whyy :@ */}
          {this.props.styleTags}
        </Head>
        <body
          // for some reasone the backgroundColor isn't being applied from GlobalStyles
          style={{
            backgroundColor: 'rgba(18, 18, 18, 1)',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
