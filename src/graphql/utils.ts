// https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
const stripTypenames = (obj: any, propToDelete: string) => {
    for (const property in obj) {
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
            delete obj.property;
            const newData = stripTypenames(obj[property], propToDelete);
            obj[property] = newData;
        } else {
            if (property === propToDelete) {
                delete obj[property];
            }
        }
    }
    return obj;
};

export { stripTypenames };
