import Document, { Head, Html, Main, NextScript } from 'next/document';

import isProduction from '@util/is-production';
import { GA_TRACKING_ID } from '@util/gtag';

export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    {isProduction && (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${GA_TRACKING_ID}', {
                                            page_path: window.location.pathname,
                                        });
                                    `,
                                }}
                            />
                        </>
                    )}
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
