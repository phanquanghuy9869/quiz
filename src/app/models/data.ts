export interface Question {
    id?: string;
    title?: string;
    category?: string;
    author?: string;
    content?: string;
    options?: Option[];
    resultCode?: string;
    level?: string;
    summary?: string;
    selected: boolean;
}

export interface Option{
    code?: string;
    text?: string;
}