import dedent from 'dedent-js';

export default (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  let code = 'import matplotlib.pyplot as plt\nimport numpy as np\nax=plt.gca()\n';
  code += dedent(String.raw(strings, ...values));
  return (
    <div class="has-text-centered">
      <Python>{code}</Python>
    </div>
  );
};
