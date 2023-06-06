const axios = require('axios');

const { EXERCISE_DB_KEY } = process.env;

class BodyPartController {
  static async allBodyParts(req, res, next) {
    try {
      const { target } = req.query;

      let url = 'https://exercisedb.p.rapidapi.com/exercises/targetList';

      if (target) {
        url = `https://exercisedb.p.rapidapi.com/exercises/target/${target}`;
      }
      const response = await axios.get(url, {
        headers: {
          'X-RapidAPI-Key': EXERCISE_DB_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });
      res.json(response.data?.slice(0, 13));
    } catch (err) {
      /* istanbul ignore next */
      next(err);
    }
  }

  static async getBodyPartsById(req, res, next) {
    const { id } = req.params;

    try {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        headers: {
          'X-RapidAPI-Key': EXERCISE_DB_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      };

      const response = await axios(options);
      const result = response.data;
      if (!result) {
        throw {
          name: 'Data not found',
        };
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BodyPartController;
