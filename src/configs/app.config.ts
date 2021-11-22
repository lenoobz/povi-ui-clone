import { AppConfig } from 'types';

const devConfig: AppConfig = {
  DEFAULT_CURRENCY: 'CAD',
  API_BASE_URL: 'https://dev-api.lenoob.com/v1'
};

const stagingConfig: AppConfig = {
  DEFAULT_CURRENCY: 'CAD',
  API_BASE_URL: 'https://staging-api.lenoob.com/v1'
};

const prodConfig: AppConfig = {
  DEFAULT_CURRENCY: 'CAD',
  API_BASE_URL: 'https://fin-api.lenoob.com/v1'
};

let config: AppConfig;
if (process.env.REACT_APP_STAGE === 'production') {
  config = prodConfig;
} else if (process.env.REACT_APP_STAGE === 'staging') {
  config = stagingConfig;
} else {
  config = devConfig;
}

export default config;
