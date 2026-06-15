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

    async enroll(req, res, next) {
        try {
            const { id } = req.params;
            const { courseId, semester } = req.body;

            const student = await Students.findByPk(id);
            if (!student) throw new HttpErrors(404, 'Student not found');

            const course = await Courses.findByPk(courseId);
            if (!course) throw new HttpErrors(404, 'Course not found');

            await student.addCourse(course, {
                through: {
                    semester,
                    grade: null,
                },
            });

            const result = await Students.findByPk(id, {
                include: {
                    model: Courses,
                    as: 'courses',
                },
            });

            res.json(result);
        } catch (e) {
            next(e);
        }
    },

    async grade(req, res, next) {
        try {
            const { id, courseId } = req.params;
            const { grade } = req.body;

            const student = await Students.findByPk(id);
            if (!student) throw new HttpErrors(404, 'Student not found');

            const course = await Courses.findByPk(courseId);
            if (!course) throw new HttpErrors(404, 'Course not found');

            await student.addCourse(course, {
                through: {
                    grade,
                },
            });

            res.json({ message: 'Grade updated' });
        } catch (e) {
            next(e);
        }
    },

    async unenroll(req, res, next) {
        try {
            const { id, courseId } = req.params;

            const student = await Students.findByPk(id);
            if (!student) throw new HttpErrors(404, 'Student not found');

            const course = await Courses.findByPk(courseId);
            if (!course) throw new HttpErrors(404, 'not found');

            await student.removeCourse(course);

            res.json({ message: 'Delete from course' });
        } catch (e) {
            next(e);
        }
    },
};