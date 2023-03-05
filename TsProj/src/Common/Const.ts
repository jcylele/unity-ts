//universal constant variables and types

export type ClassOf<T> = {
    new(): T;
}

export type TickFunc = () => void;
