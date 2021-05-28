export interface Categoria {
    id: string;
    titulo: string;
    locais: Array<Local>;
}

export interface Local {
    id: string;
    titulo: string;

    lat: number;
    lng: number;

    descricao?: string;
    cursos?: Array<string>;

    imagens?: Array<string>;

    salas?: Array<Sala>;
}

export interface Sala {
    zoom: number;

    lat: number;
    lng: number;

    locais: Array<Local>;
}
