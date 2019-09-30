declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module 'bera';

// This will allow you to load `.json` files from disk
declare module '*.json' {
    const value: any;
    export default value;
}

// This will allow you to load JSON from remote URL responses
declare module 'json!*' {
    const value: any;
    export default value;
}
