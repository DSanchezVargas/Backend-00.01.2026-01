require('dotenv').config()
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');
const { User } = require('../models');

const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;

exports.getUsers = async (req, res) => {
    try {
        const { role, q, page = 1, pageSize = 10 } = req.query;

        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;

        // Filtros dinámicos
        const where = {};

        if (role) {
            where.role = role;
        }

        if (q) {
            where[Op.or] = [
                { firstName: { [Op.like]: `%${q}%` } },
                { lastName: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ];
        }

        const { count, rows } = await User.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return res.json({
            total: count,
            page: parseInt(page),
            pageSize: limit,
            totalPages: Math.ceil(count/limit),
            data: rows
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error obteniendo usuarios'
        });
    }
};

exports.addUser = (req, res) => {
    const usuarioNuevo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
        role: req.body.role || "student",
    };

    User.create(usuarioNuevo).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(500).send(error);
    });
};