// import axios from "axios"
import dotenv from "dotenv"
import Joi from "joi";
import Product from "../models/product"
dotenv.config();
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
})
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({
                message: "Khong co san pham nao"
            })
        }
        return res.json({
            message: " Lay danh sach san pham thanh cong",
            products
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}
export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: "Khong tim thay san pham nao"
            })
        }
        res.json({
            message: " Lay san pham thanh cong",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}
export const create = async (req, res) => {
    try {
        // validate
        const { error } = productSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message)
            return res.status(400).json({
                message: errors
            })
        }
        const product = await Product.create(req.body);
        if (!product) {
            res.status(404).json({
                message: "Them san pham khong thanh cong "
            })
        }
        return res.json({
            message: " Them san pham thanh cong",
            product

        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })

    }

}

export const update = async (req, res) => {
    try {
        const product = await findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!products) {
            res.status(404).json({
                message: "Cap nhat san pham khong thanh cong "
            })
        }
        res.json({
            message: " Cap nhat pham thanh cong",
            product

        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })

    }
}

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xoa san pham thanh cong ",
            product,
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}