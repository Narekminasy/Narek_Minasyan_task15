import HttpErrors from 'http-errors';
import { Students, Courses } from '../models/index.js';

export default {
    async create(req, res, next) {
        try {
            const student = await Students.create(req.body);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    async list(req, res, next) {
        try {
            const result = await Students.findAll();

            res.json(result);
        } catch (e) {
            next(e);
        }
    },

    async getById(req, res, next) {
        try {
            const student = await Students.findByPk(req.params.id, {
                include: {
                    model: Courses,
                    as: 'courses',
                },
            });

            if (!student) {
                throw new HttpErrors(404, 'Student not found');
            }

            res.json(student);
        } catch (e) {
            next(e);
        }
    },
};
