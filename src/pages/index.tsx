import Head from 'next/head'
import { FunctionComponent } from 'react'

import { Data } from '@interfaces/categoria.interface'
import Footer from '@components/Footer'
import Header from '@components/Header'

import _data from '@content/data.json'

import styles from '@styles/Home.module.scss'

const Home: FunctionComponent = () => {
    const data = _data as Data;

    return (
        <div>
            <Head>
                <title>Guia UEL</title>
                <meta name="description" content="Guia UEL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className={styles.container}>
                <p>
                    Esses são os locais da UEL. Clique em um deles para entrar na página do local.
                </p>
                <div className={styles.locais}>
                    {data.categorias.map(cat =>
                        <div key={cat.id} className={styles['cat-unit']}>
                            <h2>{ cat.titulo }</h2>
                            {cat.locais.map(local =>
                                <a key={local.id} className={styles['local-unit']} href={`/mapa/${local.id}`}>
                                    <span>{local.titulo.toUpperCase()}</span>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
