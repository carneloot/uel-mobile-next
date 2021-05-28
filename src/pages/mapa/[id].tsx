import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { Data, Local } from '../../interfaces/categoria.interface';

import _data from '../../content/data.json';

import styles from '../../styles/mapa/Mapa.module.scss';

const Mapa: FunctionComponent<Local> = (local) => {
    const router = useRouter();
    const mapaRef = useRef<HTMLDivElement>();
    const [ menuOpened, changeMenuOpened ] = useState(false)

    useEffect(() => {
        const mapaElement = mapaRef.current;

        // Load GoogleMaps
    });

    const gotoDest = (dest: string) => {
        router.push({ query: { dest } }, null, { shallow: true });
        changeMenuOpened(() => false)
    }

    const showImages = false; // !!local.imagens?.length ?? false;

    const data = _data as Data;

    const outrosLocais = data.categorias
        .reduce((acc, curr) => acc.concat(curr.locais), [] as Local[])
        .filter(outro => outro.id !== local.id);

    let dest: Local;

    if (router.query.dest) {
        dest = outrosLocais.find(outro => outro.id === router.query.dest);
    }

    return <div>
        <Head>
            <title>{local.titulo} - Guia UEL</title>
            <meta name="description" content={`${local.titulo} - Guia UEL`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header
            showMenuButton={true}
            isMenuOpened={menuOpened}
            onClickMenu={() => changeMenuOpened(prev => !prev)}
        />

        <div className={styles.container}>
            <section className={styles.conteudo}>
                {local.salas && (
                    <button className={styles['btn-salas']}>
                        <span>Salas</span>
                    </button>
                )}

                <div id={styles.map} ref={mapaRef}></div>

                <h2 className={styles.aviso}>
                    Para escolher um local para ir, use o menu na direita.
                </h2>

                <h2 className={styles.titulo}>
                    {local.titulo}
                </h2>

                {local.descricao && (
                    <div className={styles['descricao']}>
                        <p>
                            {local.descricao}
                        </p>
                    </div>
                )}

                {local.cursos && (
                    <div className={styles.cursos}>
                        <h3>Cursos</h3>
                        <ul>
                            {local.cursos.map(curso => (
                                <li key={curso}>{curso}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {showImages && (
                    <div>
                        <h3 className={styles['tit-imagens']}>
                            Imagens do Local:
                        </h3>

                        <div className={styles.imagens}>

                        </div>
                    </div>
                )}

            </section>
        </div>

        <aside className={`${styles.menu} ${menuOpened && styles.open || ''}`}>
            <div className={styles['menu-container']}>
                <ul>
                    <li><a href="/" className={styles['menu-link']}>Home</a></li>
                    <li>
                        <h3>Onde ir:</h3>
                        <div className={styles['where-to-go']}>
                            <ul>
                                {outrosLocais.map(outroLocal => (
                                    <li key={outroLocal.id} className={styles['wtg-link']}>
                                        <a href="#" onClick={() => gotoDest(outroLocal.id)}>
                                            {outroLocal.titulo}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>

        <Footer />
    </div>
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const data = _data as Data;

    const todosLocais = data.categorias.reduce((acc, curr) => acc.concat(curr.locais), [] as Local[])

    const paths = todosLocais.map(local => ({
        params: {
            id: local.id,
        }
    }));

    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<Local, Record<'id', string>> = async (context) => {
    const data = _data as Data;

    const { id } = context.params;

    if (!id) {
        return {
            notFound: true,
        };
    }

    const todosLocais = data.categorias.reduce((acc, curr) => acc.concat(curr.locais), [] as Local[]);
    const local = todosLocais.find(l => l.id == id);

    return {
        props: local,
    };
}

export default Mapa;
