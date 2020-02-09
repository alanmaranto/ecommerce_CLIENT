import React from "react";
import Layout from "../../core/Layout/Layout";
import { config } from '../../config/index';

const SignUp = () => (
  <Layout title="Signup" description="Signup to Node React E-Commerce">
    {config.api}
  </Layout>
);

export default SignUp;
