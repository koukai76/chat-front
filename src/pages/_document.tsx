import Document, { Head, Main, NextScript } from 'next/document';

import { Constant } from 'src/constant';

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>{Constant.title}</title>

          <meta name="description" content={Constant.description} />

          {/* favicon */}
          <link rel="shortcut icon" href="/img/icon_rab.png" />
          <link rel="apple-touch-icon" href="/img/icon_rab.png" />
          <link rel="icon" type="image/png" href="/img/icon_rab.png" />

          {/* OGP */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={Constant.title} />
          <meta property="og:title" content={Constant.title} />
          <meta property="og:url" content={Constant.url} />
          <meta property="og:description" content={Constant.description} />
          <meta property="og:image" content={`${Constant.url}/img/ogp.png`} />

          {/* bootstrap */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body style={{ background: '#000' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
