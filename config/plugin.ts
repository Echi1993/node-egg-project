import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
