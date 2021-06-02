import {FunctionComponent, useEffect} from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@styles/globals.scss';
import * as gtag from '@util/gtag';
import isProduction from '@util/is-production';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {

        const handleRouteChange = (url: URL) => {
            if (isProduction) {
                gtag.pageview(url)
            }
        }

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }

    }, [router.events]);

    return <Component {...pageProps} />
}

export default MyApp
