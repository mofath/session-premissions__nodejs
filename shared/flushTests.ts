import PromiseBlueBird from 'bluebird';
import models from '../database/models';

export default async function flushTests() {
  await PromiseBlueBird.all(
    Object.values(models).map((model) => {
      return model.destroy({
        where: {},
      });
    })
  );
}
