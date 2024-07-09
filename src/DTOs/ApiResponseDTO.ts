export interface ApiResponseMedicineDTO {
    totalFilas: number;
    pagina: number;
    tamanioPagina: number;
    resultados: Resultado[];
}

interface Resultado {
    nregistro: string;
    nombre: string;
    labtitular: string;
    cpresc: string;
    estado: Estado;
    comerc: boolean;
    receta: boolean;
    generico: boolean;
    conduc: boolean;
    triangulo: boolean;
    huerfano: boolean;
    biosimilar: boolean;
    nosustituible: Nosustituible;
    psum: boolean;
    notas: boolean;
    materialesInf: boolean;
    ema: boolean;
    docs: Doc[];
    fotos: Foto[];
    viasAdministracion: ViaAdministracion[];
    formaFarmaceutica: FormaFarmaceutica;
    formaFarmaceuticaSimplificada: FormaFarmaceuticaSimplificada;
    vtm: Vtm;
    dosis: string;
}

interface Estado {
    aut: number;
    susp?: number;
    rev?: number;
}

interface Nosustituible {
    id: number;
    nombre: string;
}

interface Doc {
    tipo: number;
    url: string;
    urlHtml: string;
    secc: boolean;
    fecha: number;
}

interface Foto {
    tipo: string;
    url: string;
    fecha: number;
}

interface ViaAdministracion {
    id: number;
    nombre: string;
}

interface FormaFarmaceutica {
    id: number;
    nombre: string;
}

interface FormaFarmaceuticaSimplificada {
    id: number;
    nombre: string;
}

interface Vtm {
    id: number;
    nombre: string;
}