let options = [
  '--require-module ts-node/register',
  '--require ./tests/steps/*.steps.ts',
  '--format progress',
].join(' ');

let run_features = ['./tests/features/', options].join(' ');

module.exports = {
  test_runner: run_features,
};
