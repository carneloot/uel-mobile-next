import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FunctionComponent, useState } from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import GoogleMaps from '@components/GoogleMaps';

import { Categoria, Data, Local } from '@interfaces/categoria.interface';

import _data from '@content/data.json';

import styles from '@styles/mapa/Mapa.module.scss';

interface MenuItem extends Pick<Categoria, 'id' | 'titulo'> {
    isLink: boolean;
}

const Mapa: FunctionComponent<Local> = (local) => {
    const router = useRouter();
    const [ menuOpened, changeMenuOpened ] = useState(false)

    const gotoDest = (dest: string) => {
        router.push({ query: { dest } }, null, { shallow: true });
        changeMenuOpened(() => false)
    }

    const showImages = false; // !!local.imagens?.length ?? false;
    const data = _data as Data;

    const menuItems: MenuItem[] = [];
    let dest: Local;

    for (const categoria of data.categorias) {
        menuItems.push({
            id: categoria.id,
            titulo: categoria.titulo,
            isLink: false,
        });

        for (const outroLocal of categoria.locais) {
            if (outroLocal.id === local.id) {
                continue;
            }

            menuItems.push({
                id: outroLocal.id,
                titulo: outroLocal.titulo,
                isLink: true,
            });

            if (!dest && router.query?.dest === outroLocal.id) {
                dest = outroLocal;
            }
        }
    }

    return <div>
        <Head>
            <meta charSet="utf-8"/>
            <link rel="icon" href="/favicon.ico" />
            <title>{local.titulo} - Guia UEL</title>
            <meta name="description" content={`${local.titulo} - Guia UEL`} />
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

                <GoogleMaps
                    local={local}
                    dest={dest}
                    className={styles.map}
                />

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
                                {menuItems.map(item => (
                                    <li key={item.id} className={item.isLink ? styles['wtg-link'] : styles.cat}>
                                        {!item.isLink && item.titulo}
                                        {item.isLink && (
                                            <a href="#" onClick={() => gotoDest(item.id)}>
                                                {item.titulo}
                                            </a>
                                        )}
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
