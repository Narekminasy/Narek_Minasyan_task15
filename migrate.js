import {
    Students, Courses, Enrollments,
} from './models/index.js';
;(async () => {
    console.log('Running Migration');

    const models = [
        Students,
        Courses,
        Enrollments,
    ];

    for (const model of models) {
        try {
            console.log('model -> ', model);
            await model.sync({alter: true});
        } catch (e) {
            console.error(e);
        }
    }
})();
