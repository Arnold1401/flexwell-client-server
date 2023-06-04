const axios = require("axios");
const { Op } = require("sequelize");


class BodyPartController {

    static async allBodyParts(req, res, next) {

        try {
            const { target } = req.query;

            let url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";

            if (target) {
                url = `https://exercisedb.p.rapidapi.com/exercises/target/${target}`;
            }
            const response = await axios.get(url, {
                headers: {
                    "X-RapidAPI-Key": '46223922d4msh2ca5fd58008bf09p191622jsn4e6bf15cc0bd',
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
                }
            });
            res.json(response.data);
        } catch (err) {
            next(err);
        }
    };


    static async getBodyPartsById(req, res, next) {
        const { id } = req.params;

        try {
            const options = {
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
                headers: {
                    'X-RapidAPI-Key': '46223922d4msh2ca5fd58008bf09p191622jsn4e6bf15cc0bd',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                }
            };

            const response = await axios(options);
            const result = response.data;
            if (!result) {
                throw {
                    name: 'Data not found',
                }
            }
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}


module.exports = BodyPartController;