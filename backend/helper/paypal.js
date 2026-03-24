const paypal = require("@paypal/paypal-server-sdk");

const client = new paypal.Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId:
      "AR3mMKO5rO0GHA2PkjwE8L80UxOTeay35sLtS_6FlCm5me-8ZvFTGe6E8ir6wfyl1G3eqNREiQElgDav",
    oAuthClientSecret:
      "ELlbIE9mMNubglilTpMXq_t0pykcboz_3PrYxYGykglui-5po21uY-p0bRJHCwvKsx5zO89mLbKcR4x3",
  },
  environment: paypal.Environment.Sandbox, // testing
});

const ordersController = new paypal.OrdersController(client);

module.exports = { client, ordersController };
