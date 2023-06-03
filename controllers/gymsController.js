const axios = require("axios");
const { Op } = require("sequelize");


class Controller {

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
            return res.json(response.data);
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

            result
                ? res.status(200).json(result)
                : res.status(404).json({ message: "Exercise is not found" });
        } catch (error) {
            next(error)
        }

    }

    // static async getExercisesByTarget(req, res, next) {

    //     const { target } = req.params;

    //     try {
    //         const options = {
    //             method: 'GET',
    //             url: `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
    //             headers: {
    //                 'X-RapidAPI-Key': '46223922d4msh2ca5fd58008bf09p191622jsn4e6bf15cc0bd',
    //                 'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    //             }
    //         };

    //         const response = await axios(options);
    //         const result = response.data;

    //         result
    //             ? res.status(200).json({ status: 200, data: [result], message: "Success" })
    //             : res.status(404).json({ status: 404, message: "Exercise is not found" });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ status: 500, message: error.message });
    //     }

    // }


}


module.exports = Controller;