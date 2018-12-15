import { ValidationError } from "yup";

export const formatYupError = err => {
    const errors1 = [];
    err.inner.forEach(e => {
        errors1.push({
            path: e.path,
            message: e.message
        });
    });
    var e = {};
    e.errors = errors1;
    return e;
};
