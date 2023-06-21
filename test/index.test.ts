import LandingNav from "@/components/NavBar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

//just installed npm i jest @testing-library/react @types/jest babel-jest @testing-library/jest-dom @testing-library/user-event @testing-library/dom -D

/**
 * NEXT STEPS 
 * create config files for typescript and babel
touch tsconfig.json
touch .babelrc
add to the babel config file
{
  "presets": ["next/babel"]
}
create jest.config.js and jest.setup.ts files
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
// jest.setup.ts
import '@testing-library/jest-dom';
start the app so next can configure typescript
npm run dev
BONUS
If you're going to use CSS modules, make sure you also include these steps:

install identity-obj-proxy package
npm i identity-obj-proxy -D
update jest.config.js file to look like this
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};

Now we are good to go, you can start changing your component from .js to .tsx and building your awesome app.
 * 
 * 
 */