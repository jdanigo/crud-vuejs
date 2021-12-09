import mongoose from 'mongoose';
import {productsModel} from '../../models/products'

const productsController = {};

productsController.getAction = async (req, res) =>{

    res.json({
        msg: 200,
        msg: 'success',
        data:null
    })

}

productsController.getAllAction = async (req, rest) => {

}

productsController.createAction = async (req, res)=>{

}

productsController.updateAction = async (req, res)=>{

}

productsController.deleteAction = async () => {

}

export default productsController;