import Head from 'next/head';
import { FunctionComponent } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { Data, Local } from '../../interfaces/categoria.interface';

import _data from '../../content/data.json';
import { GetStaticPaths, GetStaticProps } from 'next';

const Mapa: FunctionComponent<Local> = (local) => {

    return <div>
        <Head>
            <title>{local.titulo} - Guia UEL</title>
            <meta name="description" content={`${local.titulo} - Guia UEL`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <div className="mapa">
            {local.titulo} <br/>
            {local.descricao}
        </div>

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

    const todosLocais = data.categorias.reduce((acc, curr) => acc.concat(curr.locais), [] as Local[])
    const local = todosLocais.find(l => l.id == id);

    return {
        props: local,
    };
}

export default Mapa;
