"use strict";
const express = require('express');
const Utils = require('@utils');
const router = express.Router();

const ProfessionDB = require('@DBfolder/profession');

router.get('/:str', async (req, res, next) => {
     try{
        let {str} = req.params;

        if(str.length < 3) {
            return res.json({
                success: true,
                item: []
            })
        } else {
            let finded = await ProfessionDB.find(str);

            return res.json({
                success: true,
                item: finded.map(x => x.profession)
            });
        }
    }catch (err){
        console.log(err)
        return Utils.sendError(res,500,err)
    }
});

module.exports = router;