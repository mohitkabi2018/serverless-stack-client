const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-uploads-kabi"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://v1rmx4zgtk.execute-api.us-east-1.amazonaws.com"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FPz5LveTg",
    APP_CLIENT_ID: "1gojeacr6qb80ffbn21qe73hnm",
    IDENTITY_POOL_ID: "us-east-1:a0abf736-cdea-421a-9aee-1a706d49c7a0"
  },
  MAX_ATTACHMENT_SIZE: 5000000
};

export default config;
