import HttpErrors from 'http-errors';
import { Courses, Students } from '../models/index.js';

export default {
    async create(req, res, next) {
        try {
            const course = await Courses.create(req.body);

            res.json(course);
        } catch (e) {
            next(e);
        }
    },

    async list(req, res, next) {
        try {
            const result = await Courses.findAll();

            res.json(result);
        } catch (e) {
            next(e);
        }
    },

    async getById(req, res, next) {
        try {
            const course = await Courses.findByPk(req.params.id, {
                include: {
                    model: Students,
                    as: 'students',
                },
            });

            if (!course) {
                throw new HttpErrors(404, 'Not found');
            }

            res.json(course);
        } catch (e) {
            next(e);
        }
    },
};